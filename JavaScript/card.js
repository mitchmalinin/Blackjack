//array of cards
let cards = [
  {
    suit: "club",
    name: "2",
    value: 2,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c2.png"
  },
  {
    suit: "club",
    name: "3",
    value: 3,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c3.png"
  },
  {
    suit: "club",
    name: "4",
    value: 4,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c4.png"
  },
  {
    suit: "club",
    name: "5",
    value: 5,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c5.png"
  },
  {
    suit: "club",
    name: "6",
    value: 6,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c6.png"
  },
  {
    suit: "club",
    name: "7",
    value: 7,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c7.png"
  },
  {
    suit: "club",
    name: "8",
    value: 8,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c8.png"
  },
  {
    suit: "club",
    name: "9",
    value: 9,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c9.png"
  },
  {
    suit: "club",
    name: "10",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_c10.png"
  },
  {
    suit: "club",
    name: "jack",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_cj.png"
  },
  {
    suit: "club",
    name: "queen",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_cq.png"
  },
  {
    suit: "club",
    name: "king",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_ck.png"
  },
  {
    suit: "club",
    name: "ace",
    value: 11,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_ca.png"
  },
  {
    suit: "diamond",
    name: "2",
    value: 2,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d2.png"
  },
  {
    suit: "diamond",
    name: "3",
    value: 3,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d3.png"
  },
  {
    suit: "diamond",
    name: "4",
    value: 4,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d4.png"
  },
  {
    suit: "diamond",
    name: "5",
    value: 5,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d5.png"
  },
  {
    suit: "diamond",
    name: "6",
    value: 6,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d6.png"
  },
  {
    suit: "diamond",
    name: "7",
    value: 7,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d7.png"
  },
  {
    suit: "diamond",
    name: "8",
    value: 8,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d8.png"
  },
  {
    suit: "diamond",
    name: "9",
    value: 9,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d9.png"
  },
  {
    suit: "diamond",
    name: "10",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_d10.png"
  },
  {
    suit: "diamond",
    name: "jack",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_dj.png"
  },
  {
    suit: "diamond",
    name: "queen",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_dq.png"
  },
  {
    suit: "diamond",
    name: "king",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_dk.png"
  },
  {
    suit: "diamond",
    name: "ace",
    value: 11,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_da.png"
  },
  {
    suit: "heart",
    name: "2",
    value: 2,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h2.png"
  },
  {
    suit: "heart",
    name: "3",
    value: 3,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h3.png"
  },
  {
    suit: "heart",
    name: "4",
    value: 4,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h4.png"
  },
  {
    suit: "heart",
    name: "5",
    value: 5,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h5.png"
  },
  {
    suit: "heart",
    name: "6",
    value: 6,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h6.png"
  },
  {
    suit: "heart",
    name: "7",
    value: 7,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h7.png"
  },
  {
    suit: "heart",
    name: "8",
    value: 8,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h8.png"
  },
  {
    suit: "heart",
    name: "9",
    value: 9,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h9.png"
  },
  {
    suit: "heart",
    name: "10",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_h10.png"
  },
  {
    suit: "heart",
    name: "jack",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_hj.png"
  },
  {
    suit: "heart",
    name: "queen",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_hq.png"
  },
  {
    suit: "heart",
    name: "king",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_hk.png"
  },
  {
    suit: "heart",
    name: "ace",
    value: 11,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_ha.png"
  },
  {
    suit: "spade",
    name: "2",
    value: 2,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s2.png"
  },
  {
    suit: "spade",
    name: "3",
    value: 3,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s3.png"
  },
  {
    suit: "spade",
    name: "4",
    value: 4,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s4.png"
  },
  {
    suit: "spade",
    name: "5",
    value: 5,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s5.png"
  },
  {
    suit: "spade",
    name: "6",
    value: 6,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s6.png"
  },
  {
    suit: "spade",
    name: "7",
    value: 7,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s7.png"
  },
  {
    suit: "spade",
    name: "8",
    value: 8,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s8.png"
  },
  {
    suit: "spade",
    name: "9",
    value: 9,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s9.png"
  },
  {
    suit: "spade",
    name: "10",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_s10.png"
  },
  {
    suit: "spade",
    name: "jack",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_sj.png"
  },
  {
    suit: "spade",
    name: "queen",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_sq.png"
  },
  {
    suit: "spade",
    name: "king",
    value: 10,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_sk.png"
  },
  {
    suit: "spade",
    name: "ace",
    value: 11,
    image: "../PokerSet/PNGs/cards/Set_B/small/card_b_sa.png"
  }
];
