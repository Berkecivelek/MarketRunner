import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import type { ShelfDefinition } from '../data/products';
import { CartoonProduct } from './CartoonProduct';

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
                                 <View style={{marginRight: 5}}>
                                    <CartoonProduct id={item.productId} scale={0.4} />
                                 </View>
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
