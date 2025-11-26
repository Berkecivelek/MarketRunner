import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import type { ShelfDefinition } from '../data/products';

// --- Types ---
interface SceneViewProps {
  shelves: ShelfDefinition[];
  onProductSelect: (productId: string, brandId?: string) => void;
  gameMode: string;
  onInteract?: (id: string) => void;
  onBack: () => void;
  orderItems?: any[];
  collectedMap?: Record<string, number>;
}

// Helper to get readable names
const getProductName = (id: string): string => {
  const names: Record<string, string> = {
    'apple': 'Elma', 'banana': 'Muz', 'tomato': 'Domates', 'lettuce': 'Marul',
    'cucumber': 'Salatalık', 'strawberry': 'Çilek', 'lemon': 'Limon', 'orange': 'Portakal',
    'carrot': 'Havuç', 'eggplant': 'Patlıcan', 'pepper': 'Biber', 'watermelon': 'Karpuz',
    
    'milk': 'Süt', 'cheese': 'Peynir', 'yogurt': 'Yoğurt', 'egg': 'Yumurta',
    'butter': 'Tereyağı', 'cream': 'Krema', 'ice-cream': 'Dondurma', 'ayran': 'Ayran',
    'pudding': 'Puding', 'kefir': 'Kefir', 'cheesewheel': 'Kaşar', 'labne': 'Labne',

    'bread': 'Ekmek', 'croissant': 'Kruvasan', 'cookie': 'Kurabiye', 'cake': 'Pasta',
    'baguette': 'Baget', 'donut': 'Donut', 'simit': 'Simit', 'pizza': 'Pizza',
    'muffin': 'Muffin', 'pie': 'Turta', 'sandwich': 'Sandviç', 'pide': 'Pide',

    'cola': 'Kola', 'water': 'Su', 'fruit-juice': 'M. Suyu', 'tea': 'Çay',
    'coffee': 'Kahve', 'soda': 'Gazoz', 'lemonade': 'Limonata', 'milkshake': 'Milkshake',
    'orangejuice': 'Port. Suyu', 'energydrink': 'Enerji', 'hotchoco': 'Sıcak Çik.', 'icetea': 'Soğuk Çay',

    'chips': 'Cips', 'chocolate': 'Çikolata', 'candy': 'Şeker', 'popcorn': 'Mısır',
    'cracker': 'Kraker', 'pretzel': 'Kraker', 'jelly': 'Jelibon', 'biscuit': 'Bisküvi',
    'wafer': 'Gofret', 'nachos': 'Nachos', 'nuts': 'Kuruyemiş', 'bar': 'Bar',

    'phone': 'Telefon', 'laptop': 'Laptop', 'headphone': 'Kulaklık', 'camera': 'Kamera',
    'tablet': 'Tablet', 'mouse': 'Mouse', 'gamepad': 'Oyun Kolu', 'watch': 'Saat',
    'keyboard': 'Klavye', 'speaker': 'Hoparlör', 'charger': 'Şarj', 'usb': 'USB'
  };
  // Fallback logic
  if (names[id]) return names[id];
  const lower = id.toLowerCase();
  for (const key in names) {
      if (lower.includes(key)) return names[key];
  }
  return id.toUpperCase();
};

// --- ENHANCED CARTOON PRODUCTS (Large & Clear) ---
const CartoonProduct: React.FC<{ id: string }> = ({ id }) => {
    const pid = id.toLowerCase();
    
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
};

