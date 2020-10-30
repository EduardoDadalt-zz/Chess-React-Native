export interface PieceObj {
  id: number;
  x?: number;
  y?: number;
  isBlack?: boolean;
  from?: PieceObj;
  select?:boolean
}
