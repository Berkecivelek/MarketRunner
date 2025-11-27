import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CartoonProductProps {
  id: string;
  scale?: number;
}

export const CartoonProduct: React.FC<CartoonProductProps> = ({ id, scale = 1 }) => {
  const pid = id.toLowerCase();

  const content = (() => {
    // 1. MANAV (Produce)
    if (pid.includes('apple')) return <View style={p.apple}><View style={p.appleShine} /><View style={p.appleStem} /><View style={p.appleLeaf} /></View>;
    if (pid.includes('banana')) return <View style={p.banana}><View style={p.bananaCurve} /><View style={p.bananaStem} /></View>;
    if (pid.includes('tomato')) return <View style={p.tomato}><View style={p.tomatoShine} /><View style={p.tomatoLeaf} /></View>;
    if (pid.includes('lettuce')) return <View style={p.lettuce}><View style={p.lettuceInner} /></View>;
    if (pid.includes('cucumber')) return <View style={p.cucumber}><View style={p.cucumberSpot1} /><View style={p.cucumberSpot2} /></View>;
    if (pid.includes('strawberry')) return <View style={p.strawberry}><View style={p.seed1} /><View style={p.seed2} /><View style={p.seed3} /><View style={p.berryLeaf} /></View>;
    if (pid.includes('lemon')) return <View style={p.lemon}><View style={p.lemonEnd1} /><View style={p.lemonEnd2} /></View>;
    if (pid.includes('orange') && !pid.includes('juice')) return <View style={p.orange}><View style={p.orangePore} /></View>;
    if (pid.includes('carrot')) return <View style={p.carrot}><View style={p.carrotLine1} /><View style={p.carrotLine2} /><View style={p.carrotLeaf} /></View>;
    if (pid.includes('eggplant')) return <View style={p.eggplant}><View style={p.eggplantLeaf} /></View>;
    if (pid.includes('pepper')) return <View style={p.pepper}><View style={p.pepperStem} /></View>;
    if (pid.includes('watermelon')) return <View style={p.watermelon}><View style={p.melonStripe1} /><View style={p.melonStripe2} /></View>;

    // 2. SÜT & KAHVALTI (Dairy)
    if (pid.includes('milk')) return <View style={p.milkBottle}><View style={p.milkCap} /><View style={p.milkLabel}><Text style={p.tinyText}>SÜT</Text></View></View>;
    if (pid.includes('cheesewheel')) return <View style={p.cheeseWheel}><View style={p.cheeseWedge}/></View>;
    if (pid.includes('cheese') && !pid.includes('wheel')) return <View style={p.cheese}><View style={p.cheeseHole1} /><View style={p.cheeseHole2} /></View>;
    if (pid.includes('yogurt')) return <View style={p.yogurtCup}><View style={p.yogurtRim} /><View style={p.yogurtLabel} /></View>;
    if (pid.includes('egg')) return <View style={p.eggBox}><View style={p.egg1} /><View style={p.egg2} /><View style={p.egg3} /></View>;
    if (pid.includes('butter')) return <View style={p.butterBlock}><View style={p.butterLabel} /></View>;
    if (pid.includes('cream')) return <View style={p.creamCarton}><View style={p.creamDrop} /></View>;
    if (pid.includes('ice-cream')) return <View style={p.iceCream}><View style={p.scoop} /><View style={p.cone} /></View>;
    if (pid.includes('ayran')) return <View style={p.ayranCup}><Text style={p.tinyTextBlue}>AYRAN</Text></View>;
    if (pid.includes('pudding')) return <View style={p.puddingBowl}><View style={p.puddingContent}/></View>;
    if (pid.includes('kefir')) return <View style={p.kefirBottle}><Text style={p.tinyTextGreen}>KEFİR</Text></View>;
    if (pid.includes('labne')) return <View style={p.labneTub}><Text style={p.tinyTextBlue}>LABNE</Text></View>;

    // 3. FIRIN (Bakery)
    if (pid.includes('bread')) return <View style={p.breadLoaf}><View style={p.breadTop} /><View style={p.breadCut1} /><View style={p.breadCut2} /></View>;
    if (pid.includes('croissant')) return <View style={p.croissant}><View style={p.croissantLine} /></View>;
    if (pid.includes('cookie')) return <View style={p.cookie}><View style={p.chocChip1} /><View style={p.chocChip2} /><View style={p.chocChip3} /></View>;
    if (pid.includes('cake')) return <View style={p.cakeSlice}><View style={p.cakeLayer} /><View style={p.cherry} /></View>;
    if (pid.includes('baguette')) return <View style={p.baguette}><View style={p.baguetteCut1} /><View style={p.baguetteCut2} /></View>;
    if (pid.includes('donut')) return <View style={p.donut}><View style={p.donutHole} /><View style={p.sprinkle1} /><View style={p.sprinkle2} /></View>;
    if (pid.includes('simit')) return <View style={p.simit}><View style={p.simitHole} /></View>;
    if (pid.includes('pizza')) return <View style={p.pizza}><View style={p.pepperoni1} /><View style={p.pepperoni2} /></View>;
    if (pid.includes('muffin')) return <View style={p.muffin}><View style={p.muffinTop}/><View style={p.muffinBottom}/></View>;
    if (pid.includes('pie')) return <View style={p.pie}><View style={p.pieCrust}/><View style={p.pieFilling}/></View>;
    if (pid.includes('sandwich')) return <View style={p.sandwich}><View style={p.sandBread}/><View style={p.sandFilling}/></View>;
    if (pid.includes('pide')) return <View style={p.pide}><View style={p.pideInner}/></View>;

    // 4. İÇECEKLER (Drinks)
    if (pid.includes('cola')) return <View style={p.colaCan}><View style={p.colaStripe} /><Text style={p.tinyTextWhite}>COLA</Text></View>;
    if (pid.includes('water')) return <View style={p.waterBottle}><View style={p.waterCap} /><View style={p.waterLabel} /></View>;
    if (pid.includes('fruit-juice')) return <View style={p.juiceCarton}><View style={p.juiceOrange} /><View style={p.straw} /></View>;
    if (pid.includes('tea') && !pid.includes('ice')) return <View style={p.teaCup}><View style={p.teaTag} /></View>;
    if (pid.includes('coffee')) return <View style={p.coffeeCup}><View style={p.coffeeSleeve} /><View style={p.steam} /></View>;
    if (pid.includes('lemonade')) return <View style={p.lemonade}><View style={p.lemonSlice} /><View style={p.straw} /></View>;
    if (pid.includes('milkshake')) return <View style={p.milkshake}><View style={p.cherry} /><View style={p.straw} /></View>;
    if (pid.includes('soda')) return <View style={p.sodaBottle}><Text style={p.tinyTextWhite}>SODA</Text></View>;
    if (pid.includes('orangejuice')) return <View style={p.ojBottle}><View style={p.ojCap}/></View>;
    if (pid.includes('energydrink')) return <View style={p.energyCan}><View style={p.bolt}/></View>;
    if (pid.includes('hotchoco')) return <View style={p.hotChoco}><View style={p.steam}/></View>;
    if (pid.includes('icetea')) return <View style={p.iceTeaCan}><Text style={p.tinyTextWhite}>ICE</Text></View>;

    // 5. ATIŞTIRMALIK (Snacks)
    if (pid.includes('chips')) return <View style={p.chipsBag}><View style={p.chipsLogo} /><Text style={p.tinyText}>CIPS</Text></View>;
    if (pid.includes('chocolate')) return <View style={p.chocoBar}><View style={p.chocoWrapper} /><Text style={p.tinyTextWhite}>CHOCO</Text></View>;
    if (pid.includes('candy')) return <View style={p.candyWrapper}><View style={p.candyEndLeft} /><View style={p.candyEndRight} /></View>;
    if (pid.includes('popcorn')) return <View style={p.popcornBucket}><View style={p.popcornTop} /></View>;
    if (pid.includes('cracker')) return <View style={p.cracker}><View style={p.crackerHole1} /><View style={p.crackerHole2} /></View>;
    if (pid.includes('jelly')) return <View style={p.jellyBag}><View style={p.jellyBear} /></View>;
    if (pid.includes('pretzel')) return <View style={p.pretzel}><View style={p.pretzelHole1}/><View style={p.pretzelHole2}/></View>;
    if (pid.includes('biscuit')) return <View style={p.biscuit}><View style={p.biscuitDot}/></View>;
    if (pid.includes('wafer')) return <View style={p.wafer}><View style={p.waferLine}/></View>;
    if (pid.includes('nachos')) return <View style={p.nachos}><View style={p.nachoCheese}/></View>;
    if (pid.includes('nuts')) return <View style={p.nutsBag}><Text style={p.tinyTextWhite}>NUTS</Text></View>;
    if (pid.includes('bar')) return <View style={p.bar}><View style={p.barLine}/></View>;

    // 6. ELEKTRONİK (Electronics)
    if (pid.includes('phone') || pid.includes('smartphone')) return <View style={p.phone}><View style={p.screen} /><View style={p.homeButton} /></View>;
    if (pid.includes('laptop')) return <View style={p.laptop}><View style={p.laptopScreen} /><View style={p.keyboard} /></View>;
    if (pid.includes('headphone')) return <View style={p.headphone}><View style={p.earCupLeft} /><View style={p.earCupRight} /><View style={p.headband} /></View>;
    if (pid.includes('camera')) return <View style={p.camera}><View style={p.lens} /><View style={p.flash} /></View>;
    if (pid.includes('tablet')) return <View style={p.tablet}><View style={p.screen} /></View>;
    if (pid.includes('mouse')) return <View style={p.mouse}><View style={p.mouseWheel} /><View style={p.mouseCord} /></View>;
    if (pid.includes('gamepad')) return <View style={p.gamepad}><View style={p.gameBtn1} /><View style={p.gameBtn2} /></View>;
    if (pid.includes('watch')) return <View style={p.watch}><View style={p.watchScreen} /></View>;
    if (pid.includes('keyboard')) return <View style={p.keyboardKey}><View style={p.keyRows}/></View>;
    if (pid.includes('speaker')) return <View style={p.speaker}><View style={p.speakerMesh}/></View>;
    if (pid.includes('charger')) return <View style={p.charger}><View style={p.cable}/></View>;
    if (pid.includes('usb')) return <View style={p.usb}><View style={p.usbMetal}/></View>;

    // Fallback
    return <View style={p.genericBox}><Text style={{fontSize:20}}>📦</Text></View>;
  })();

  return (
    <View style={{ transform: [{ scale }] }}>
      {content}
    </View>
  );
};

