import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { PieceObj } from "../Chess/PieceObj";

import BlackPawn from "../../assets/Pieces/NewBlack/Pawn";
import BlackRook from "../../assets/Pieces/NewBlack/Rook";
import BlackKnight from "../../assets/Pieces/NewBlack/Knight";
import BlackKing from "../../assets/Pieces/NewBlack/King";
import BlackQueen from "../../assets/Pieces/NewBlack/Queen";
import BlackBishop from "../../assets/Pieces/NewBlack/Bishop";

import WhitePawn from "../../assets/Pieces/NewWhite/Pawn";
import WhiteRook from "../../assets/Pieces/NewWhite/Rook";
import WhiteBishop from "../../assets/Pieces/NewWhite/Bishop";
import WhiteKnight from "../../assets/Pieces/NewWhite/Knight";
import WhiteKing from "../../assets/Pieces/NewWhite/King";
import WhiteQueen from "../../assets/Pieces/NewWhite/Queen";

interface PieceProps {
  piece: PieceObj;
}
const Piece: React.FC<PieceProps> = (props) => {
  let { id, isBlack } = props.piece;
  return (
    <View
      style={{
        flex: 1,
      }}
    >{}
      {(() => {
        switch (id) {
          case 1:
            return isBlack ? <BlackPawn /> : <WhitePawn />;
          case 2:
            return isBlack ? <BlackRook /> : <WhiteRook />;
          case 4:
            return isBlack ? <BlackBishop /> : <WhiteBishop />;
          case 3:
            return isBlack ? <BlackKnight /> : <WhiteKnight />;
          case 5:
            return isBlack ? <BlackKing /> : <WhiteKing />;
          case 6:
            return isBlack ? <BlackQueen /> : <WhiteQueen />;

          default:
            return <></>;
        }
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  piece: { flex: 1 },
});
export default Piece;