export const SceneView: React.FC<SceneViewProps> = ({ shelves, onProductSelect, onBack, orderItems = [], collectedMap = {} }) => {
  const [orientationLocked, setOrientationLocked] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [playerX, setPlayerX] = useState(100);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [walking, setWalking] = useState(false);
  const [showOrderList, setShowOrderList] = useState(false);
  const moveInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  
  const charLegAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const lockLandscape = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        setOrientationLocked(true);
    };
    lockLandscape();
    return () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  useEffect(() => {
      if (walking) {
          Animated.loop(
              Animated.sequence([
                  Animated.timing(charLegAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
                  Animated.timing(charLegAnim, { toValue: 0, duration: 150, useNativeDriver: true })
              ])
          ).start();
      } else {
          charLegAnim.setValue(0);
      }
  }, [walking]);

  const SHELF_UNIT_WIDTH = 380; 
  const SHELF_GAP = 50;
  const CASHIER_WIDTH = 300;
  const TOTAL_WIDTH = (SHELF_UNIT_WIDTH * 6) + (SHELF_GAP * 5) + CASHIER_WIDTH + 300; 
  const SCREEN_WIDTH_LANDSCAPE = Math.max(Dimensions.get('window').width, Dimensions.get('window').height); 
  
  const moveCharacter = (dir: 'left' | 'right') => {
      setDirection(dir);
      setWalking(true);
      const speed = 15;
      setPlayerX(prev => {
          let newX = dir === 'right' ? prev + speed : prev - speed;
          if (newX < 50) newX = 50;
          if (newX > TOTAL_WIDTH - 100) newX = TOTAL_WIDTH - 100;
          const idealScroll = newX - (SCREEN_WIDTH_LANDSCAPE / 2);
          const maxScroll = TOTAL_WIDTH - SCREEN_WIDTH_LANDSCAPE;
          const finalScroll = Math.max(0, Math.min(idealScroll, maxScroll));
          scrollX.setValue(finalScroll);
          return newX;
      });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
          if (gestureState.vx > 0.5) moveCharacter('right');
          else if (gestureState.vx < -0.5) moveCharacter('left');
      },
      onPanResponderRelease: () => setWalking(false)
    })
  ).current;

  // --- DATA MOCKING FOR FULL SHELVES ---
  const createItem = (id: string) => ({ productId: id, brandId: undefined });

  // 12 Unique Items Per Category
  const shelfProduce = [
      createItem('apple'), createItem('banana'), createItem('tomato'), createItem('lettuce'),
      createItem('cucumber'), createItem('strawberry'), createItem('lemon'), createItem('orange'),
      createItem('carrot'), createItem('eggplant'), createItem('pepper'), createItem('watermelon')
  ];
  const shelfBakery = [
      createItem('bread'), createItem('croissant'), createItem('cake'), createItem('cookie'),
      createItem('baguette'), createItem('donut'), createItem('simit'), createItem('pizza'),
      createItem('muffin'), createItem('pie'), createItem('sandwich'), createItem('pide')
  ];
  const shelfDairy = [
      createItem('milk'), createItem('cheese'), createItem('yogurt'), createItem('egg'),
      createItem('butter'), createItem('cream'), createItem('ice-cream'), createItem('ayran'),
      createItem('pudding'), createItem('kefir'), createItem('cheesewheel'), createItem('labne')
  ];
  const shelfDrinks = [
      createItem('water'), createItem('cola'), createItem('fruit-juice'), createItem('tea'),
      createItem('coffee'), createItem('lemonade'), createItem('milkshake'), createItem('soda'),
      createItem('orangejuice'), createItem('energydrink'), createItem('hotchoco'), createItem('icetea')
  ];
  const shelfSnacks = [
      createItem('chips'), createItem('chocolate'), createItem('candy'), createItem('popcorn'),
      createItem('cracker'), createItem('jelly'), createItem('pretzel'), createItem('biscuit'),
      createItem('wafer'), createItem('nachos'), createItem('nuts'), createItem('bar')
  ];
  const shelfElectronics = [
      createItem('phone'), createItem('laptop'), createItem('headphone'), createItem('camera'),
      createItem('tablet'), createItem('mouse'), createItem('gamepad'), createItem('watch'),
      createItem('keyboard'), createItem('speaker'), createItem('charger'), createItem('usb')
  ];

  const SHELF_DATA = [
      { title: 'MANAV', color: '#4CAF50', items: shelfProduce },
      { title: 'FIRIN', color: '#FF9800', items: shelfBakery },
      { title: 'SÜT ÜRÜNLERİ', color: '#2196F3', items: shelfDairy },
      { title: 'İÇECEKLER', color: '#E91E63', items: shelfDrinks },
      { title: 'ATIŞTIRMALIK', color: '#FFC107', items: shelfSnacks },
      { title: 'ELEKTRONİK', color: '#607D8B', items: shelfElectronics },
  ];

  if (!orientationLocked) return <View style={{flex:1, backgroundColor:'#000'}} />;

  return (
    <View style={styles.container}>
        <View style={styles.uiLayer} pointerEvents="box-none">
             <View style={styles.topBar}>
                 <TouchableOpacity style={styles.iconButton} onPress={onBack}><Text style={styles.iconText}>🔙</Text></TouchableOpacity>
                 <TouchableOpacity style={styles.iconButton} onPress={() => setShowOrderList(!showOrderList)}><Text style={styles.iconText}>📝</Text></TouchableOpacity>
             </View>
             {showOrderList && (
                 <View style={styles.orderListOverlay}>
                     <Text style={styles.orderTitle}>Alışveriş Listesi</Text>
                     {orderItems.map((item, idx) => {
                         const key = `${item.productId}__${item.brandId || 'default'}`;
                         const collected = collectedMap[key] || 0;
                         const isDone = collected >= item.quantity;
                         return (
                             <View key={idx} style={[styles.orderItem, isDone && styles.orderItemDone]}>
                                 <View style={{transform:[{scale:0.4}], marginRight:-15}}><CartoonProduct id={item.productId}/></View>
                                 <Text style={[styles.orderText, isDone && styles.textDone]}>{collected}/{item.quantity}</Text>
                                 {isDone && <Text>✅</Text>}
                             </View>
                         );
                     })}
                 </View>
             )}
        </View>

        <View style={styles.controlsLayer} pointerEvents="box-none">
             <TouchableOpacity style={[styles.controlBtn, {left:30}]} onPressIn={() => {if(moveInterval.current) clearInterval(moveInterval.current); moveInterval.current = setInterval(() => moveCharacter('left'), 16)}} onPressOut={() => {if(moveInterval.current) clearInterval(moveInterval.current); setWalking(false)}}><Text style={styles.controlText}>◀</Text></TouchableOpacity>
             <TouchableOpacity style={[styles.controlBtn, {right:30}]} onPressIn={() => {if(moveInterval.current) clearInterval(moveInterval.current); moveInterval.current = setInterval(() => moveCharacter('right'), 16)}} onPressOut={() => {if(moveInterval.current) clearInterval(moveInterval.current); setWalking(false)}}><Text style={styles.controlText}>▶</Text></TouchableOpacity>
        </View>

        <Animated.View style={[styles.sceneContainer, { width: TOTAL_WIDTH, transform: [{ translateX: Animated.multiply(scrollX, -1) }] }]} {...panResponder.panHandlers}>
            <View style={styles.shopInterior}>
                <View style={styles.ceiling} />
                <View style={styles.backWall}>
                    {[0, 1, 2, 3, 4].map(i => (
                        <View key={i} style={[styles.window, {left: 200 + (i * 600)}]}><View style={styles.sky}/><View style={styles.windowFrame}/></View>
                    ))}
                </View>
                <View style={styles.floor}><View style={styles.floorPattern}/></View>
            </View>

            {SHELF_DATA.map((shelf, idx) => (
                <View key={idx} style={[styles.shelfUnit, { left: 100 + (idx * (SHELF_UNIT_WIDTH + SHELF_GAP)) }]}>
                    <View style={[styles.shelfHeader, { backgroundColor: shelf.color }]}>
                        <Text style={styles.shelfTitle}>{shelf.title}</Text>
                    </View>
                    <View style={styles.shelfContent}>
                        {[0, 4, 8].map((startIndex, rowIdx) => (
                            <React.Fragment key={rowIdx}>
                                <View style={styles.shelfRow}>
                                    {shelf.items.slice(startIndex, startIndex + 4).map((item, i) => (
                                        <TouchableOpacity key={`r${rowIdx}-${i}`} style={styles.productSlot} onPress={() => onProductSelect(item.productId, item.brandId)}>
                                            <CartoonProduct id={item.productId} />
                                            <View style={styles.priceTag}>
                                                <Text style={styles.productName}>{getProductName(item.productId)}</Text>
                                                <Text style={styles.priceText}>5🟡</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {rowIdx < 8 && <View style={styles.shelfPlank} />}
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            ))}

            <View style={[styles.cashierArea, { left: TOTAL_WIDTH - CASHIER_WIDTH - 50 }]}>
                 <View style={styles.bear}>
                     <View style={styles.bearHead}><View style={styles.bearFace}/></View>
                     <View style={styles.bearBody}><View style={styles.bearApron}/></View>
                 </View>
                 <View style={styles.checkoutCounter}><Text style={styles.checkoutText}>KASA</Text></View>
            </View>

            {/* NEW CHARACTER */}
            <Animated.View style={[styles.character, { left: playerX, transform: [{ scaleX: direction === 'left' ? -1 : 1 }, { translateY: charLegAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]}>
                 {/* Hat */}
                 <View style={styles.kidHat}>
                     <View style={styles.kidHatVisor}/>
                     <View style={styles.kidHatTop}/>
                 </View>
                 {/* Head */}
                 <View style={styles.kidHead}>
                     <View style={styles.kidEyeLeft}/>
                     <View style={styles.kidEyeRight}/>
                     <View style={styles.kidSmile}/>
                 </View>
                 {/* Body */}
                 <View style={styles.kidBody}>
                    <View style={styles.kidOveralls}/>
                    <View style={styles.kidButtons}/>
                 </View>
                 {/* Backpack */}
                 <View style={styles.kidBackpack}/>
                 {/* Legs */}
                 <View style={styles.kidLegs}>
                     <View style={styles.kidLegLeft}/>
                     <View style={styles.kidLegRight}/>
                 </View>
            </Animated.View>

        </Animated.View>
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

    // FRUITS (Existing + New)
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

    // NEW CHARACTER STYLES
    character: { position: 'absolute', bottom: '18%', width: 60, height: 100, zIndex: 50, alignItems: 'center' },
    kidHat: { position: 'absolute', top: 0, zIndex: 5, alignItems: 'center' },
    kidHatTop: { width: 32, height: 15, backgroundColor: '#FDD835', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderWidth: 2, borderColor: '#FBC02D' },
    kidHatVisor: { position: 'absolute', bottom: 0, width: 40, height: 5, backgroundColor: '#FDD835', borderRadius: 2 },
    kidHead: { width: 34, height: 34, backgroundColor: '#FFCC80', borderRadius: 17, borderWidth: 2, borderColor: '#E65100', top: 10, zIndex: 3, alignItems: 'center' },
    kidEyeLeft: { position: 'absolute', top: 12, left: 8, width: 4, height: 6, backgroundColor: '#333', borderRadius: 2 },
    kidEyeRight: { position: 'absolute', top: 12, right: 8, width: 4, height: 6, backgroundColor: '#333', borderRadius: 2 },
    kidSmile: { position: 'absolute', bottom: 8, width: 10, height: 4, borderBottomWidth: 2, borderColor: '#333', borderRadius: 5 },
    kidBody: { width: 40, height: 45, backgroundColor: '#4CAF50', top: 8, borderRadius: 8, borderWidth: 2, borderColor: '#388E3C', zIndex: 2, alignItems: 'center' },
    kidOveralls: { position: 'absolute', bottom: 0, width: '100%', height: 25, backgroundColor: '#1976D2', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
    kidButtons: { flexDirection: 'row', marginTop: 25, gap: 15 },
    kidBackpack: { position: 'absolute', top: 45, width: 46, height: 35, backgroundColor: '#FF5722', borderRadius: 8, zIndex: 1, borderWidth: 2, borderColor: '#E64A19' },
    kidLegs: { flexDirection: 'row', top: 5, gap: 8 },
    kidLegLeft: { width: 12, height: 20, backgroundColor: '#1565C0', borderRadius: 4, borderWidth: 2, borderColor: '#0D47A1' },
    kidLegRight: { width: 12, height: 20, backgroundColor: '#1565C0', borderRadius: 4, borderWidth: 2, borderColor: '#0D47A1' }
});

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    sceneContainer: { height: '100%', position: 'relative' },
    uiLayer: { ...StyleSheet.absoluteFillObject, zIndex: 2000 },
    controlsLayer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, justifyContent: 'center' },
    
    topBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
    iconButton: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
    iconText: { fontSize: 24 },
    
    orderListOverlay: { position: 'absolute', top: 80, right: 20, backgroundColor: 'rgba(0,0,0,0.9)', padding: 15, borderRadius: 10, borderWidth: 2, borderColor: '#FFCA28', maxHeight: 250 },
    orderTitle: { color: '#FFCA28', fontWeight: 'bold', marginBottom: 10 },
    orderItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
    orderItemDone: { opacity: 0.5 },
    orderText: { color: '#FFF', marginLeft: 15 },
    textDone: { textDecorationLine: 'line-through' },

    controlBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute', bottom: 30, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
    controlText: { fontSize: 40, color: '#FFF' },

    shopInterior: { ...StyleSheet.absoluteFillObject, zIndex: 0, backgroundColor: '#E0E0E0' },
    ceiling: { position: 'absolute', top: 0, left: 0, right: 0, height: '20%', backgroundColor: '#CFD8DC', borderBottomWidth: 2, borderColor: '#90A4AE' },
    backWall: { position: 'absolute', top: '20%', bottom: '20%', left: 0, right: 0, backgroundColor: '#FFF3E0' },
    window: { position: 'absolute', top: 30, width: 120, height: 100, backgroundColor: '#81D4FA', borderWidth: 4, borderColor: '#5D4037' },
    windowFrame: { position: 'absolute', top: '50%', width: '100%', height: 4, backgroundColor: '#5D4037' },
    sky: { flex: 1, backgroundColor: '#B3E5FC' },
    floor: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%', backgroundColor: '#8D6E63', borderTopWidth: 4, borderColor: '#5D4037' },
    floorPattern: { ...StyleSheet.absoluteFillObject, opacity: 0.1 },

    shelfUnit: { position: 'absolute', bottom: '20%', width: 380, height: 280, backgroundColor: '#8D6E63', borderWidth: 4, borderColor: '#5D4037', borderRadius: 10, zIndex: 10 },
    shelfHeader: { height: 35, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 2, borderColor: 'rgba(0,0,0,0.2)' },
    shelfTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
    shelfContent: { flex: 1, justifyContent: 'space-evenly', padding: 5 },
    shelfRow: { flexDirection: 'row', justifyContent: 'space-around' },
    shelfPlank: { height: 8, backgroundColor: '#A1887F', width: '100%', borderRadius: 2 },
    productSlot: { alignItems: 'center', width: 60, justifyContent: 'flex-end' },
    productName: { fontSize: 8, color: '#333', fontWeight: 'bold', marginBottom: 2, textAlign: 'center' },
    priceTag: { backgroundColor: '#FFF', paddingHorizontal: 3, borderRadius: 3, marginTop: -2, borderWidth: 1, borderColor: '#CCC', zIndex: 10, alignItems: 'center' },
    priceText: { fontSize: 7, fontWeight: 'bold', color: '#FBC02D' },

    cashierArea: { position: 'absolute', bottom: '18%', alignItems: 'center', zIndex: 10 },
    bear: { alignItems: 'center', marginBottom: -20 },
    bearHead: { width: 60, height: 55, backgroundColor: '#795548', borderRadius: 25, zIndex: 2 },
    bearFace: { width: 40, height: 30, backgroundColor: '#D7CCC8', marginTop: 15, borderRadius: 15 },
    bearBody: { width: 70, height: 60, backgroundColor: '#795548', marginTop: -5, borderRadius: 20 },
    bearApron: { width: 40, height: 40, backgroundColor: '#4CAF50', marginTop: 10, alignSelf: 'center', borderRadius: 5 },
    checkoutCounter: { width: 300, height: 100, backgroundColor: '#8D6E63', borderWidth: 4, borderColor: '#5D4037', justifyContent: 'center', alignItems: 'center', zIndex: 20 },
    checkoutText: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },

    character: { position: 'absolute', bottom: '18%', width: 50, height: 100, zIndex: 50, alignItems: 'center' },
    kidHat: { position: 'absolute', top: 0, zIndex: 5, alignItems: 'center' },
    kidHatTop: { width: 32, height: 15, backgroundColor: '#FDD835', borderTopLeftRadius: 16, borderTopRightRadius: 16, borderWidth: 2, borderColor: '#FBC02D' },
    kidHatVisor: { position: 'absolute', bottom: 0, width: 40, height: 5, backgroundColor: '#FDD835', borderRadius: 2 },
    kidHead: { width: 34, height: 34, backgroundColor: '#FFCC80', borderRadius: 17, borderWidth: 2, borderColor: '#E65100', top: 10, zIndex: 3, alignItems: 'center' },
    kidEyeLeft: { position: 'absolute', top: 12, left: 8, width: 4, height: 6, backgroundColor: '#333', borderRadius: 2 },
    kidEyeRight: { position: 'absolute', top: 12, right: 8, width: 4, height: 6, backgroundColor: '#333', borderRadius: 2 },
    kidSmile: { position: 'absolute', bottom: 8, width: 10, height: 4, borderBottomWidth: 2, borderColor: '#333', borderRadius: 5 },
    kidBody: { width: 40, height: 45, backgroundColor: '#4CAF50', top: 8, borderRadius: 8, borderWidth: 2, borderColor: '#388E3C', zIndex: 2, alignItems: 'center' },
    kidOveralls: { position: 'absolute', bottom: 0, width: '100%', height: 25, backgroundColor: '#1976D2', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 },
    kidButtons: { flexDirection: 'row', marginTop: 25, gap: 15 },
    kidBackpack: { position: 'absolute', top: 45, width: 46, height: 35, backgroundColor: '#FF5722', borderRadius: 8, zIndex: 1, borderWidth: 2, borderColor: '#E64A19' },
    kidLegs: { flexDirection: 'row', top: 5, gap: 8 },
    kidLegLeft: { width: 12, height: 20, backgroundColor: '#1565C0', borderRadius: 4, borderWidth: 2, borderColor: '#0D47A1' },
    kidLegRight: { width: 12, height: 20, backgroundColor: '#1565C0', borderRadius: 4, borderWidth: 2, borderColor: '#0D47A1' }
});
