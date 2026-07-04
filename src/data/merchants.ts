import type { MerchantRule } from "./types";

export const merchants: MerchantRule[] = [
  {
    id: "familymart",
    name: "FamilyMart",
    category: "convenience_store",
    defaultRecommendation: "JP BANK EXTAGE JCB -> FamiPay -> pay with FamiPay",
    duringSmbcTrainingRecommendation:
      "Still use FamiPay if campaign / normal small spend. Use SMBC only if trying to push real spending and no FamiPay/JCB benefit matters.",
    afterSmbcTrainingRecommendation: "FamiPay remains default.",
    steps: [
      "Reload FamiPay with JP BANK EXTAGE JCB.",
      "At checkout say: FamiPayでお願いします",
    ],
    alternatives: [
      "SMBC Olive Gold if no FamiPay balance and I want to count spending.",
    ],
    warnings: [
      "FamilyMart is no longer a JAL特約店.",
      "Do not use JAL card expecting 2x特約店 miles.",
      "FamiPay reload limits may apply.",
    ],
    tags: ["FamiPay", "JCB", "convenience", "not JAL特約店"],
    aliases: ["famima", "ファミマ", "ファミリーマート"],
  },
  {
    id: "seven-eleven",
    name: "7-Eleven",
    category: "convenience_store",
    defaultRecommendation:
      "SMBC Olive Gold Credit Mode via smartphone Visa touch",
    duringSmbcTrainingRecommendation:
      "SMBC Olive Gold Credit Mode smartphone Visa touch",
    afterSmbcTrainingRecommendation:
      "Continue SMBC smartphone touch if it remains high-rate. If JP BANK JCB campaign is higher, use JP BANK JCB temporarily.",
    steps: [
      "Scan 7-Eleven app if relevant.",
      "Say: Visaのタッチでお願いします",
      "Use smartphone touch with SMBC Olive in Credit Mode.",
    ],
    alternatives: ["JP BANK EXTAGE JCB only when there is a stronger campaign."],
    warnings: [
      "Physical card touch / iD / insert payment may not count for the high SMBC rate.",
      "Confirm current campaign before overriding.",
    ],
    tags: ["SMBC", "Visa touch", "convenience", "high-rate"],
    aliases: ["7eleven", "seven", "セブン", "セブンイレブン"],
  },
  {
    id: "atre",
    name: "atre",
    category: "station_mall",
    defaultRecommendation: "JRE POINT barcode + Mobile Suica",
    duringSmbcTrainingRecommendation:
      "Still Mobile Suica for station convenience unless making a large purchase where SMBC修行 matters more.",
    afterSmbcTrainingRecommendation:
      "JRE POINT barcode + Mobile Suica remains default.",
    steps: [
      "Show JRE POINT barcode.",
      "Say: JRE POINTお願いします。支払いはSuicaで。",
      "Pay with Mobile Suica.",
    ],
    alternatives: ["If store is a clear JAL特約店, direct JAL card may be better."],
    warnings: [
      "Mobile Suica charge earns JRE POINT, not direct JAL shopping miles/LSP.",
    ],
    tags: ["Suica", "JRE POINT", "station", "atre"],
    aliases: ["アトレ", "jr station"],
  },
  {
    id: "muji-inside-atre",
    name: "MUJI inside atre",
    category: "station_mall",
    defaultRecommendation: "MUJI App + JRE POINT barcode + Mobile Suica",
    duringSmbcTrainingRecommendation:
      "MUJI App + JRE POINT barcode + Mobile Suica unless a large SMBC修行 purchase matters more.",
    afterSmbcTrainingRecommendation:
      "MUJI App + JRE POINT barcode + Mobile Suica remains default.",
    steps: [
      "Show MUJI app membership barcode.",
      "Show JRE POINT barcode.",
      "Say: 支払いはSuicaでお願いします",
      "Pay with Mobile Suica.",
    ],
    alternatives: ["If a specific credit card campaign beats this, override manually."],
    warnings: [
      "Do not assume direct JAL card is better here unless special campaign exists.",
    ],
    tags: ["MUJI", "Suica", "JRE POINT", "membership"],
    aliases: ["muji", "無印", "無印良品"],
  },
  {
    id: "mita-seimenjo",
    name: "三田製麺所",
    category: "restaurant",
    defaultRecommendation:
      "During SMBC修行: SMBC Olive Gold. After SMBC修行: Mobile Suica for convenience, or JAL card direct if wanting JAL/LSP.",
    duringSmbcTrainingRecommendation: "SMBC Olive Gold if credit card is accepted.",
    afterSmbcTrainingRecommendation:
      "Mobile Suica for convenience, or JAL card direct if wanting JAL/LSP.",
    steps: [
      "If paying by card: クレジットでお願いします",
      "If paying by Suica: Suicaでお願いします",
    ],
    alternatives: [
      "PayPay if coupon exists.",
      "JAL card direct if trying to collect JAL shopping miles/LSP.",
    ],
    warnings: [
      "Not a known JAL特約店.",
      "Not a known SMBC high-rate restaurant.",
      "Payment methods may vary by branch.",
    ],
    tags: ["restaurant", "SMBC", "Suica", "JAL optional"],
    aliases: ["mita", "mitaseimenjo"],
  },
  {
    id: "ganso-aburado",
    name: "元祖油堂",
    category: "restaurant",
    defaultRecommendation: "Mobile Suica",
    duringSmbcTrainingRecommendation:
      "Use SMBC if the branch supports credit card and I want to count spend. Otherwise Mobile Suica.",
    afterSmbcTrainingRecommendation:
      "Mobile Suica remains default. JAL card direct if credit card accepted and I want JAL/LSP.",
    steps: [
      "At ticket machine / cashier, use transport IC if available.",
      "Say: Suicaでお願いします",
    ],
    alternatives: [
      "PayPay if coupon exists.",
      "SMBC during training if credit card accepted.",
    ],
    warnings: [
      "Payment methods vary by branch.",
      "Ticket machine may make Suica easiest.",
    ],
    tags: ["restaurant", "Suica", "branch-dependent"],
    aliases: ["油堂", "aburado", "ganso aburado"],
  },
  {
    id: "life-supermarket",
    name: "Life Supermarket",
    category: "supermarket",
    defaultRecommendation: "LaCuCa / Life app + best payment method",
    duringSmbcTrainingRecommendation: "LaCuCa / Life app + SMBC Olive Gold",
    afterSmbcTrainingRecommendation:
      "LaCuCa / Life app + best current campaign. Options: PayPay / d払い / au PAY / 楽天ペイ / JAL card / SMBC.",
    steps: [
      "Show LaCuCa / Life app.",
      "Say: クレジットでお願いします for SMBC/JAL.",
      "Or say the QR payment name if using PayPay/d払い/au PAY/楽天ペイ.",
    ],
    alternatives: [
      "Use PayPay/d払い/au PAY/楽天ペイ if campaign is better.",
      "Use JAL card direct if focusing on JAL/LSP after SMBC training.",
    ],
    warnings: [
      "LaCuCa is a membership/point layer. Payment method is separate.",
      "Do not open a new Life credit card unless monthly Life spend is large.",
    ],
    tags: ["supermarket", "LaCuCa", "SMBC", "campaign"],
    aliases: ["life", "ライフ"],
  },
  {
    id: "maruman-supermarket",
    name: "Maruman Supermarket / マルマンストア",
    category: "supermarket",
    defaultRecommendation:
      "During SMBC修行: SMBC Olive Gold. After SMBC修行: JAL card direct for JAL/LSP, or best QR campaign.",
    duringSmbcTrainingRecommendation: "SMBC Olive Gold",
    afterSmbcTrainingRecommendation:
      "JAL card direct for JAL/LSP, or best QR campaign.",
    steps: [
      "Say: クレジットでお願いします for SMBC/JAL.",
      "Say PayPayで, d払いで, 楽天ペイで, etc. when using QR campaign.",
    ],
    alternatives: [
      "Mobile Suica for small quick purchases.",
      "PayPay/d払い/楽天ペイ if campaign is strong.",
    ],
    warnings: [
      "Not a known JAL特約店.",
      "Choose based on current campaign or current goal.",
    ],
    tags: ["supermarket", "SMBC", "JAL optional", "campaign"],
    aliases: ["maruman", "マルマン", "マルマンストア"],
  },
  {
    id: "jal-flights",
    name: "JAL flights / JAL domestic tickets",
    category: "airline",
    defaultRecommendation: "JAL CLUB EST Suica direct credit-card payment",
    duringSmbcTrainingRecommendation:
      "JAL CLUB EST Suica direct credit-card payment remains preferred.",
    afterSmbcTrainingRecommendation:
      "JAL CLUB EST Suica direct credit-card payment remains preferred.",
    steps: [
      "Log into JMB before booking.",
      "Confirm JMB number is attached.",
      "Pay with JAL CLUB EST Suica.",
      "For domestic JAL, physical JAL card may be usable for Touch & Go boarding.",
    ],
    alternatives: [
      "Use JAL Pay only when it is specifically better for overseas / prepaid / campaign context.",
    ],
    warnings: [
      "JAL Touch & Go is not Suica/JCB touch. It is JAL IC/JMB identity.",
    ],
    tags: ["JAL", "airline", "LSP", "miles"],
    aliases: ["jal", "jal flights", "jal ticket", "jmb"],
  },
  {
    id: "jal-tokuyakuten",
    name: "JALカード特約店 general",
    category: "other",
    defaultRecommendation:
      "JAL CLUB EST Suica physical card direct credit-card payment",
    duringSmbcTrainingRecommendation:
      "Use JAL CLUB EST Suica direct if JAL miles/LSP matter more than SMBC修行 progress.",
    afterSmbcTrainingRecommendation:
      "JAL CLUB EST Suica physical card direct credit-card payment.",
    steps: [
      "Say: クレジットでお願いします.",
      "Use physical card / ordinary credit-card payment.",
    ],
    alternatives: [
      "Do not use Apple Pay / QUICPay / Suica unless that specific merchant explicitly supports特約店 miles via that route.",
    ],
    warnings: [
      "Direct card payment matters.",
      "Apple Pay / QUICPay / QR may not receive特約店 miles.",
    ],
    tags: ["JAL特約店", "JAL", "miles", "direct card"],
    examples: [
      "AEON",
      "マツキヨ / ココカラ",
      "ウエルシア",
      "Nojima",
      "大丸 / 松坂屋",
      "Royal Host",
      "JAL services",
    ],
    aliases: ["tokuyakuten", "特約店", "aeon", "nojima", "royal host"],
  },
  {
    id: "amazon",
    name: "Amazon.co.jp",
    category: "online",
    defaultRecommendation:
      "JP BANK EXTAGE JCB if JCB campaign is active. SMBC Olive Gold if during SMBC修行 and needing counted spend.",
    duringSmbcTrainingRecommendation:
      "SMBC Olive Gold or Amazon Gift Card charge if filling the SMBC修行 gap.",
    afterSmbcTrainingRecommendation:
      "JP BANK EXTAGE JCB when JCB campaign is active.",
    steps: ["Choose the active best card in Amazon checkout."],
    alternatives: [
      "Amazon Gift Card charge with SMBC can be used to safely fill SMBC修行 gap.",
    ],
    warnings: [
      "Do not lock too much money in Amazon Gift Card unless I will use it.",
      "JCB campaign rules should be checked before large purchases.",
    ],
    tags: ["Amazon", "JCB", "SMBC", "campaign"],
    aliases: ["amazon.co.jp", "アマゾン"],
  },
  {
    id: "yahoo-lohaco",
    name: "Yahoo!ショッピング / LOHACO",
    category: "online",
    defaultRecommendation: "PayPay Gold / PayPay Credit",
    duringSmbcTrainingRecommendation:
      "PayPay Gold / PayPay Credit unless SMBC修行 progress is more important than PayPay ecosystem value.",
    afterSmbcTrainingRecommendation: "PayPay Gold / PayPay Credit",
    steps: ["Use PayPay ecosystem payment."],
    alternatives: ["Use other cards only if a specific campaign beats PayPay."],
    warnings: [
      "PayPay Gold value depends on LYP, Yahoo/LOHACO usage, and annual fee math.",
    ],
    tags: ["PayPay", "Yahoo", "LOHACO", "LYP"],
    aliases: ["yahoo", "lohaco", "ヤフー", "ロハコ"],
  },
  {
    id: "costco",
    name: "Costco Japan",
    category: "other",
    defaultRecommendation:
      "JAL Pay first test. au PAY Prepaid backup. PayPay ordinary Mastercard only for small purchases due to 3万円 line.",
    duringSmbcTrainingRecommendation:
      "Mastercard-only route still applies: JAL Pay -> au PAY Prepaid -> PayPay ordinary Mastercard if small.",
    afterSmbcTrainingRecommendation:
      "JAL Pay first test. au PAY Prepaid backup. Consider Costco Global Card if spend becomes frequent/large.",
    steps: [
      "Try small transaction first.",
      "Say: Mastercardのタッチでお願いします",
      "Use Apple Pay JAL Pay if accepted.",
    ],
    alternatives: [
      "au PAY Prepaid Mastercard",
      "Cash",
      "Costco Global Card if Costco spend becomes frequent/large",
    ],
    warnings: [
      "PayPay Gold is Visa, so not suitable.",
      "PayPay ordinary Mastercard has only 3万円 limit.",
      "Prepaid/contactless acceptance should be tested before large purchase.",
    ],
    tags: ["Mastercard-only", "Costco", "JAL Pay", "au PAY"],
    aliases: ["コストコ", "mastercard only"],
  },
  {
    id: "uq-mobile",
    name: "UQ mobile bill",
    category: "other",
    defaultRecommendation:
      "If I have au PAY Card and plan is eligible for payment discount, use au PAY Card. If I do not have au PAY Card, use SMBC Olive Gold during SMBC修行.",
    duringSmbcTrainingRecommendation: "SMBC Olive Gold if no au PAY Card discount applies.",
    afterSmbcTrainingRecommendation:
      "Re-evaluate based on whether au PAY Card exists and whether discount applies.",
    steps: ["Set the best eligible payment method in UQ mobile billing settings."],
    alternatives: [
      "JAL card if focusing on JAL/LSP and no au PAY Card discount.",
    ],
    warnings: [
      "au PAY balance payment is not automatically best.",
      "UQ monthly payment is a stable spend source for SMBC修行.",
    ],
    tags: ["UQ", "au PAY", "SMBC", "recurring"],
    aliases: ["uq", "uq mobile", "uqモバイル", "mobile bill"],
  },
];
