import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Input, Label, Title, Button, ErrorText } from "./styles";

const schema = yup.object().shape({
  SKU: yup.string().required("o SKU do Produto é obrigatório!"),
  name: yup.string().required("o Nome do Produto é obrigatório!"),
  inventoryTotal: yup.number().required("o Estoque total é obrigatório!"),
  inventoryCut: yup
    .number()
    .required("o Estoque de corte é obrigatório!")
    .test(
      "inventoryTest",
      "Tem que ser menor que o Estoque Total!",
      function (value) {
        return (this.parent.inventoryTotal || 0) > (value || 0);
      }
    ),
  inventory: yup.number().required("o Estoque disponível é obrigatório!"),
  priceFrom: yup.number().required("o Preço inicial é obrigatório!"),
  priceTo: yup
    .number()
    .required("o Preço promocional é obrigatório!")
    .test(
      "priceTest",
      "Tem que ser menor que o Preço Inicial!",
      function (value) {
        return (this.parent.priceFrom || 0) > (value || 0);
      }
    ),
});

interface IFormProps {
  mode: "Edição" | "Criação";
}

type FormData = {
  SKU: string;
  name: string;
  inventoryTotal: number;
  inventoryCut: number;
  inventory: number;
  priceFrom: number;
  priceTo: number;
};

const Form = ({ mode }: IFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      SKU: "",
      name: "",
      inventoryCut: 0,
      inventoryTotal: 0,
      inventory: 0,
      priceFrom: 0,
      priceTo: 0,
    },
  });
  const { sku } = useParams();
  const onSubmit = async (formData: FormData) => {
    if (mode === "Criação") {
      await api.post("products", {
        ...formData,
        id: formData.SKU,
        inventory,
      });
      navigate("/");
    } else {
      //TODO: Update
      api.patch(`products/${sku}`, formData);
      navigate("/");
    }
  };

  useEffect(() => {
    if (sku) {
      api.get(`products/${sku}`).then((response) => {
        reset({ ...response.data });
      });
    }
  }, [sku]);

  const inventory =
    (watch("inventoryTotal") || 0) - (watch("inventoryCut") || 0);

  return (
    <Container>
      <Title>{mode} de Produto</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>SKU do produto: </Label>
        <Input {...register("SKU")} placeholder="SKU do Produto" />
        <ErrorText>{errors.SKU?.message}</ErrorText>

        <Label>Nome do produto: </Label>
        <Input {...register("name")} placeholder="Nome do Produto" />
        <ErrorText>{errors.name?.message}</ErrorText>

        <Label>Estoque total: </Label>
        <Input
          type="number"
          {...register("inventoryTotal")}
          placeholder="Estoque total"
        />
        <ErrorText>{errors.inventoryTotal?.message}</ErrorText>

        <Label>Estoque de corte: </Label>
        <Input
          type="number"
          {...register("inventoryCut")}
          placeholder="Estoque de corte"
        />
        <ErrorText>{errors.inventoryCut?.message}</ErrorText>

        <Label>Estoque Disponível: </Label>
        <Input {...register("inventory")} value={inventory} disabled />
        <p></p>

        <Label>Preço inicial: </Label>
        <Input
          type="number"
          pattern="[0-9]+([,\.][0-9]+)?"
          step="any"
          {...register("priceFrom")}
          placeholder="Preço inicial"
        />
        <ErrorText>{errors.priceFrom?.message}</ErrorText>

        <Label>Preço promocional: </Label>
        <Input
          type="number"
          pattern="[0-9]+([,\.][0-9]+)?"
          step="any"
          {...register("priceTo")}
          placeholder="Preço promocional"
        />
        <ErrorText>{errors.priceTo?.message}</ErrorText>
        <Button type="submit">Enviar</Button>
      </form>
    </Container>
  );
};

export default Form;
