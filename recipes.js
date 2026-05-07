const RECIPES = [
  {
    id: 1,
    title: "Pollo Rostizado al Sazonador",
    category: "aves",
    time: "1h 15min",
    servings: "4–6 porciones",
    difficulty: "Fácil",
    ingredients: [
      "1 pollo entero (aprox. 1.5 kg)",
      "3 cdas de sazonador Don Eladio",
      "2 cdas de mayonesa (opcional)",
      "Aceite vegetal c/s",
      "Sal y pimienta al gusto",
      "Hierbas frescas para decorar"
    ],
    steps: [
      "Precalienta el horno a 150 °C.",
      "Lava y seca muy bien el pollo entero por dentro y por fuera.",
      "Mezcla 3 cucharadas de sazonador con un poco de aceite y frota toda la superficie del pollo.",
      "Opcional: combina 2 cucharadas de sazonador con 3 de mayonesa y unta el pollo para más jugosidad.",
      "Coloca en una charola y hornea durante 45 minutos.",
      "Gira el pollo a la mitad para que dore parejo por todos lados.",
      "Hornea 20–30 minutos más hasta que la piel esté dorada y crujiente.",
      "Deja reposar 10 minutos antes de cortar."
    ]
  },
  {
    id: 2,
    title: "Carne de Cerdo con Chile Morita",
    category: "carnes",
    time: "50min",
    servings: "4 porciones",
    difficulty: "Media",
    ingredients: [
      "750 g de carne de cerdo en cubos",
      "1 papa grande, en cubos",
      "4 tomatillos (tomates de fresadilla)",
      "2½ tazas de agua",
      "1 sobre de Salsa de Chile Morita",
      "Aceite o manteca de cerdo c/s",
      "Sal al gusto",
      "Frijoles para acompañar"
    ],
    steps: [
      "Calienta aceite o manteca en una cacerola a fuego medio-alto.",
      "Dora la carne de cerdo en tandas para no enfriar la olla; reserva.",
      "En la misma cacerola agrega las papas y dora ligeramente.",
      "Regresa la carne y mezcla todo.",
      "Licúa los tomatillos crudos con el agua hasta obtener un caldo.",
      "Vierte el licuado sobre la carne, agrega el sobre de salsa y mezcla bien.",
      "Deja hervir, reduce el fuego y cocina 20–25 min hasta que la carne y la papa estén suaves.",
      "Rectifica sazón y sirve acompañado de frijoles."
    ]
  },
  {
    id: 3,
    title: "Salsa Roja de Chile de Árbol",
    category: "salsas",
    time: "20min",
    servings: "1 taza aprox.",
    difficulty: "Fácil",
    ingredients: [
      "8 chiles de árbol secos",
      "3 jitomates medianos",
      "2 dientes de ajo",
      "¼ de cebolla blanca",
      "Sal al gusto",
      "Agua c/s"
    ],
    steps: [
      "Asa los jitomates, la cebolla y el ajo en comal a fuego directo hasta que estén bien chamuscados.",
      "Tuéstalo los chiles secos en el comal 30 segundos por lado con cuidado de no quemarlos.",
      "Hidrata los chiles en agua caliente 10 minutos.",
      "Licúa todos los ingredientes con un poco del agua de remojo.",
      "Fríe la salsa en un poco de aceite caliente 5 minutos para sazonarla.",
      "Ajusta sal y sirve caliente o fría."
    ]
  },
  {
    id: 4,
    title: "Costillas de Cerdo a la BBQ Ranch",
    category: "carnes",
    time: "2h 30min",
    servings: "4 porciones",
    difficulty: "Media",
    ingredients: [
      "1 kg de costillas de cerdo baby back",
      "4 cdas de salsa BBQ",
      "2 cdas de sazonador de ranch",
      "1 cda de azúcar morena",
      "1 cdita de paprika ahumada",
      "Sal y pimienta"
    ],
    steps: [
      "Mezcla el sazonador, azúcar, paprika, sal y pimienta para formar un dry rub.",
      "Cubre generosamente las costillas con el dry rub y deja marinar 1 hora.",
      "Precalienta el horno a 160 °C.",
      "Envuelve las costillas en papel aluminio y hornea 2 horas.",
      "Saca del horno, quita el aluminio y barniza con salsa BBQ.",
      "Sube el horno a 200 °C y hornea 15–20 min más hasta caramelizar.",
      "Deja reposar y sirve con ensalada de col."
    ]
  },
  {
    id: 5,
    title: "Pechugas al Ajillo con Hierbas",
    category: "aves",
    time: "30min",
    servings: "2 porciones",
    difficulty: "Fácil",
    ingredients: [
      "2 pechugas de pollo sin hueso",
      "5 dientes de ajo picados",
      "2 cdas de mantequilla",
      "1 cda de aceite de oliva",
      "Romero y tomillo frescos",
      "Jugo de ½ limón",
      "Sal y pimienta"
    ],
    steps: [
      "Aplana ligeramente las pechugas entre plástico para cocción uniforme.",
      "Sazona generosamente con sal y pimienta por ambos lados.",
      "Calienta mantequilla y aceite en sartén a fuego medio-alto.",
      "Cocina las pechugas 5–6 minutos por lado hasta dorar.",
      "Agrega el ajo, romero y tomillo; bañando el pollo constantemente 2 minutos.",
      "Exprime el limón, apaga el fuego y deja reposar 5 minutos.",
      "Sirve con el jugo del sartén por encima."
    ]
  },
  {
    id: 6,
    title: "Salsa Verde Cruda",
    category: "salsas",
    time: "10min",
    servings: "1½ tazas",
    difficulty: "Muy fácil",
    ingredients: [
      "500 g de tomatillos",
      "2–4 chiles serranos (al gusto)",
      "½ cebolla",
      "2 dientes de ajo",
      "Cilantro al gusto",
      "Sal"
    ],
    steps: [
      "Lava y retira la cáscara de los tomatillos.",
      "Corta todos los ingredientes en trozos grandes.",
      "Licúa en crudo o en molcajete hasta la textura deseada.",
      "Ajusta sal y sirve inmediatamente.",
      "Opcional: agrega un trozo de aguacate para suavizar el picor."
    ]
  },
  {
    id: 7,
    title: "Cochinita Pibil Tradicional",
    category: "carnes",
    time: "3h 30min",
    servings: "6-8 porciones",
    difficulty: "Media",
    ingredients: [
      "1 kg de pierna o lomo de cerdo",
      "100 g de pasta de achiote",
      "1 taza de jugo de naranja agria",
      "2 hojas de plátano (asadas)",
      "1 cdta de orégano seco",
      "½ cdta de comino",
      "Sal y pimienta al gusto"
    ],
    steps: [
      "Licúa el achiote con el jugo de naranja agria y las especias.",
      "Corta la carne en trozos grandes y marínale con la mezcla por al menos 2 horas.",
      "Forra una olla con las hojas de plátano, vierte la carne y baña con el resto del marinado.",
      "Cierra bien las hojas y tapa la olla; cocina a fuego bajo hasta que la carne se deshebre fácilmente.",
      "Sirve con cebolla morada curtida y chile habanero."
    ]
  },
  {
    id: 8,
    title: "Chiles en Nogada",
    category: "carnes",
    time: "1h 45min",
    servings: "6 porciones",
    difficulty: "Difícil",
    ingredients: [
      "6 chiles poblanos grandes (asados y limpios)",
      "500 g de carne molida mixta (res y cerdo)",
      "100 g de nuez de Castilla (limpia)",
      "200 g de crema ácida",
      "150 g de queso de cabra",
      "1 granada roja",
      "Frutas picadas (pera, manzana, durazno)",
      "Perejil picado"
    ],
    steps: [
      "Sofríe la carne con las frutas picadas para hacer el picadillo.",
      "Licúa la nuez con la crema y el queso para crear la nogada (debe quedar espesa).",
      "Rellena los chiles limpios con el picadillo caliente.",
      "Baña los chiles con la nogada a temperatura ambiente.",
      "Decora con los granos de granada y perejil picado para lucir los colores patrios."
    ]
  },
  {
    id: 9,
    title: "Pozole Rojo de Puerco",
    category: "carnes",
    time: "2h 30min",
    servings: "8 porciones",
    difficulty: "Media",
    ingredients: [
      "1 kg de maíz cacahuazintle (precocido)",
      "1 kg de carne de cerdo (espaldilla y cabeza)",
      "5 chiles guajillo (hidratados)",
      "2 chiles ancho (hidratados)",
      "3 dientes de ajo",
      "Orégano, lechuga, rabanitos y limón para acompañar"
    ],
    steps: [
      "Pon a cocer el maíz en abundante agua hasta que 'floree'.",
      "Agrega la carne de cerdo y cocina hasta que esté suave.",
      "Licúa los chiles con ajo y un poco de agua; cuela y vierte en la olla.",
      "Deja hervir 20 minutos más para que los sabores se integren.",
      "Sirve bien caliente con sus guarniciones clásicas y tostadas."
    ]
  },
  {
    id: 10,
    title: "Enchiladas Verdes",
    category: "aves",
    time: "40min",
    servings: "4 porciones",
    difficulty: "Fácil",
    ingredients: [
      "12 tortillas de maíz",
      "2 pechugas de pollo cocidas y deshebradas",
      "500 g de tomatillo cocido",
      "3 chiles serranos cocidos",
      "1 taza de crema ácida",
      "Queso fresco desmoronado",
      "Cebolla blanca en aros"
    ],
    steps: [
      "Licúa los tomatillos y chiles con cilantro y un poco de caldo de pollo; hierve la salsa.",
      "Pasa ligeramente las tortillas por aceite caliente sin que se endurezcan.",
      "Rellena las tortillas con el pollo y enróllalas.",
      "Baña generosamente con la salsa verde caliente.",
      "Decora con crema, queso y aros de cebolla."
    ]
  },
  {
    id: 11,
    title: "Aguachile de Camarón",
    category: "varios",
    time: "25min",
    servings: "2-4 porciones",
    difficulty: "Fácil",
    ingredients: [
      "500 g de camarón limpio (corte mariposa)",
      "1 taza de jugo de limón",
      "2 chiles serranos",
      "½ pepino en medias lunas",
      "½ cebolla morada en pluma",
      "Cilantro fresco",
      "Sal de grano"
    ],
    steps: [
      "Acomoda los camarones en un plato extendido y espolvorea sal.",
      "Licúa el jugo de limón con los chiles y el cilantro.",
      "Vierte la mezcla sobre los camarones para que se 'curtan' (5-10 min).",
      "Agrega la cebolla y el pepino.",
      "Sirve frío con tostadas y rebanadas de aguacate."
    ]
  },
  {
    id: 12,
    title: "Mole de Olla",
    category: "carnes",
    time: "1h 30min",
    servings: "6 porciones",
    difficulty: "Media",
    ingredients: [
      "750 g de chambarete de res con hueso",
      "2 elotes cortados en trozos",
      "3 xoconostles pelados y sin semillas",
      "2 calabacitas y 2 zanahorias",
      "3 chiles pasilla y 2 anchos (limpios y hervidos)",
      "Rama de epazote"
    ],
    steps: [
      "Cuece la carne con cebolla y ajo en olla express por 40 minutos.",
      "Licúa los chiles con un poco de caldo y agrégalos a la olla.",
      "Incorpora los elotes, zanahorias y xoconostle.",
      "Al final agrega las calabacitas y el epazote para que no se sobrecocinen.",
      "Sirve con limón y cebolla picada."
    ]
  }
];
