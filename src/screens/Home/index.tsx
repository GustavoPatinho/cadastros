import React, { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import api from "../../services/api";
import { Button, Container } from "./styles";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

type Product = {
  SKU: string;
  name: string;
  inventoryTotal: number;
  inventoryCut: number;
  inventory: number;
  priceFrom: number;
  priceTo: number;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#0050dc",
    },
  },
});

const Table: FC = () => {
  const [products, setProducts] = useState([]);
  const [skuToDelete, setSkuToDelete] = useState<string | null>(null);
  const getProducts = () => {
    api.get("products").then(({ data }) => {
      setProducts(data);
    });
  };
  const [open, setOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line
  }, []);
  const navigate = useNavigate();
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "SKU",
        header: "SKU",
      },
      {
        accessorKey: "name",
        header: "Nome do Produto",
      },
      {
        accessorKey: "inventory",
        header: "Estoque Disponível",
        enableColumnFilter: false,
      },
      {
        accessorKey: "priceFrom",
        header: "Preço De (R$)",
        enableColumnFilter: false,
      },
      {
        accessorKey: "priceTo",
        header: "Preço por (R$)",
        enableColumnFilter: false,
      },
    ],
    []
  );

  const handleDelete = () => {
    handleCloseDialog();
    api.delete(`products/${skuToDelete}`).then((response) => {
      getProducts();
    });
  };

  return (
    <Container>
      <MaterialReactTable
        icons={{
          SearchIcon: () => <SearchIcon style={{ color: "#0050dc" }} />,
          SearchOffIcon: () => <SearchOffIcon style={{ color: "#a1a1a1" }} />,
          FilterListIcon: () => <FilterListIcon style={{ color: "#0050dc" }} />,
          FilterListOffIcon: () => (
            <FilterListOffIcon style={{ color: "#a1a1a1" }} />
          ),
          FullscreenIcon: () => <FullscreenIcon style={{ color: "#0050dc" }} />,
          FullscreenExitIcon: () => (
            <FullscreenExitIcon style={{ color: "#0050dc" }} />
          ),
        }}
        renderTopToolbarCustomActions={() => (
          <Button onClick={() => navigate("/create")}>
            Criar novo produto
          </Button>
        )}
        columns={columns}
        data={products}
        enableDensityToggle={false}
        enableHiding={false}
        enableEditing
        enablePagination={false}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                onClick={() => {
                  const sku = row.getValue("SKU");
                  navigate(`/edit/${sku}`);
                }}
              >
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  const sku = row.getValue("SKU");
                  setSkuToDelete(sku as string);
                  handleOpenDialog();
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Excluir Produto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Tem certeza que deseja excluir?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={() => {
              handleDelete();
            }}
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Table;
