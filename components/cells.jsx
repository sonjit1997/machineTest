import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import Styles from "../styles/cellStyle.module.css";
import { allProductsApi } from "../allApi/apis";

const Cells = () => {
  const [products, setProducts] = useState([]);

  // State to track the index of the currently visible product
  const [visibleProductIndex, setVisibleProductIndex] = useState(null);

  // State to track the index of the product being dragged
  const [draggedIndex, setDraggedIndex] = useState(null);


  const tableCellsRef = useRef({});

  // Effect to fetch products from the API on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await allProductsApi();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  // Effect to handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        event.preventDefault();
        const currentIndex = visibleProductIndex;
        let newIndex;

        // Calculate new index based on arrow key pressed
        switch (event.key) {
          case "ArrowUp":
            newIndex = currentIndex - 5;
            break;
          case "ArrowDown":
            newIndex = currentIndex + 5;
            break;
          case "ArrowLeft":
            newIndex = currentIndex - 1;
            break;
          case "ArrowRight":
            newIndex = currentIndex + 1;
            break;
          default:
            return;
        }

        // Ensure the new index is within valid bounds
        if (newIndex >= 0 && newIndex < products.length) {
          setVisibleProductIndex(newIndex);
          tableCellsRef.current[newIndex].focus();
        }
      }
    };

    // Add event listener for keydown events
    document.addEventListener("keydown", handleKeyDown);

    // Clean up: Remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visibleProductIndex, products]);

  // Handler for clicking on a TableCell
  const handleCellClick = (index) => {
    setVisibleProductIndex(index);
  };

  // Handler for starting a drag operation on a TableCell
  const handleDragStart = (event, index) => {
    setDraggedIndex(index);
  };

  // Handler for dragging over a TableCell (needed for drop handling)
  const handleDragOver = (event, index) => {
    event.preventDefault();
  };

  // Handler for dropping a dragged TableCell into another TableCell
  const handleDrop = (event, index) => {
    event.preventDefault();

    // Swap products in the array
    const updatedProducts = [...products];
    const draggedProduct = updatedProducts[draggedIndex];
    updatedProducts[draggedIndex] = updatedProducts[index];
    updatedProducts[index] = draggedProduct;
    setProducts(updatedProducts);

    // Set the visible index to the dropped index to make it visible
    setVisibleProductIndex(index);

    // Reset drag and drop indices
    setDraggedIndex(null);
  };

  // Handler for ending a drag operation
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {[0, 1, 2, 3].map((rowIndex) => (
              <TableRow key={rowIndex}>
                {[0, 1, 2, 3, 4].map((colIndex) => {
                  const productIndex = rowIndex * 5 + colIndex;
                  return (
                    <TableCell
                      ref={(cell) =>
                        (tableCellsRef.current[productIndex] = cell)
                      }
                      key={colIndex}
                      align="center"
                  
                      className={`${Styles.tableCell} ${
                        visibleProductIndex === productIndex
                          ? Styles.cellVisible
                          : ""
                      } ${
                        draggedIndex === productIndex ? Styles.cellDragged : ""
                      }`}
                      tabIndex={-1}
                      onClick={() => handleCellClick(productIndex)}
                      onDragStart={(event) =>
                        handleDragStart(event, productIndex)
                      }
                      onDragOver={(event) =>
                        handleDragOver(event, productIndex)
                      }
                      onDrop={(event) => handleDrop(event, productIndex)}
                      onDragEnd={handleDragEnd}
                      draggable 
                    >
                      {/* Render product content if available */}
                      {products[productIndex] && (
                        <div
                          className={`${Styles.cellContent} ${
                            visibleProductIndex === productIndex
                              ? Styles.cellVisible
                              : ""
                          }`}
                        >
                          <img
                            src={products[productIndex].image}
                            alt={products[productIndex].title}
                            className={Styles.image}
                          />
                          <p className={Styles.title}>
                            {products[productIndex].title}
                          </p>
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Cells;
