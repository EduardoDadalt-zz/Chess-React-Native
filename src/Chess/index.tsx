import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Piece from "../Piece";
import { PieceObj } from "./PieceObj";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const Chess = () => {
  const [chessVar, setChessVar] = useState<PieceObj[][]>([
    [
      { id: 2, isBlack: true },
      { id: 3, isBlack: true },
      { id: 4, isBlack: true },
      { id: 6, isBlack: true },
      { id: 5, isBlack: true },
      { id: 4, isBlack: true },
      { id: 3, isBlack: true },
      { id: 2, isBlack: true },
    ],
    [
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
      { id: 1, isBlack: true },
    ],
    [
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
    ],
    [
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
    ],
    [
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
    ],
    [
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
      { id: 0 },
    ],
    [
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
      { id: 1, isBlack: false },
    ],
    [
      { id: 2, isBlack: false },
      { id: 3, isBlack: false },
      { id: 4, isBlack: false },
      { id: 5, isBlack: false },
      { id: 6, isBlack: false },
      { id: 4, isBlack: false },
      { id: 3, isBlack: false },
      { id: 2, isBlack: false },
    ],
  ]);
  //#region VH e VW
  const [dimensions, setDimensions] = useState({ height: 600, width: 600 });

  useEffect(() => {
    let { height, width } = Dimensions.get("window");
    height > width ? (height = width) : (width = height);
    setDimensions({ height, width });
    Dimensions.addEventListener("change", ({ window, screen }) => {
      let { height, width } = window;
      height > width ? (height = width) : (width = height);
      setDimensions({ height, width });
    });
    return () => {
      Dimensions.removeEventListener("change", ({ window, screen }) => {
        let { height, width } = window;
        height > width ? (height = width) : (width = height);
        setDimensions({ height, width });
      });
    };
  }, []);
  //#endregion
  function Move(pieceObj: PieceObj, x: number, y: number) {
    let { id } = pieceObj;
    let c = chessVar;
    function ClearSelectBlocks() {
      for (let x2 = 0; x2 < c.length; x2++) {
        for (let y2 = 0; y2 < c[x2].length; y2++) {
          if (c[x2][y2].select) delete c[x2][y2].select;
        }
      }
    }
    function MovimentoTorre() {
      for (let x2 = x - 1; x2 >= 0 && ConditionMoveTorre(x2, y, -1, 0); x2--) {
        c[x2][y] = {
          ...c[x2][y],
          from: { ...c[x][y], x, y },
          select: true,
        };
      }
      for (let x2 = x + 1; x2 < 8 && ConditionMoveTorre(x2, y, +1, 0); x2++) {
        c[x2][y] = {
          ...c[x2][y],
          from: { ...c[x][y], x, y },
          select: true,
        };
      }
      for (let y2 = y + 1; y2 < 8 && ConditionMoveTorre(x, y2, 0, +1); y2++) {
        c[x][y2] = {
          ...c[x][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
      }
      for (let y2 = y - 1; y2 >= 0 && ConditionMoveTorre(x, y2, 0, -1); y2--) {
        c[x][y2] = {
          ...c[x][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
      }
    }
    function MovimentoBispo() {
      for (
        let x2 = x - 1, y2 = y - 1;
        x2 >= 0 &&
        y2 >= 0 &&
        (c[x2][y2].id == 0 || c[x2][y2].isBlack != c[x][y].isBlack);
        x2--, y2--
      ) {
        c[x2][y2] = {
          ...c[x2][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
        if (c[x2][y2].id != 0 && c[x2][y2].isBlack != c[x][y].isBlack) x2 = -1;
      }
      for (
        let x2 = x + 1, y2 = y - 1;
        x2 < 8 &&
        y2 >= 0 &&
        (c[x2][y2].id == 0 || c[x2][y2].isBlack != c[x][y].isBlack);
        x2++, y2--
      ) {
        c[x2][y2] = {
          ...c[x2][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
        if (c[x2][y2].id != 0 && c[x2][y2].isBlack != c[x][y].isBlack) x2 = 8;
      }
      for (
        let x2 = x + 1, y2 = y + 1;
        x2 < 8 &&
        y2 < 8 &&
        (c[x2][y2].id == 0 || c[x2][y2].isBlack != c[x][y].isBlack);
        x2++, y2++
      ) {
        c[x2][y2] = {
          ...c[x2][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
        if (c[x2][y2].id != 0 && c[x2][y2].isBlack != c[x][y].isBlack) x2 = 10;
      }

      for (
        let x2 = x - 1, y2 = y + 1;
        x2 >= 0 &&
        y2 < 8 &&
        (c[x2][y2].id == 0 || c[x2][y2].isBlack != c[x][y].isBlack);
        x2--, y2++
      ) {
        c[x2][y2] = {
          ...c[x2][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
        if (c[x2][y2].id != 0 && c[x2][y2].isBlack != c[x][y].isBlack) x2 = -1;
      }
    }
    function ConditionMoveTorre(
      x2: number,
      y2: number,
      variableX: number,
      variableY: number
    ) {
      if (c[x2][y2].id == 0) {
        return true;
      } else if (c[x2][y2].isBlack != c[x][y].isBlack) {
        c[x2][y2] = {
          ...c[x2][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
      }

      return false;
    }
    function MovimentoCavalo(x2: number, y2: number) {
      if (
        x2 >= 0 &&
        x2 < 8 &&
        y2 >= 0 &&
        y2 < 8 &&
        (c[x2][y2].id == 0 || c[x2][y2].isBlack != c[x][y].isBlack)
      ) {
        c[x2][y2] = {
          ...c[x2][y2],
          from: { ...c[x][y], x, y },
          select: true,
        };
      }
    }
    if (c[x][y].select) {
      if (
        pieceObj.from &&
        typeof pieceObj.from.x == "number" &&
        typeof pieceObj.from.y == "number"
      ) {
        c[pieceObj.from.x][pieceObj.from.y] = { id: 0 };
        c[x][y] = { ...pieceObj.from };
        //En passant
      }
      ClearSelectBlocks();
      //Send
    } else {
      ClearSelectBlocks();
      switch (id) {
        case 1: //Peão
          if (x - 1 >= 0) {
            if (c[x - 1][y].id == 0) {
              c[x - 1][y] = {
                ...c[x - 1][y],
                from: { ...c[x][y], x, y },
                select: true,
              };
            }

            if (x == 6 && c[x - 2][y].id == 0) {
              c[x - 2][y] = {
                ...c[x - 2][y],
                from: { ...c[x][y], x, y },
                select: true,
              };
            }
            if (
              y - 1 >= 0 &&
              c[x - 1][y - 1].id > 0 &&
              c[x - 1][y - 1].isBlack != c[x][y].isBlack
            ) {
              c[x - 1][y - 1] = {
                ...c[x - 1][y - 1],
                from: { ...c[x][y], x, y },
                select: true,
              };
            }
            if (
              y + 1 < 8 &&
              c[x - 1][y + 1].id > 0 &&
              c[x - 1][y + 1].isBlack != c[x][y].isBlack
            ) {
              c[x - 1][y + 1] = {
                ...c[x - 1][y + 1],
                from: { ...c[x][y], x, y },
                select: true,
              };
            }
            //en passant
            if (
              y - 1 >= 0 &&
              c[x][y - 1].id > 0 &&
              c[x][y - 1].isBlack != c[x][y].isBlack
            ) {
              c[x - 1][y - 1] = {
                ...c[x - 1][y - 1],
                from: { ...c[x][y], x, y },
                select: true,
              };
            }
            if (
              y + 1 < 8 &&
              c[x][y + 1].id > 0 &&
              c[x][y + 1].isBlack != c[x][y].isBlack
            ) {
              c[x - 1][y + 1] = {
                ...c[x - 1][y + 1],
                from: { ...c[x][y], x, y },
                select: true,
              };
            }
          }
          break;
        case 2: //Torre
          MovimentoTorre();
          break;
        case 3: //Cavalo
          MovimentoCavalo(x - 2, y - 1);
          MovimentoCavalo(x - 1, y - 2);
          MovimentoCavalo(x - 2, y + 1);
          MovimentoCavalo(x - 1, y + 2);

          MovimentoCavalo(x + 2, y - 1);
          MovimentoCavalo(x + 1, y - 2);
          MovimentoCavalo(x + 2, y + 1);
          MovimentoCavalo(x + 1, y + 2);
          break;
        case 4: //Bispo
          MovimentoBispo();
          break;
        case 5: //Rei
          for (
            let x2 = x - 1 >= 0 ? x - 1 : 0;
            x2 < (x + 2 < 8 ? x + 2 : 8);
            x2++
          ) {
            for (
              let y2 = y - 1 >= 0 ? y - 1 : 0;
              y2 < (y + 2 < 8 ? y + 2 : 7);
              y2++
            ) {
              if (!(x2 == x && y2 == y)) {
                if (c[x2][y2].id == 0 || c[x2][y2].isBlack != c[x][y].isBlack) {
                  c[x2][y2] = {
                    ...c[x2][y2],
                    from: { ...c[x][y], x, y },
                    select: true,
                  };
                }
              }
            }
          }
          break;
        case 6: //Rainha
          MovimentoTorre();
          MovimentoBispo();

          break;
        default:
          break;
      }
    }

    setChessVar(Array.from(c));
  }
  // useEffect(() => {
  //   let c: PieceObj[][];
  //   c = new Array(8);
  //   for (let x = 0; x < 8; x++) {
  //     c[x] = new Array(8);
  //   }
  //   for (let x = 0; x < 8; x++) {
  //     for (let y = 0; y < 8; y++) {
  //       c[x][y] = { id: 0 };
  //     }
  //   }
  //   for (let x = 0; x < 8; x++) {
  //     c[1][x] = { id: 1, isBlack: true };
  //     c[6][x] = { id: 1, isBlack: false };
  //   }
  //   //#region Torre
  //   c[0][0] = { id: 2, isBlack: true };
  //   c[0][7] = { id: 2, isBlack: true };
  //   c[7][0] = { id: 2, isBlack: false };
  //   c[7][7] = { id: 2, isBlack: false };
  //   //#endregion
  //   //#region Cavalo
  //   c[0][1] = { id: 3, isBlack: true };
  //   c[0][6] = { id: 3, isBlack: true };
  //   c[7][1] = { id: 3, isBlack: false };
  //   c[7][6] = { id: 3, isBlack: false };
  //   //#endregion
  //   //#region Bishop
  //   c[0][2] = { id: 4, isBlack: true };
  //   c[0][5] = { id: 4, isBlack: true };
  //   c[7][2] = { id: 4, isBlack: false };
  //   c[7][5] = { id: 4, isBlack: false };
  //   //#endregion
  //   //#region Rei
  //   c[0][4] = { id: 5, isBlack: true };
  //   c[7][3] = { id: 5, isBlack: false };
  //   //#endregion
  //   //#region Rainha
  //   c[0][3] = { id: 6, isBlack: true };
  //   c[7][4] = { id: 6, isBlack: false };
  //   //#endregion
  //   console.log(JSON.stringify(c));

  //   setChessVar(c);
  // }, []);

  return (
    <View style={[styles.chessTable, { ...dimensions }]}>
      {chessVar.map((f, x) => {
        let g: JSX.Element[];
        g = [];
        for (let y = 0; y < f.length; y++) {
          g.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={"y:" + y}
              style={[
                (x + y) % 2 == 0
                  ? styles.backgroundWhite
                  : styles.backgroundBlack,
                styles.square,
                typeof chessVar[x][y].select === "boolean" &&
                  chessVar[x][y].select &&
                  chessVar[x][y].id > 0 &&
                  styles.selectHaveAPieceInSamePlaceSquare,
              ]}
              onPress={() => {
                Move(chessVar[x][y], x, y);
              }}
            >
              <View
                key={"ySelect:" + y}
                style={[
                  styles.piece,
                  typeof chessVar[x][y].select === "boolean" &&
                    chessVar[x][y].select &&
                    chessVar[x][y].id > 0 &&
                    styles.selectHaveAPieceInSamePlace,
                  typeof chessVar[x][y].select === "boolean" &&
                    chessVar[x][y].select &&
                    chessVar[x][y].id == 0 &&
                    styles.select,
                  typeof chessVar[x][y].select === "boolean" &&
                    chessVar[x][y].select &&
                    chessVar[x][y].id > 0 &&
                    ((x + y) % 2 == 0
                      ? styles.backgroundWhite
                      : styles.backgroundBlack),
                ]}
              >
                <Piece
                  key={JSON.stringify(chessVar[x][y])}
                  piece={chessVar[x][y]}
                />
              </View>
            </TouchableOpacity>
          );
        }
        return (
          <View key={"x:" + x} style={styles.row}>
            {g}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  chessTable: {
    display: "flex",
    height: 300,
    width: 300,
    borderColor: "black",
    borderWidth: 1,
  },
  backgroundWhite: {
    backgroundColor: "rgb(232,235,239)",
  },
  backgroundBlack: {
    backgroundColor: "rgb(125,135,150)",
  },
  square: {
    flex: 1,
    display: "flex",
  },
  row: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  selectHaveAPieceInSamePlace: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "transparent",
  },
  selectHaveAPieceInSamePlaceSquare: {
    backgroundColor: "#006400",
  },
  select: {
    flex: 1,
    backgroundColor: "green",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50,
    margin: "30%",
  },
  piece: {
    display: "flex",
    flex: 1,
  },
});
export default Chess;