const p = StyleSheet.create({
    // GENERAL
    tinyText: { fontSize: 6, fontWeight:'bold', color:'#333' },
    tinyTextWhite: { fontSize: 6, fontWeight:'bold', color:'#FFF' },
    tinyTextDark: { fontSize: 6, fontWeight:'bold', color:'#5D4037' },
    tinyTextBlue: { fontSize: 6, fontWeight:'bold', color:'#0D47A1' },
    tinyTextGreen: { fontSize: 6, fontWeight:'bold', color:'#1B5E20' },
    genericBox: { width: 40, height: 40, backgroundColor: '#B0BEC5', borderRadius: 4, alignItems: 'center', justifyContent: 'center' },

    // FRUITS
    apple: { width: 40, height: 40, backgroundColor: '#F44336', borderRadius: 20, borderWidth: 2, borderColor: '#B71C1C' },
    appleShine: { position: 'absolute', top: 5, right: 8, width: 8, height: 8, backgroundColor: '#FFCDD2', borderRadius: 4 },
    appleStem: { position: 'absolute', top: -6, left: 18, width: 4, height: 8, backgroundColor: '#795548' },
    appleLeaf: { position: 'absolute', top: -6, left: 20, width: 12, height: 6, backgroundColor: '#4CAF50', borderRadius: 6, transform:[{rotate:'-30deg'}] },
    banana: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
    bananaCurve: { width: 40, height: 20, backgroundColor: '#FFEB3B', borderBottomLeftRadius: 25, borderBottomRightRadius: 25, borderWidth: 2, borderColor: '#FBC02D', transform: [{rotate: '-45deg'}] },
    bananaStem: { position: 'absolute', top: 5, right: 5, width: 6, height: 6, backgroundColor: '#388E3C' },
    tomato: { width: 42, height: 38, backgroundColor: '#F44336', borderRadius: 19, borderWidth: 2, borderColor: '#B71C1C' },
    tomatoLeaf: { position: 'absolute', top: -4, left: 12, width: 18, height: 6, backgroundColor: '#388E3C', borderRadius: 3 },
    tomatoShine: { position: 'absolute', top: 8, right: 8, width: 6, height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3 },
    lettuce: { width: 45, height: 40, backgroundColor: '#81C784', borderRadius: 20, borderWidth: 2, borderColor: '#388E3C' },
    lettuceInner: { position: 'absolute', top: 5, left: 5, width: 35, height: 30, backgroundColor: '#A5D6A7', borderRadius: 15, opacity: 0.5 },
    cucumber: { width: 50, height: 16, backgroundColor: '#43A047', borderRadius: 8, borderWidth: 2, borderColor: '#1B5E20', transform: [{rotate: '-15deg'}] },
    cucumberSpot1: { position: 'absolute', left: 10, top: 4, width: 4, height: 4, backgroundColor: '#A5D6A7', borderRadius: 2 },
    cucumberSpot2: { position: 'absolute', right: 15, top: 6, width: 3, height: 3, backgroundColor: '#A5D6A7', borderRadius: 1.5 },
    strawberry: { width: 30, height: 36, backgroundColor: '#E91E63', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderWidth: 2, borderColor: '#C2185B' },
    berryLeaf: { position: 'absolute', top: -4, width: 30, height: 8, backgroundColor: '#4CAF50' },
    seed1: { position: 'absolute', top: 10, left: 8, width: 2, height: 3, backgroundColor: '#F8BBD0' },
    seed2: { position: 'absolute', top: 15, right: 10, width: 2, height: 3, backgroundColor: '#F8BBD0' },
    seed3: { position: 'absolute', top: 22, left: 12, width: 2, height: 3, backgroundColor: '#F8BBD0' },
    lemon: { width: 40, height: 30, backgroundColor: '#FFEB3B', borderRadius: 15, borderWidth: 2, borderColor: '#FBC02D' },
    lemonEnd1: { position: 'absolute', left: -2, top: 10, width: 4, height: 10, backgroundColor: '#FFEB3B', borderRadius: 2 },
    lemonEnd2: { position: 'absolute', right: -2, top: 10, width: 4, height: 10, backgroundColor: '#FFEB3B', borderRadius: 2 },
    orange: { width: 40, height: 40, backgroundColor: '#FF9800', borderRadius: 20, borderWidth: 2, borderColor: '#F57C00' },
    orangePore: { position: 'absolute', top: 10, left: 10, width: 2, height: 2, backgroundColor: '#F57C00', opacity: 0.5 },
    carrot: { width: 45, height: 15, backgroundColor: '#FF7043', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderWidth: 2, borderColor: '#E64A19' },
    carrotLine1: { position: 'absolute', left: 10, height: 15, width: 2, backgroundColor: '#E64A19', opacity: 0.3 },
    carrotLine2: { position: 'absolute', left: 20, height: 15, width: 2, backgroundColor: '#E64A19', opacity: 0.3 },
    carrotLeaf: { position: 'absolute', right: -5, top: 0, width: 10, height: 15, backgroundColor: '#4CAF50', borderRadius: 5 },
    eggplant: { width: 45, height: 25, backgroundColor: '#7B1FA2', borderRadius: 12, borderWidth: 2, borderColor: '#4A148C', transform: [{rotate: '-10deg'}] },
    eggplantLeaf: { position: 'absolute', top: -2, left: -2, width: 15, height: 8, backgroundColor: '#388E3C', borderRadius: 4 },
    pepper: { width: 35, height: 40, backgroundColor: '#D32F2F', borderRadius: 10, borderWidth: 2, borderColor: '#B71C1C' },
    pepperStem: { position: 'absolute', top: -5, left: 12, width: 6, height: 8, backgroundColor: '#388E3C' },
    watermelon: { width: 45, height: 45, backgroundColor: '#4CAF50', borderRadius: 22.5, borderWidth: 2, borderColor: '#1B5E20' },
    melonStripe1: { position: 'absolute', left: 10, height: 45, width: 4, backgroundColor: '#1B5E20', opacity: 0.6, transform: [{rotate: '10deg'}] },
    melonStripe2: { position: 'absolute', left: 30, height: 45, width: 4, backgroundColor: '#1B5E20', opacity: 0.6, transform: [{rotate: '-10deg'}] },

    // DAIRY
    milkBottle: { width: 25, height: 50, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 2, borderColor: '#B0BEC5', alignItems: 'center' },
    milkCap: { width: 25, height: 8, backgroundColor: '#2196F3', borderTopLeftRadius: 6, borderTopRightRadius: 6 },
    milkLabel: { width: 20, height: 15, backgroundColor: '#E3F2FD', marginTop: 10, alignItems: 'center', justifyContent: 'center' },
    cheese: { width: 45, height: 30, backgroundColor: '#FFC107', borderTopRightRadius: 30, borderWidth: 2, borderColor: '#FFA000' },
    cheeseHole1: { position: 'absolute', top: 8, left: 10, width: 8, height: 8, backgroundColor: '#FFCA28', borderRadius: 4 },
    cheeseHole2: { position: 'absolute', top: 12, right: 10, width: 6, height: 6, backgroundColor: '#FFCA28', borderRadius: 3 },
    yogurtCup: { width: 30, height: 40, backgroundColor: '#FFF', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderWidth: 2, borderColor: '#B0BEC5', alignItems: 'center' },
    yogurtRim: { width: 36, height: 6, backgroundColor: '#F06292', borderRadius: 3 },
    yogurtLabel: { width: 24, height: 15, backgroundColor: '#FCE4EC', marginTop: 5, borderRadius: 2 },
    eggBox: { width: 45, height: 20, backgroundColor: '#D7CCC8', borderRadius: 5, borderWidth: 2, borderColor: '#8D6E63', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' },
    egg1: { width: 12, height: 10, backgroundColor: '#FFF', borderRadius: 6, marginTop: -6, borderWidth: 1, borderColor: '#D7CCC8' },
    egg2: { width: 12, height: 10, backgroundColor: '#FFF', borderRadius: 6, marginTop: -6, borderWidth: 1, borderColor: '#D7CCC8', marginLeft: 2 },
    egg3: { width: 12, height: 10, backgroundColor: '#FFF', borderRadius: 6, marginTop: -6, borderWidth: 1, borderColor: '#D7CCC8', marginLeft: 2 },
    butterBlock: { width: 45, height: 25, backgroundColor: '#FFF59D', borderRadius: 2, borderWidth: 2, borderColor: '#FBC02D', alignItems: 'center', justifyContent: 'center' },
    butterLabel: { width: 35, height: 10, backgroundColor: '#FFEE58', borderWidth: 1, borderColor: '#FBC02D' },
    creamCarton: { width: 30, height: 35, backgroundColor: '#F8BBD0', borderRadius: 4, borderWidth: 2, borderColor: '#EC407A', alignItems: 'center', justifyContent: 'center' },
    creamDrop: { width: 15, height: 15, backgroundColor: '#FFF', borderRadius: 7.5, borderTopRightRadius: 0, transform: [{rotate: '45deg'}] },
    iceCream: { width: 30, height: 50, alignItems: 'center' },
    scoop: { width: 30, height: 30, backgroundColor: '#F48FB1', borderRadius: 15, borderWidth: 2, borderColor: '#C2185B', zIndex: 2 },
    cone: { width: 0, height: 0, borderLeftWidth: 15, borderRightWidth: 15, borderTopWidth: 30, borderStyle: 'solid', backgroundColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#FFCC80', marginTop: -5 },
    ayranCup: { width: 30, height: 40, backgroundColor: '#FFF', borderRadius: 4, borderWidth: 2, borderColor: '#BBDEFB', alignItems: 'center', justifyContent: 'center' },
    puddingBowl: { width: 35, height: 20, backgroundColor: '#795548', borderBottomLeftRadius: 17.5, borderBottomRightRadius: 17.5, overflow: 'hidden' },
    puddingContent: { width: 35, height: 10, backgroundColor: '#5D4037' },
    kefirBottle: { width: 25, height: 45, backgroundColor: '#E8F5E9', borderRadius: 8, borderWidth: 2, borderColor: '#A5D6A7', alignItems: 'center', justifyContent: 'center' },
    cheeseWheel: { width: 40, height: 25, backgroundColor: '#FFD54F', borderRadius: 12, borderWidth: 2, borderColor: '#FBC02D' },
    cheeseWedge: { position: 'absolute', top: 0, right: 10, width: 15, height: 25, backgroundColor: 'rgba(0,0,0,0.1)' },
    labneTub: { width: 40, height: 20, backgroundColor: '#E3F2FD', borderRadius: 5, borderWidth: 2, borderColor: '#2196F3', alignItems: 'center', justifyContent: 'center' },

    // BAKERY
    breadLoaf: { width: 50, height: 30, backgroundColor: '#D7CCC8', borderTopLeftRadius: 15, borderTopRightRadius: 15, borderWidth: 2, borderColor: '#8D6E63' },
    breadTop: { width: 50, height: 10, backgroundColor: '#A1887F', borderTopLeftRadius: 15, borderTopRightRadius: 15, opacity: 0.5 },
    breadCut1: { position: 'absolute', top: 5, left: 15, width: 4, height: 15, backgroundColor: '#5D4037', opacity: 0.2 },
    breadCut2: { position: 'absolute', top: 5, left: 30, width: 4, height: 15, backgroundColor: '#5D4037', opacity: 0.2 },
    croissant: { width: 45, height: 25, backgroundColor: '#FFCC80', borderRadius: 12, borderWidth: 2, borderColor: '#EF6C00' },
    croissantLine: { position: 'absolute', top: 5, left: 15, width: 15, height: 15, borderColor: '#EF6C00', borderTopWidth: 2, borderRadius: 10 },
    cookie: { width: 35, height: 35, backgroundColor: '#D7CCC8', borderRadius: 17.5, borderWidth: 2, borderColor: '#8D6E63' },
    chocChip1: { position: 'absolute', top: 8, left: 8, width: 6, height: 6, backgroundColor: '#3E2723', borderRadius: 3 },
    chocChip2: { position: 'absolute', top: 18, right: 10, width: 5, height: 5, backgroundColor: '#3E2723', borderRadius: 2.5 },
    chocChip3: { position: 'absolute', top: 10, right: 8, width: 4, height: 4, backgroundColor: '#3E2723', borderRadius: 2 },
    cakeSlice: { width: 40, height: 30, backgroundColor: '#F8BBD0', borderTopRightRadius: 20, borderWidth: 2, borderColor: '#C2185B' },
    cakeLayer: { position: 'absolute', bottom: 5, width: '100%', height: 5, backgroundColor: '#C2185B' },
    cherry: { position: 'absolute', top: -5, right: 15, width: 10, height: 10, backgroundColor: '#C2185B', borderRadius: 5 },
    baguette: { width: 60, height: 15, backgroundColor: '#FFCC80', borderRadius: 7.5, borderWidth: 2, borderColor: '#E65100', transform: [{rotate: '-10deg'}] },
    baguetteCut1: { position: 'absolute', left: 15, top: 2, width: 2, height: 10, backgroundColor: '#E65100' },
    baguetteCut2: { position: 'absolute', left: 35, top: 2, width: 2, height: 10, backgroundColor: '#E65100' },
    donut: { width: 35, height: 35, backgroundColor: '#8D6E63', borderRadius: 17.5, borderWidth: 2, borderColor: '#5D4037', alignItems: 'center', justifyContent: 'center' },
    donutHole: { width: 10, height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, borderWidth: 2, borderColor: '#5D4037' },
    sprinkle1: { position: 'absolute', top: 5, left: 10, width: 4, height: 2, backgroundColor: '#E91E63' },
    sprinkle2: { position: 'absolute', bottom: 8, right: 10, width: 4, height: 2, backgroundColor: '#2196F3' },
    simit: { width: 40, height: 40, borderRadius: 20, borderWidth: 6, borderColor: '#D84315', backgroundColor: 'transparent' },
    simitHole: { width: '100%', height: '100%', borderRadius: 20, borderWidth: 1, borderColor: '#BF360C', borderStyle: 'dashed' },
    pizza: { width: 40, height: 40, backgroundColor: '#FFD54F', borderRadius: 20, borderTopLeftRadius: 0, borderWidth: 2, borderColor: '#FFA000' },
    pepperoni1: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, backgroundColor: '#D32F2F', borderRadius: 4 },
    pepperoni2: { position: 'absolute', bottom: 10, left: 10, width: 8, height: 8, backgroundColor: '#D32F2F', borderRadius: 4 },
    muffin: { width: 30, height: 35, alignItems: 'center' },
    muffinTop: { width: 30, height: 20, backgroundColor: '#A1887F', borderRadius: 15, zIndex: 1 },
    muffinBottom: { width: 25, height: 15, backgroundColor: '#8D6E63', marginTop: -5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 },
    pie: { width: 40, height: 25, backgroundColor: '#FBC02D', borderRadius: 12.5, borderWidth: 2, borderColor: '#F57F17' },
    pieCrust: { position: 'absolute', top: 2, left: 2, right: 2, height: 21, borderRadius: 10, borderColor: '#F57F17', borderWidth: 1, borderStyle: 'dotted' },
    pieFilling: { position: 'absolute', top: 5, left: 5, width: 30, height: 15, backgroundColor: '#D32F2F', borderRadius: 5, opacity: 0.5 },
    sandwich: { width: 40, height: 30, justifyContent: 'center', alignItems: 'center' },
    sandBread: { width: 30, height: 30, backgroundColor: '#FFF9C4', transform: [{rotate: '45deg'}], borderWidth: 1, borderColor: '#FBC02D' },
    sandFilling: { position: 'absolute', width: 35, height: 5, backgroundColor: '#4CAF50', transform: [{rotate: '-45deg'}] },
    pide: { width: 50, height: 20, backgroundColor: '#FFECB3', borderRadius: 10, borderWidth: 2, borderColor: '#FFB300' },
    pideInner: { position: 'absolute', top: 4, left: 10, width: 30, height: 12, backgroundColor: '#795548', borderRadius: 6 },

    // DRINKS
    colaCan: { width: 25, height: 45, backgroundColor: '#D32F2F', borderRadius: 5, borderWidth: 2, borderColor: '#B71C1C', alignItems: 'center', justifyContent: 'center' },
    colaStripe: { position: 'absolute', top: 10, width: '100%', height: 10, backgroundColor: '#FFF', opacity: 0.3, transform:[{rotate:'-10deg'}] },
    waterBottle: { width: 25, height: 50, backgroundColor: '#E1F5FE', borderRadius: 8, borderWidth: 2, borderColor: '#0288D1', alignItems: 'center' },
    waterCap: { width: 25, height: 8, backgroundColor: '#0277BD', borderTopLeftRadius: 6, borderTopRightRadius: 6 },
    waterLabel: { width: 25, height: 15, backgroundColor: '#0288D1', marginTop: 12 },
    juiceCarton: { width: 30, height: 45, backgroundColor: '#FF9800', borderRadius: 4, borderWidth: 2, borderColor: '#EF6C00', alignItems: 'center', justifyContent: 'center' },
    juiceOrange: { width: 15, height: 15, backgroundColor: '#F57C00', borderRadius: 7.5 },
    straw: { position: 'absolute', top: -10, right: 5, width: 4, height: 15, backgroundColor: '#FFF', borderTopRightRadius: 5 },
    teaCup: { width: 35, height: 30, backgroundColor: '#81C784', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, borderWidth: 2, borderColor: '#388E3C' },
    teaTag: { position: 'absolute', top: -5, right: -5, width: 10, height: 10, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CCC' },
    coffeeCup: { width: 30, height: 40, backgroundColor: '#FFF', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderWidth: 2, borderColor: '#CCC', alignItems: 'center', justifyContent: 'center' },
    coffeeSleeve: { width: 32, height: 15, backgroundColor: '#8D6E63' },
    steam: { position: 'absolute', top: -10, width: 4, height: 8, backgroundColor: '#CCC', borderRadius: 2 },
    lemonade: { width: 30, height: 45, backgroundColor: '#FFF9C4', borderRadius: 5, borderWidth: 2, borderColor: '#FBC02D', alignItems: 'center' },
    lemonSlice: { position: 'absolute', top: -10, right: -5, width: 15, height: 15, backgroundColor: '#FFEE58', borderRadius: 7.5, borderWidth: 1, borderColor: '#FBC02D' },
    milkshake: { width: 30, height: 50, backgroundColor: '#F8BBD0', borderRadius: 8, borderWidth: 2, borderColor: '#EC407A', alignItems: 'center' },
    sodaBottle: { width: 25, height: 45, backgroundColor: '#B2DFDB', borderRadius: 8, borderWidth: 2, borderColor: '#009688', alignItems: 'center', justifyContent: 'center' },
    ojBottle: { width: 28, height: 48, backgroundColor: '#FFE0B2', borderRadius: 8, borderWidth: 2, borderColor: '#FF9800', alignItems: 'center' },
    ojCap: { width: 28, height: 8, backgroundColor: '#FF9800', borderTopLeftRadius: 6, borderTopRightRadius: 6 },
    energyCan: { width: 25, height: 48, backgroundColor: '#212121', borderRadius: 5, borderWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center' },
    bolt: { width: 10, height: 20, backgroundColor: '#FFEB3B', transform: [{skewX: '-20deg'}] },
    hotChoco: { width: 35, height: 30, backgroundColor: '#5D4037', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
    iceTeaCan: { width: 25, height: 45, backgroundColor: '#8D6E63', borderRadius: 5, borderWidth: 2, borderColor: '#5D4037', alignItems: 'center', justifyContent: 'center' },

    // SNACKS
    chipsBag: { width: 35, height: 50, backgroundColor: '#FFC107', borderRadius: 5, borderWidth: 2, borderColor: '#FFA000', alignItems: 'center', justifyContent: 'center' },
    chipsLogo: { width: 20, height: 20, backgroundColor: '#FFF', borderRadius: 10, marginBottom: 2 },
    chocoBar: { width: 45, height: 25, backgroundColor: '#5D4037', borderRadius: 3, borderWidth: 2, borderColor: '#3E2723', alignItems: 'center', justifyContent: 'center' },
    chocoWrapper: { position: 'absolute', left: 0, width: 15, height: 25, backgroundColor: '#BDBDBD', borderTopLeftRadius: 2, borderBottomLeftRadius: 2 },
    candyWrapper: { width: 30, height: 15, backgroundColor: '#E040FB', borderRadius: 5, borderWidth: 2, borderColor: '#AA00FF' },
    candyEndLeft: { position: 'absolute', left: -5, top: 2, width: 6, height: 10, backgroundColor: '#E040FB', borderRadius: 3 },
    candyEndRight: { position: 'absolute', right: -5, top: 2, width: 6, height: 10, backgroundColor: '#E040FB', borderRadius: 3 },
    popcornBucket: { width: 30, height: 40, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#F44336', borderBottomLeftRadius: 5, borderBottomRightRadius: 5, borderTopWidth: 0 },
    popcornTop: { position: 'absolute', top: -5, width: 34, height: 10, backgroundColor: '#FFEB3B', borderRadius: 5 },
    cracker: { width: 35, height: 35, backgroundColor: '#FFE0B2', borderRadius: 2, borderWidth: 2, borderColor: '#FFB74D' },
    crackerHole1: { position: 'absolute', top: 5, left: 5, width: 4, height: 4, backgroundColor: '#FFB74D', borderRadius: 2 },
    crackerHole2: { position: 'absolute', bottom: 5, right: 5, width: 4, height: 4, backgroundColor: '#FFB74D', borderRadius: 2 },
    jellyBag: { width: 30, height: 40, backgroundColor: '#CE93D8', borderRadius: 5, borderWidth: 2, borderColor: '#AB47BC', alignItems: 'center', justifyContent: 'center' },
    jellyBear: { width: 15, height: 20, backgroundColor: '#8E24AA', borderRadius: 5 },
    pretzel: { width: 35, height: 25, backgroundColor: '#8D6E63', borderRadius: 10, borderWidth: 3, borderColor: '#5D4037' },
    pretzelHole1: { position: 'absolute', left: 5, top: 5, width: 8, height: 8, backgroundColor: '#FFF', borderRadius: 4 },
    pretzelHole2: { position: 'absolute', right: 5, top: 5, width: 8, height: 8, backgroundColor: '#FFF', borderRadius: 4 },
    biscuit: { width: 40, height: 20, backgroundColor: '#D7CCC8', borderRadius: 4, borderWidth: 1, borderColor: '#8D6E63', justifyContent: 'center', alignItems: 'center' },
    biscuitDot: { width: 4, height: 4, backgroundColor: '#8D6E63', borderRadius: 2 },
    wafer: { width: 40, height: 15, backgroundColor: '#FFE0B2', borderWidth: 1, borderColor: '#FFB74D' },
    waferLine: { position: 'absolute', left: 10, width: 2, height: 13, backgroundColor: '#FFB74D' },
    nachos: { width: 35, height: 35, backgroundColor: 'transparent', borderLeftWidth: 17.5, borderRightWidth: 17.5, borderBottomWidth: 35, borderStyle: 'solid', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FFEB3B' },
    nachoCheese: { position: 'absolute', top: 10, left: -5, width: 10, height: 10, backgroundColor: '#FF5722', borderRadius: 5 },
    nutsBag: { width: 30, height: 40, backgroundColor: '#795548', borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
    bar: { width: 45, height: 15, backgroundColor: '#5D4037', borderRadius: 2 },
    barLine: { position: 'absolute', left: 15, width: 15, height: 15, backgroundColor: '#8D6E63' },

    // ELECTRONICS
    phone: { width: 25, height: 45, backgroundColor: '#212121', borderRadius: 4, borderWidth: 2, borderColor: '#000', alignItems: 'center' },
    screen: { width: 21, height: 35, backgroundColor: '#424242', marginTop: 2 },
    homeButton: { width: 4, height: 4, backgroundColor: '#616161', borderRadius: 2, marginTop: 2 },
    laptop: { width: 50, height: 35, alignItems: 'center', justifyContent: 'flex-end' },
    laptopScreen: { width: 40, height: 25, backgroundColor: '#424242', borderWidth: 2, borderColor: '#212121', marginBottom: -2 },
    keyboard: { width: 50, height: 10, backgroundColor: '#616161', borderTopLeftRadius: 2, borderTopRightRadius: 2 },
    headphone: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    headband: { position: 'absolute', top: 0, width: 30, height: 30, borderRadius: 15, borderWidth: 4, borderColor: '#212121', borderBottomColor: 'transparent' },
    earCupLeft: { position: 'absolute', bottom: 5, left: 0, width: 10, height: 15, backgroundColor: '#424242', borderRadius: 4 },
    earCupRight: { position: 'absolute', bottom: 5, right: 0, width: 10, height: 15, backgroundColor: '#424242', borderRadius: 4 },
    camera: { width: 40, height: 30, backgroundColor: '#607D8B', borderRadius: 4, borderWidth: 2, borderColor: '#455A64', alignItems: 'center', justifyContent: 'center' },
    lens: { width: 18, height: 18, backgroundColor: '#212121', borderRadius: 9, borderWidth: 2, borderColor: '#B0BEC5' },
    flash: { position: 'absolute', top: 4, right: 4, width: 6, height: 4, backgroundColor: '#FFF' },
    tablet: { width: 40, height: 50, backgroundColor: '#424242', borderRadius: 4, borderWidth: 2, borderColor: '#212121', alignItems: 'center', justifyContent: 'center' },
    mouse: { width: 25, height: 35, backgroundColor: '#BDBDBD', borderRadius: 12.5, borderWidth: 2, borderColor: '#9E9E9E' },
    mouseWheel: { position: 'absolute', top: 5, width: 4, height: 8, backgroundColor: '#616161', borderRadius: 2 },
    mouseCord: { position: 'absolute', top: -10, width: 2, height: 10, backgroundColor: '#616161' },
    gamepad: { width: 50, height: 30, backgroundColor: '#546E7A', borderRadius: 15, borderWidth: 2, borderColor: '#455A64', justifyContent: 'center' },
    gameBtn1: { position: 'absolute', left: 8, width: 10, height: 10, backgroundColor: '#EF5350', borderRadius: 5 },
    gameBtn2: { position: 'absolute', right: 8, width: 8, height: 8, backgroundColor: '#42A5F5', borderRadius: 4 },
    watch: { width: 25, height: 35, backgroundColor: '#333', borderRadius: 5, borderWidth: 2, borderColor: '#000', alignItems: 'center', justifyContent: 'center' },
    watchScreen: { width: 20, height: 20, backgroundColor: '#000', borderRadius: 2 },
    keyboardKey: { width: 50, height: 25, backgroundColor: '#EEEEEE', borderRadius: 4, borderWidth: 1, borderColor: '#BDBDBD', padding: 2 },
    keyRows: { width: '100%', height: '100%', backgroundColor: '#E0E0E0', borderWidth: 1, borderColor: '#9E9E9E', borderStyle: 'dotted' },
    speaker: { width: 35, height: 50, backgroundColor: '#212121', borderRadius: 2 },
    speakerMesh: { position: 'absolute', bottom: 10, left: 2.5, width: 30, height: 20, backgroundColor: '#424242', borderRadius: 15 },
    charger: { width: 30, height: 30, backgroundColor: '#FFF', borderRadius: 4, borderWidth: 1, borderColor: '#CCC' },
    cable: { position: 'absolute', right: -10, top: 10, width: 20, height: 4, backgroundColor: '#CCC' },
    usb: { width: 15, height: 30, backgroundColor: '#1976D2', borderRadius: 2 },
    usbMetal: { width: 15, height: 10, backgroundColor: '#B0BEC5', marginTop: -10 },
});

