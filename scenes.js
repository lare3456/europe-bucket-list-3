/* ---- illustration kit: every postcard is drawn from the same set of parts ---- */
const A={sky:"#C3DCE4",sky2:"#9EC4D4",pale:"#E4EEF0",warm:"#F0D5A8",dusk:"#E5A66F",night:"#2C3F5E",
sea:"#77A7BF",sea2:"#4F7F9C",sun:"#E0A32C",gold:"#D8A22B",red:"#BE4739",roof:"#AE4E39",
stone:"#F2E7CD",stone2:"#DCCAA6",stone3:"#BEA87E",green:"#4E7A55",green2:"#33604A",olive:"#94A96C",
brown:"#8A5A38",brown2:"#6B4326",ink:"#22314A",white:"#FBF6EA",snow:"#F3EDDD",plum:"#7A5068"};

const K={
 sky:(a=A.sky,b=A.pale)=>`<rect width="400" height="260" fill="${a}"/><ellipse cx="200" cy="228" rx="320" ry="156" fill="${b}" opacity=".5"/>`,
 sun:(x=326,y=50,r=25,c=A.sun)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`,
 halo:(x=326,y=50,r=36,c=A.sun)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="4 7" opacity=".7"/>`,
 band:(y,h,c)=>`<rect y="${y}" width="400" height="${h}" fill="${c}"/>`,
 sea:(y,c=A.sea)=>`<rect y="${y}" width="400" height="${260-y}" fill="${c}"/>`,
 waves:(y,c=A.white,o=.45)=>{let s="";for(let i=0;i<5;i++){const yy=y+i*13,off=i%2?26:0;s+=`<path d="M${-20+off} ${yy}q14-7 28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0t28 0" fill="none" stroke="${c}" stroke-width="2" opacity="${o}"/>`}return s},
 ground:(y,c=A.green)=>`<rect y="${y}" width="400" height="${260-y}" fill="${c}"/>`,
 peak:(x,base,w,h,c="#95A9B7",cap=A.snow)=>`<path d="M${x-w} ${base}L${x} ${base-h}L${x+w} ${base}Z" fill="${c}"/>`+(cap?`<path d="M${x-w*0.34} ${base-h*0.66}L${x} ${base-h}L${x+w*0.34} ${base-h*0.66}q-${w*0.14} ${h*0.1} -${w*0.2} 0q-${w*0.12} -${h*0.08} -${w*0.2} 0Z" fill="${cap}"/>`:""),
 hills:(base,c,n=4)=>{let s="";for(let i=0;i<n;i++){const x=i*(400/(n-1));s+=`<ellipse cx="${x+20}" cy="${base+16}" rx="${86-i*6}" ry="${38+(i%2)*10}" fill="${c}"/>`}return s},
 pine:(x,b,s=1,c=A.green2)=>`<g transform="translate(${x} ${b}) scale(${s})"><rect x="-3" y="-12" width="6" height="14" fill="${A.brown2}"/><path d="M0-56l-17 22h34zM0-40l-21 26h42zM0-24l-25 26h50z" fill="${c}"/></g>`,
 tree:(x,b,s=1,c=A.green)=>`<g transform="translate(${x} ${b}) scale(${s})"><rect x="-3.5" y="-18" width="7" height="20" fill="${A.brown}"/><circle cx="0" cy="-30" r="20" fill="${c}"/><circle cx="-14" cy="-20" r="13" fill="${c}"/><circle cx="14" cy="-21" r="13" fill="${c}"/></g>`,
 cloud:(x,y,s=1,c=A.white,o=.85)=>`<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}"><ellipse cx="0" cy="0" rx="26" ry="13" fill="${c}"/><circle cx="-12" cy="-6" r="12" fill="${c}"/><circle cx="8" cy="-9" r="15" fill="${c}"/></g>`,
 birds:(x,y,s=1,c=A.ink)=>`<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="2" opacity=".55" stroke-linecap="round"><path d="M0 0q6-6 12 0"/><path d="M12 0q6-6 12 0"/><path d="M6 14q5-5 10 0"/><path d="M16 14q5-5 10 0"/></g>`,
 win:(x,y,w,h,c=A.ink,o=.8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" opacity="${o}"/>`,
 wins:(x,y,cols,rows,w=7,h=10,gx=13,gy=16,c=A.ink)=>{let s="";for(let r=0;r<rows;r++)for(let i=0;i<cols;i++)s+=`<rect x="${x+i*gx}" y="${y+r*gy}" width="${w}" height="${h}" fill="${c}" opacity=".75"/>`;return s},
 arch:(x,y,w,h,c=A.ink)=>`<path d="M${x} ${y+h}v-${h-w/2}a${w/2} ${w/2} 0 0 1 ${w} 0v${h-w/2}z" fill="${c}"/>`,
 dome:(cx,cy,r,c,ln=A.ink)=>`<path d="M${cx-r} ${cy}a${r} ${r*1.08} 0 0 1 ${r*2} 0z" fill="${c}"/><path d="M${cx-r-3} ${cy}h${r*2+6}" stroke="${ln}" stroke-width="3"/>`,
 onion:(cx,cy,r,c)=>`<path d="M${cx} ${cy-r*2.2}c${r*1.5} ${r*0.9} ${r} ${r*2.2} 0 ${r*2.2}s-${r*1.5}-${r*1.3} 0-${r*2.2}z" fill="${c}"/>`,
 flag:(x,y,h=18,c=A.red)=>`<path d="M${x} ${y}v${-h}" stroke="${A.ink}" stroke-width="2"/><path d="M${x} ${y-h}l14 5-14 5z" fill="${c}"/>`,
 stars:(n=14)=>{let s="";for(let i=0;i<n;i++){const x=(i*73)%390+6,y=(i*41)%92+8;s+=`<circle cx="${x}" cy="${y}" r="${i%3?1.2:1.9}" fill="${A.white}" opacity=".85"/>`}return s},
 aurora:(c1="#7FD1A6",c2="#8FA8DE")=>`<path d="M-10 70q90-52 180-14t240-20" fill="none" stroke="${c1}" stroke-width="16" opacity=".42" stroke-linecap="round"/><path d="M-10 96q100-46 190-8t230-26" fill="none" stroke="${c2}" stroke-width="11" opacity=".38" stroke-linecap="round"/><path d="M-10 48q80-40 170-8t240-16" fill="none" stroke="${c1}" stroke-width="7" opacity=".3" stroke-linecap="round"/>`,
 road:(y,c=A.stone2)=>`<path d="M160 ${y}L120 260h180l-70-${260-y}z" fill="${c}"/>`
};

/* ---- one scene per country ---- */
const SCENES={
albania:()=>K.sky(A.sky,A.warm)+K.sun(58,50,22)+K.sea(188,"#2F86A8")+K.waves(198,A.white,.35)+
 `<path d="M-10 188V96q54-34 116-16t128 52 176 26v30z" fill="#4E7A55"/>`+
 `<path d="M-10 188V126q54-26 116-8t128 46 176 24v0z" fill="#6B8F5E"/>`+
 [[70,124],[112,140],[156,152],[200,162],[244,168],[288,172],[330,176],[134,172],[178,182],[222,184]].map(([x,y])=>
 `<g transform="translate(${x} ${y})"><rect x="-15" y="-18" width="30" height="20" fill="${A.white}"/><path d="M-19-18l19-12 19 12z" fill="${A.roof}"/><rect x="-6" y="-13" width="8" height="10" fill="${A.ink}" opacity=".55"/></g>`).join("")+
 `<g transform="translate(52 96)"><rect x="-28" y="-30" width="56" height="30" fill="${A.stone2}"/>`+
 [0,1,2,3].map(i=>`<rect x="${-28+i*16}" y="-38" width="10" height="10" fill="${A.stone2}"/>`).join("")+
 `<rect x="-6" y="-20" width="12" height="20" fill="${A.ink}" opacity=".5"/></g>`+
 `<path d="M-10 186q120 10 210 0t210 2v6H-10z" fill="#E8D7A8"/>`+K.birds(320,52,.9),

andorra:()=>K.sky(A.sky2,A.pale)+K.sun(64,48,20,A.white)+
 K.peak(90,200,96,120)+K.peak(210,200,116,146)+K.peak(330,200,90,104)+
 `<path d="M0 200h400v60H0z" fill="${A.snow}"/><path d="M0 214q60 14 130 4t140-8 130 10v50H0z" fill="#E7E2D0"/>`+
 `<path d="M30 92L370 66" stroke="${A.ink}" stroke-width="2"/>`+
 [[120,101],[210,94],[300,87]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M0-9v9" stroke="${A.ink}" stroke-width="2"/><rect x="-9" y="0" width="18" height="13" rx="2" fill="${A.red}"/></g>`).join("")+
 K.pine(48,238,.8)+K.pine(76,250,1)+K.pine(352,246,.9)+K.pine(324,236,.7),

austria:()=>K.sky(A.sky,A.pale)+K.cloud(70,48,.9)+
 K.peak(60,150,90,80,"#9FB2C0")+K.peak(190,150,110,96,"#8DA3B4")+K.peak(330,150,92,74,"#9FB2C0")+
 K.ground(150,"#7C9E62")+K.band(150,10,A.green)+
 `<rect x="60" y="150" width="280" height="70" fill="${A.gold}"/><path d="M52 150h296l-12-12H64z" fill="${A.stone}"/>`+
 `<path d="M160 138h80l-40-28z" fill="${A.stone}"/><rect x="176" y="150" width="48" height="70" fill="#E8B84B"/>`+
 K.wins(72,164,5,2,10,16,20,30,A.ink)+K.wins(258,164,5,2,10,16,20,30,A.ink)+
 `<rect x="192" y="176" width="16" height="44" fill="${A.ink}" opacity=".7"/>`+
 `<rect y="220" width="400" height="40" fill="#6F9457"/>`+
 `<path d="M20 250q30-22 60 0zM320 250q30-22 60 0z" fill="${A.green2}"/><circle cx="200" cy="240" r="14" fill="${A.green2}"/>`,

belarus:()=>K.sky("#D6E4DE","#EFF0E2")+K.ground(200,"#7E9A5E")+
 `<rect y="200" width="400" height="10" fill="#5F7F48"/>`+
 [[24,120],[62,146],[106,128],[152,152],[198,126],[250,148],[296,130],[338,150],[378,132]].map(([x,h],i)=>
 `<g transform="translate(${x} 200)"><ellipse cx="0" cy="${-h-14}" rx="28" ry="20" fill="${["#5F7F48","#6E8F4F","#4E7A55"][i%3]}"/>`+
 `<rect x="${-5-i%2}" y="${-h}" width="${10+i%2}" height="${h}" fill="${A.white}"/>`+
 [0,1,2,3].map(j=>`<rect x="${j%2?-5:-1}" y="${-h+20+j*26}" width="5" height="4" fill="${A.ink}" opacity=".75"/>`).join("")+`</g>`).join("")+
 `<path d="M0 182q80 12 200 6t200-6v16H0z" fill="${A.white}" opacity=".22"/>`+
 `<g transform="translate(206 234)"><path d="M-46-16q-6-22 8-26t30-2 34 4 20 12-4 24-22 10h-52z" fill="#5C4633"/>`+
 `<path d="M-46-30q-16-6-20 2t10 12 14-2z" fill="#4A382A"/><path d="M-60-34q-8-12 2-14 8 4 6 14z" fill="${A.stone3}"/>`+
 `<circle cx="-52" cy="-24" r="2.4" fill="#F3E6CE"/>`+
 `<path d="M-30 8v14M-6 8v14M20 6v16M40 4v18" stroke="#4A382A" stroke-width="7" stroke-linecap="round"/>`+
 `<path d="M42-20q10 4 12 14" fill="none" stroke="#4A382A" stroke-width="4"/></g>`,

belgium:()=>K.sky("#B9D2DE","#E6EEF0")+K.ground(210,A.stone2)+
 `<rect x="150" y="40" width="46" height="170" fill="${A.stone}"/><path d="M146 40h54l-27-30z" fill="${A.stone3}"/><path d="M173 10V0" stroke="${A.ink}" stroke-width="2"/><circle cx="173" cy="66" r="11" fill="${A.gold}"/>`+
 [[24,"#C9A24A",96],[68,A.stone,110],[112,"#B8894F",88],[204,A.stone,104],[248,"#C9A24A",92],[292,A.stone,116],[336,"#B8894F",96]].map(([x,c,h])=>
 `<g transform="translate(${x} 210)"><rect y="${-h}" width="40" height="${h}" fill="${c}"/>`+
 `<path d="M0 ${-h}h8v-9h8v-9h8v-9h8v-9h8v36z" fill="${c}"/>`+
 `<path d="M0 ${-h}h40" stroke="${A.ink}" stroke-width="1.5" opacity=".5"/>`+
 K.wins(7,-h+14,2,3,10,14,17,26,A.ink)+`</g>`).join("")+
 `<rect y="210" width="400" height="50" fill="#C9B994"/>`+
 [0,1,2,3,4,5,6,7].map(i=>`<path d="M${i*54-10} 210l-14 50" stroke="${A.stone3}" stroke-width="2" opacity=".8"/>`).join("")+
 `<path d="M0 232h400" stroke="${A.stone3}" stroke-width="2" opacity=".8"/>`,

bosnia:()=>K.sky("#CFE0E2",A.pale)+K.hills(120,"#8FA37C")+K.hills(150,"#6F8A64",3)+
 K.sea(196,"#5D93A8")+K.waves(206,A.white,.35)+
 `<path d="M60 196q140-120 280 0h-30q-120-92-220 0z" fill="${A.stone}"/>`+
 `<path d="M60 196q140-120 280 0" fill="none" stroke="${A.ink}" stroke-width="2" opacity=".35"/>`+
 `<rect x="48" y="150" width="26" height="48" fill="${A.stone2}"/><rect x="326" y="150" width="26" height="48" fill="${A.stone2}"/>`+
 `<g transform="translate(112 90)"><rect x="-7" y="0" width="14" height="70" fill="${A.stone}"/><path d="M-7 0l7-26 7 26z" fill="${A.stone2}"/><path d="M0-26v-10" stroke="${A.ink}" stroke-width="2"/><rect x="-7" y="26" width="14" height="4" fill="${A.ink}" opacity=".5"/></g>`+
 [[150,150],[190,146],[232,150],[272,144]].map(([x,y])=>`<g transform="translate(${x} ${y})"><rect x="-14" y="-14" width="28" height="20" fill="${A.white}"/><path d="M-17-14l17-12 17 12z" fill="${A.roof}"/></g>`).join(""),

bulgaria:()=>K.sky(A.sky,A.warm)+K.peak(70,140,86,86,"#8CA08E")+K.peak(300,140,110,102,"#7B9184")+
 K.ground(140,"#6E8E5E")+
 `<rect x="40" y="150" width="320" height="76" fill="${A.stone}"/>`+
 [0,1,2,3,4,5,6,7].map(i=>`<path d="M${52+i*39} 226v-38a19 19 0 0 1 38 0v38z" fill="${i%2?A.red:A.stone2}" opacity=".85"/>`).join("")+
 `<rect x="40" y="142" width="320" height="10" fill="${A.brown}"/>`+
 `<g transform="translate(200 150)"><rect x="-34" y="-58" width="68" height="58" fill="${A.stone}"/>`+
 K.dome(0,-58,26,"#5E7C8E")+`<path d="M0-96v-14" stroke="${A.gold}" stroke-width="3"/><circle cx="0" cy="-112" r="4" fill="${A.gold}"/>`+
 `<rect x="-10" y="-40" width="20" height="40" fill="${A.ink}" opacity=".6"/></g>`+
 `<rect y="226" width="400" height="34" fill="#5C7A4D"/>`+
 [40,110,290,360].map(x=>`<g transform="translate(${x} 244)"><circle r="7" fill="${A.red}"/><circle r="3" fill="#8E3730"/></g>`).join(""),

croatia:()=>K.sky(A.sky,A.warm)+K.sun(58,46,20)+K.sea(188,"#3E86A8")+K.waves(198,A.white,.4)+
 `<path d="M30 188V120h340v68z" fill="${A.stone2}"/><path d="M30 120h340v-8H30z" fill="${A.stone3}"/>`+
 [[60,112],[120,104],[180,110],[240,100],[300,108],[350,116]].map(([x,y])=>
 `<g transform="translate(${x} ${y})"><rect x="-22" y="-34" width="44" height="34" fill="${A.stone}"/><path d="M-26-34h52l-26-16z" fill="${A.roof}"/>`+K.wins(-14,-26,2,1,9,12,20,0,A.ink)+`</g>`).join("")+
 `<g transform="translate(206 60)"><rect x="-16" y="0" width="32" height="56" fill="${A.stone}"/><path d="M-20 0h40l-20-24z" fill="${A.roof}"/><circle cx="0" cy="18" r="8" fill="${A.ink}" opacity=".6"/></g>`+
 `<rect x="30" y="152" width="340" height="36" fill="${A.stone3}" opacity=".5"/>`+
 [0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${34+i*36}" y="112" width="14" height="10" fill="${A.stone3}"/>`).join("")+
 `<g transform="translate(316 226)"><path d="M-34 0h68l-10 14h-48z" fill="${A.brown}"/><path d="M-34 0h68" stroke="${A.brown2}" stroke-width="2"/><path d="M0 0v-40" stroke="${A.ink}" stroke-width="2"/><path d="M3-38l22 32H3z" fill="${A.white}"/><path d="M-3-34l-18 28h18z" fill="${A.stone}"/></g>`,

cyprus:()=>K.sky(A.warm,"#F7E7C6")+K.sun(316,56,28,"#EFB84A")+K.halo(316,56,42,"#EFB84A")+
 `<path d="M0 148q60-30 110-8t120 6 170-22v34H0z" fill="#B7B39A" opacity=".8"/>`+
 K.sea(152,"#2F92AC")+K.waves(164,A.white,.4)+
 `<path d="M96 210l34-92 20 30 18-46 42 108z" fill="#8E8A72"/>`+
 `<path d="M130 118l14 22 8-14z" fill="#A8A48C"/><path d="M186 100l16 40 10-18z" fill="#A8A48C"/>`+
 `<path d="M250 206l20-40 24 40z" fill="#9A9680"/>`+
 `<ellipse cx="160" cy="210" rx="72" ry="10" fill="${A.white}" opacity=".45"/>`+
 `<path d="M0 214q100-18 200 0t200-8v54H0z" fill="#EBD9AE"/>`+
 `<path d="M0 232q110 12 200-2t200 4" fill="none" stroke="#D9C08E" stroke-width="3"/>`+
 [[42,238],[80,248],[350,240]].map(([x,y])=>`<g transform="translate(${x} ${y})"><rect x="-3" y="-46" width="6" height="46" fill="${A.brown}"/><path d="M0-46q-28-10-32-28 22 2 32 16zM0-46q28-10 32-28-22 2-32 16zM0-50q-8-24 4-34 10 16 6 34z" fill="${A.green}"/></g>`).join("")+
 K.birds(66,44,1)+K.birds(240,30,.8),

czechia:()=>K.sky("#BCCEDC","#E4EBEE")+
 `<g opacity=".55">`+[[40,150,18],[74,132,14],[330,140,16],[366,158,12]].map(([x,y,w])=>
 `<rect x="${x-w/2}" y="${-y+170}" width="${w}" height="${y-30}" fill="${A.stone2}"/><path d="M${x-w/2-4} ${170-y}h${w+8}L${x} ${140-y}z" fill="#5E5A70"/>`).join("")+`</g>`+
 K.sea(196,"#5E7E94")+K.waves(206,A.white,.3)+
 `<path d="M0 174h400v22H0z" fill="${A.stone}"/>`+
 [0,1,2,3,4].map(i=>`<path d="M${10+i*82} 196v-14a30 30 0 0 1 60 0v14z" fill="#5E7E94"/>`).join("")+
 [0,1,2,3,4].map(i=>`<path d="M${10+i*82} 196v-14a30 30 0 0 1 60 0v14" fill="none" stroke="${A.stone3}" stroke-width="2.5"/>`).join("")+
 `<path d="M0 168h400v8H0z" fill="${A.stone2}"/>`+
 [110,290].map(x=>`<g transform="translate(${x} 168)"><rect x="-22" y="-84" width="44" height="84" fill="${A.stone}"/>`+
 `<path d="M-28-84h56L0-124z" fill="#4E4A63"/><path d="M-28-64h56" stroke="${A.stone3}" stroke-width="2.5"/>`+
 [-18,0,18].map(o=>`<path d="M${o-6}-92h12l-6-14z" fill="#4E4A63"/>`).join("")+
 K.arch(-11,-40,22,40,A.ink)+K.wins(-14,-58,2,1,8,12,20,0,A.ink)+
 `<path d="M0-124v-10" stroke="${A.gold}" stroke-width="2"/><circle cx="0" cy="-138" r="4" fill="${A.gold}"/></g>`).join("")+
 [60,200,340].map(x=>`<g transform="translate(${x} 168)"><rect x="-3" y="-26" width="6" height="26" fill="${A.ink}" opacity=".7"/><circle cx="0" cy="-30" r="6" fill="${A.gold}"/></g>`).join(""),

denmark:()=>K.sky("#BBD6E2","#E8F0F2")+K.cloud(320,44,.8)+
 `<rect y="196" width="400" height="64" fill="#4D7E97"/>`+K.waves(206,A.white,.3)+
 [["#C7523F",0,108],["#E0A32C",46,124],["#6E8C5A",92,96],["#DCCAA6",138,118],["#4E7A9C",184,104],["#C7523F",230,128],["#E0C05A",276,98],["#7A5068",322,116],["#DCCAA6",368,106]].map(([c,x,h])=>
 `<g transform="translate(${x} 196)"><rect y="${-h}" width="42" height="${h}" fill="${c}"/><path d="M-3 ${-h}h48l-24-16z" fill="${A.ink}" opacity=".65"/>`+
 K.wins(7,-h+16,2,Math.floor(h/34),9,13,18,26,A.ink)+`<rect x="15" y="-24" width="12" height="24" fill="${A.ink}" opacity=".55"/></g>`).join("")+
 `<g transform="translate(120 224)"><path d="M-46 0h96l-12 20h-72z" fill="${A.white}"/><path d="M0 0v-70" stroke="${A.brown}" stroke-width="4"/><path d="M4-66l34 46H4z" fill="${A.stone}"/><path d="M-4-60l-28 40h28z" fill="${A.stone2}"/></g>`,

estonia:()=>K.sky("#C6D8E4","#EAF0F2")+K.cloud(80,46,.8)+K.ground(206,"#6E8C5A")+
 `<rect x="20" y="150" width="360" height="56" fill="${A.stone}"/>`+
 [40,140,240,340].map((x,i)=>`<g transform="translate(${x} 206)"><rect x="-22" y="-116" width="44" height="116" fill="${A.stone}"/><path d="M-30-116L0-172l30 56z" fill="${A.roof}"/>`+
 K.wins(-10,-96,1,3,10,14,0,28,A.ink)+`<path d="M0-172v-12" stroke="${A.ink}" stroke-width="2"/><path d="M0-184l12 5-12 5z" fill="${A.gold}"/></g>`).join("")+
 `<g transform="translate(200 150)"><rect x="-14" y="-96" width="28" height="96" fill="${A.stone2}"/><path d="M-18-96L0-152l18 56z" fill="#4E6B7A"/><path d="M0-152v-14" stroke="${A.ink}" stroke-width="2"/><circle cx="0" cy="-168" r="4" fill="${A.gold}"/></g>`+
 `<rect y="206" width="400" height="54" fill="#5F7D4D"/>`+K.tree(60,254,.7)+K.tree(348,258,.8),

finland:()=>`<rect width="400" height="260" fill="#1F3050"/>`+K.stars(18)+K.aurora()+
 `<rect y="186" width="400" height="74" fill="#13233C"/>`+
 `<path d="M0 186q60 8 120 2t160 4 120-6v10H0z" fill="#0F1D33"/>`+
 [20,52,86,320,356,386].map((x,i)=>K.pine(x,190,.9+(i%3)*.12,"#132B28")).join("")+
 `<g transform="translate(200 186)"><rect x="-46" y="-52" width="92" height="52" fill="#3E3128"/><path d="M-56-52h112L0-92z" fill="#C7523F"/><rect x="-14" y="-32" width="28" height="32" fill="${A.gold}" opacity=".9"/><rect x="-40" y="-40" width="18" height="16" fill="${A.gold}" opacity=".7"/><path d="M28-92q6-18 14 0" fill="none" stroke="#9FB0C4" stroke-width="3" opacity=".6"/></g>`+
 K.waves(196,"#3D6E8A",.35)+`<circle cx="60" cy="52" r="16" fill="#F2EAD2" opacity=".9"/>`,

france:()=>K.sky("#BBD3E0",A.warm)+K.sun(66,52,24,"#EFC15C")+K.cloud(300,44,.8)+K.ground(212,"#8FA86B")+
 `<g transform="translate(200 212)" fill="${A.ink}">`+
 `<path d="M-62 0l24-96h76l24 96h-22l-18-80h-44l-18 80z" opacity=".92"/>`+
 `<path d="M-40-96l10-52h60l10 52h-18l-7-38h-30l-7 38z" opacity=".92"/>`+
 `<path d="M-20-148l6-42h28l6 42h-12l-4-30h-8l-4 30z" opacity=".92"/>`+
 `<path d="M-4-190v-22h8v22z" opacity=".92"/>`+
 `<rect x="-46" y="-104" width="92" height="9"/><rect x="-26" y="-156" width="52" height="8"/>`+
 `<path d="M-62 0q62-46 124 0" fill="none" stroke="${A.ink}" stroke-width="7"/></g>`+
 `<rect y="212" width="400" height="48" fill="#7D9760"/>`+K.tree(44,244,.8)+K.tree(356,250,.9)+K.birds(300,86,.9),

germany:()=>K.sky("#BFD6E4","#E9F0F0")+K.cloud(60,40,.8)+
 K.peak(340,150,80,70,"#9BAEBB")+
 `<path d="M0 260V176q110-58 200-58t200 58v84z" fill="#3F6446"/>`+
 `<path d="M60 176q90-46 160-46t140 46z" fill="#4E7A55" opacity=".7"/>`+
 `<g transform="translate(200 132)">`+
 `<rect x="-58" y="-46" width="116" height="46" fill="${A.stone}"/>`+
 `<rect x="-76" y="-30" width="30" height="30" fill="${A.stone}"/><path d="M-78-30h34l-17-26z" fill="#4E6B7A"/>`+
 `<rect x="46" y="-40" width="34" height="40" fill="${A.stone}"/><path d="M44-40h38l-19-30z" fill="#4E6B7A"/>`+
 `<rect x="-18" y="-96" width="36" height="52" fill="${A.stone}"/><path d="M-22-96h44L0-146z" fill="#4E6B7A"/>`+
 `<rect x="24" y="-78" width="20" height="34" fill="${A.stone}"/><path d="M22-78h24L34-110z" fill="#4E6B7A"/>`+
 K.wins(-50,-34,4,1,8,14,26,0,A.ink)+K.wins(-10,-80,2,1,7,12,16,0,A.ink)+
 `<path d="M0-146v-12" stroke="${A.ink}" stroke-width="2"/><path d="M0-158l12 5-12 5z" fill="${A.red}"/></g>`+
 K.pine(30,250,1)+K.pine(66,258,.8)+K.pine(340,254,.9)+K.pine(376,246,.7),

greece:()=>K.sky("#9FC9DE","#E4F0F2")+K.sun(330,48,24,"#F0D07A")+K.sea(200,"#2F86A8")+K.waves(210,A.white,.4)+
 `<path d="M0 200V150q60-34 120-24t140-2 140 26v50z" fill="${A.stone3}" opacity=".5"/>`+
 [[46,196,26],[100,186,30],[158,196,24],[300,190,28],[352,198,22]].map(([x,y,w])=>
 `<g transform="translate(${x} ${y})"><rect x="${-w}" y="${-w*0.9}" width="${w*2}" height="${w*0.9}" fill="${A.white}"/><rect x="${-w}" y="${-w*0.9-4}" width="${w*2}" height="5" fill="#EDE4D2"/>`+
 K.win(-w*0.5,-w*0.6,w*0.4,w*0.5,"#2F6E9E",.9)+`</g>`).join("")+
 [[222,180,26],[264,192,20]].map(([x,y,r])=>
 `<g transform="translate(${x} ${y})"><rect x="${-r}" y="${-r*0.8}" width="${r*2}" height="${r*0.8}" fill="${A.white}"/>`+
 `<path d="M${-r*0.8} ${-r*0.8}a${r*0.8} ${r*0.72} 0 0 1 ${r*1.6} 0z" fill="#2F6E9E"/><path d="M0 ${-r*1.6}v-8" stroke="${A.ink}" stroke-width="2"/><path d="M-6 ${-r*1.6-8}h12" stroke="${A.ink}" stroke-width="2"/></g>`).join("")+
 `<path d="M150 200h130l-6-26h-118z" fill="${A.white}"/>`+K.birds(80,54,1),

hungary:()=>K.sky("#C2D8E2","#ECF1F0")+K.sea(206,"#4F7F9C")+K.waves(216,A.white,.3)+
 `<g transform="translate(200 206)" fill="${A.stone}">`+
 `<rect x="-170" y="-58" width="340" height="58"/>`+
 `<rect x="-30" y="-110" width="60" height="52"/>`+K.dome(0,-110,30,"#8A6E8E",A.stone3)+
 `<path d="M0-166v-16" stroke="${A.ink}" stroke-width="2"/><circle cx="0" cy="-184" r="5" fill="${A.red}"/>`+
 [-150,-110,110,150].map(x=>`<rect x="${x-9}" y="-96" width="18" height="38"/><path d="M${x-13}-96h26L${x}-132z" fill="#8A6E8E"/>`).join("")+
 [-70,-40,40,70].map(x=>`<rect x="${x-7}" y="-80" width="14" height="22"/><path d="M${x-10}-80h20L${x}-106z" fill="#8A6E8E"/>`).join("")+
 `</g>`+
 [0,1,2,3,4,5,6,7,8,9,10,11].map(i=>K.arch(38+i*27,186,16,20,A.ink)).join("")+
 `<path d="M30 206h340v6H30z" fill="${A.stone3}"/>`+
 `<path d="M60 232h60l-8 14H68z" fill="${A.roof}"/>`,

iceland:()=>K.sky("#9FB6C8","#D7E3E6")+
 K.peak(80,150,90,76,"#7E8C99")+K.peak(300,150,110,92,"#6E7D8B")+
 `<path d="M0 150h400v110H0z" fill="#5C6E60"/>`+
 `<path d="M120 150h160v40H120z" fill="#3E5B6E"/>`+
 `<path d="M140 150h120v96q-60 22-120 0z" fill="#9FC6D6"/>`+
 [0,1,2,3,4].map(i=>`<path d="M${152+i*24} 154v88" stroke="${A.white}" stroke-width="5" opacity=".55"/>`).join("")+
 `<ellipse cx="200" cy="246" rx="96" ry="18" fill="#BFD9E2"/><ellipse cx="200" cy="244" rx="60" ry="10" fill="${A.white}" opacity=".8"/>`+
 `<path d="M0 260v-40q60-16 120-4t130 2 150-16v58z" fill="#4A5B50"/>`+
 `<path d="M22 196q10-16 20 0M348 188q10-16 20 0" stroke="${A.white}" stroke-width="3" fill="none" opacity=".5"/>`+
 K.birds(58,46,1,A.ink),

ireland:()=>K.sky("#C2D6DE","#EAF0EE")+K.cloud(300,34,.9)+K.cloud(160,24,.55)+
 K.sea(188,"#3E7E92")+K.waves(198,A.white,.35)+
 `<path d="M262 188v-52l138-14v66z" fill="#8A8270"/>`+
 `<path d="M262 136l138-14v15l-138 14z" fill="#7FA05E"/>`+
 `<path d="M148 188v-74l116 18v56z" fill="#7A6E58"/>`+
 `<path d="M148 114l116 18v16l-116-18z" fill="#5E8B4E"/>`+
 [0,1,2].map(i=>`<path d="M150 ${152+i*13}l112 4" stroke="#5F5545" stroke-width="2" opacity=".35"/>`).join("")+
 `<path d="M0 188V80l150 26v82z" fill="#6E6353"/>`+
 [0,1,2,3,4,5].map(i=>`<path d="M0 ${112+i*14}l150 22" stroke="#584E41" stroke-width="2" opacity=".4"/>`).join("")+
 [26,62,100,134].map(x=>`<path d="M${x} ${84+x*0.17}v${100-x*0.14}" stroke="#584E41" stroke-width="1.5" opacity=".3"/>`).join("")+
 `<path d="M0 80l150 26v17L0 97z" fill="#5E8B4E"/>`+
 `<path d="M0 74l150 26v8L0 82z" fill="#7FA05E"/>`+
 `<path d="M196 188v-34l10-8 8 8v34z" fill="#7A6E58"/>`+
 `<ellipse cx="140" cy="192" rx="48" ry="8" fill="${A.white}" opacity=".5"/>`+
 `<ellipse cx="256" cy="190" rx="30" ry="6" fill="${A.white}" opacity=".45"/>`+
 `<path d="M60 216q18-10 36 0t36 0M230 232q16-9 32 0t32 0" fill="none" stroke="${A.white}" stroke-width="3" opacity=".5"/>`+
 K.birds(210,52,1.1)+K.birds(300,96,.8),

italy:()=>K.sky("#CBD9DC",A.warm)+K.sun(56,46,22,"#EFC15C")+K.ground(210,"#B6A176")+
 `<g transform="translate(200 210)">`+
 `<path d="M-124 0v-98a124 58 0 0 1 248 0V0z" fill="${A.stone}"/>`+
 [0,1,2,3,4,5,6,7].map(i=>{const x=-116+i*30,d=Math.abs(i-3.5)*3;return K.arch(x,-96+d,22,30,"#B9A77F")}).join("")+
 `<path d="M-124-62q124-34 248 0v6q-124-34-248 0z" fill="${A.stone2}"/>`+
 [0,1,2,3,4,5,6,7].map(i=>{const x=-116+i*30,d=Math.abs(i-3.5)*2;return K.arch(x,-54+d,22,28,"#B9A77F")}).join("")+
 `<path d="M-124-22q124-28 248 0v5q-124-28-248 0z" fill="${A.stone2}"/>`+
 [0,1,2,3,4,5,6,7,8].map(i=>`<rect x="${-118+i*29}" y="${-16+Math.abs(i-4)*2}" width="14" height="16" fill="#B9A77F"/>`).join("")+
 `<path d="M62-112q62 14 62 30v82H62z" fill="${A.stone2}"/>`+
 `<path d="M62-112q30 6 46 16-22 10-46 8z" fill="${A.stone3}"/>`+
 `<path d="M-124-98q0-20 18-32v130h-18z" fill="${A.stone2}" opacity=".7"/></g>`+
 `<rect y="210" width="400" height="50" fill="#A8925F"/>`+
 `<path d="M0 226q120 10 200 0t200 6" fill="none" stroke="#96814F" stroke-width="3"/>`+
 [40,88].map(x=>`<g transform="translate(${x} 244)"><rect x="-3" y="-30" width="6" height="30" fill="${A.brown}"/><path d="M0-32q-26-6-26-26 20 0 26 12zM0-36q24-8 24-28-20 2-24 16z" fill="#3E6446"/></g>`).join(""),

kosovo:()=>K.sky("#C8DAE0",A.pale)+K.peak(66,140,100,86)+K.peak(300,140,116,98)+
 `<path d="M0 260V140q80-22 200-14t200 22v112z" fill="#6E8B5C"/>`+
 `<path d="M240 156q50-14 90-4v40q-46-12-90-2z" fill="#5C7A4D"/>`+
 `<g transform="translate(300 156)"><rect x="-34" y="-30" width="68" height="30" fill="${A.stone2}"/>`+
 [0,1,2,3].map(i=>`<rect x="${-34+i*19}" y="-38" width="11" height="10" fill="${A.stone2}"/>`).join("")+
 `<rect x="-8" y="-20" width="16" height="20" fill="${A.ink}" opacity=".5"/></g>`+
 `<g transform="translate(150 196)">`+
 `<rect x="-52" y="-52" width="104" height="52" fill="${A.stone}"/><path d="M-58-52h116l-58-20z" fill="${A.roof}"/>`+
 K.dome(0,-72,26,"#7E9AA8",A.stone3)+
 `<rect x="46" y="-124" width="20" height="72" fill="${A.stone}"/><path d="M46-124l10-26 10 26z" fill="${A.stone2}"/>`+
 `<path d="M56-150v-12" stroke="${A.ink}" stroke-width="2"/><path d="M50-106h22v5h-22z" fill="${A.ink}" opacity=".4"/>`+
 K.arch(-12,-24,24,24,A.ink)+K.wins(-40,-40,4,1,9,12,22,0,A.ink)+`</g>`+
 K.sea(214,"#5E8EA0")+K.waves(222,A.white,.3)+
 `<path d="M70 214q70-56 150 0h-30q-58-42-92 0z" fill="${A.stone}"/>`+
 `<path d="M70 214q70-56 150 0" fill="none" stroke="${A.stone3}" stroke-width="2"/>`+
 K.tree(360,222,.7,"#3E6446")+K.tree(34,226,.6,"#3E6446"),

latvia:()=>K.sky("#BDD3E0","#E6EEF0")+K.cloud(70,42,.85)+K.ground(214,A.stone3)+
 [[30,"#B8894F",112],[86,A.stone,132],[142,"#7A5068",118]].map(([x,c,h])=>
 `<g transform="translate(${x} 214)"><rect y="${-h}" width="48" height="${h}" fill="${c}"/><path d="M0 ${-h}l24-28 24 28z" fill="${A.roof}"/>`+
 K.wins(8,-h+18,2,3,10,14,20,28,A.ink)+`</g>`).join("")+
 `<g transform="translate(240 214)"><rect y="-140" width="70" height="140" fill="#C05A48"/>`+
 `<path d="M0-140h8v-10h8v-10h8v-10h8v-10h8v-10h8v-10h8v-10h8v-10h8v80z" fill="#C05A48"/>`+
 `<path d="M0-140h70" stroke="${A.stone}" stroke-width="3"/>`+K.wins(10,-122,3,4,10,14,20,26,"#F2E7CD")+
 `<circle cx="35" cy="-38" r="12" fill="${A.gold}"/></g>`+
 `<g transform="translate(348 214)"><rect x="-13" y="-120" width="26" height="120" fill="${A.stone2}"/><path d="M-17-120h34L0-186z" fill="#4E6B7A"/><path d="M0-186v-14" stroke="${A.ink}" stroke-width="2"/><circle cx="0" cy="-202" r="5" fill="${A.gold}"/></g>`+
 `<rect y="214" width="400" height="46" fill="#C9B994"/>`+
 [0,1,2,3,4,5,6,7,8].map(i=>`<path d="M${i*48} 214l-12 46" stroke="${A.stone3}" stroke-width="2" opacity=".7"/>`).join(""),

liechtenstein:()=>K.sky("#C2D9E2","#E9F1F1")+K.peak(320,168,110,110,"#93A7B5")+K.peak(60,172,90,84,"#A2B4BF")+
 `<path d="M0 260V186q100-40 200-30t200 22v82z" fill="#4E7A55"/>`+
 `<path d="M110 186q50-14 90 4v40q-46-18-90-8z" fill="#3F6446"/>`+
 `<g transform="translate(200 172)">`+
 `<path d="M-70 0q10-26 70-26t70 26z" fill="#7B8B72"/>`+
 `<rect x="-52" y="-62" width="104" height="40" fill="${A.stone}"/>`+
 `<rect x="-62" y="-80" width="26" height="58" fill="${A.stone2}"/><path d="M-64-80h30l-15-22z" fill="${A.roof}"/>`+
 `<rect x="36" y="-92" width="28" height="70" fill="${A.stone2}"/><path d="M34-92h32l-16-26z" fill="${A.roof}"/>`+
 `<path d="M-52-62h104l-52-24z" fill="${A.roof}"/>`+K.wins(-40,-52,4,1,9,12,22,0,A.ink)+
 `<path d="M50-118v-14" stroke="${A.ink}" stroke-width="2"/><path d="M50-132l14 5-14 5z" fill="${A.red}"/></g>`+
 [30,66,340,376].map((x,i)=>K.pine(x,252,.7+(i%2)*.2)).join(""),

lithuania:()=>K.sky(A.warm,"#F5E6C6")+K.sun(320,52,26,"#EFC15C")+K.halo(320,52,40,"#EFC15C")+
 `<path d="M0 260v-46q80-56 200-56t200 56v46z" fill="#7E9A5E"/>`+
 `<path d="M0 214q80-56 200-56t200 56" fill="none" stroke="#5F7F48" stroke-width="3"/>`+
 [[200,158,1.5],[160,166,1.1],[242,166,1.2],[124,180,.9],[276,178,1],[92,194,.8],[310,192,.85],[184,178,.8],[220,182,.75],[146,192,.7],[254,196,.7],[60,208,.65],[344,206,.7],[110,206,.6],[292,208,.6]]
 .map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2" y="-30" width="4" height="34" fill="${A.brown2}"/><rect x="-11" y="-22" width="22" height="4" fill="${A.brown2}"/></g>`).join("")+
 [[172,196,.5],[230,200,.5],[136,210,.45],[268,212,.45],[204,206,.5],[80,220,.4],[320,220,.4]]
 .map(([x,y,s])=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-2" y="-30" width="4" height="34" fill="${A.stone2}"/><rect x="-11" y="-22" width="22" height="4" fill="${A.stone2}"/></g>`).join("")+
 `<rect y="240" width="400" height="20" fill="#6F8B52"/>`,

luxembourg:()=>K.sky("#C4D8E2","#EAF0F0")+K.cloud(70,38,.7)+
 `<rect y="96" width="400" height="34" fill="#6E8C5A"/>`+
 `<rect y="130" width="400" height="130" fill="#8FA07E"/>`+
 `<path d="M0 130q60 44 120 48t160-10 120-38v130H0z" fill="#3F6446"/>`+
 `<rect y="126" width="400" height="20" fill="${A.stone}"/>`+
 [0,1,2,3,4,5].map(i=>`<rect x="${26+i*64}" y="146" width="26" height="${58-Math.abs(i-2.5)*5}" fill="${A.stone2}"/>`+
 K.arch(52+i*64,146,38,46,"#6E8070")).join("")+
 `<g transform="translate(296 96)"><rect x="-34" y="-58" width="68" height="58" fill="${A.stone}"/><path d="M-38-58h76l-38-22z" fill="${A.roof}"/>`+
 K.wins(-24,-46,3,2,10,12,18,22,A.ink)+
 `<rect x="34" y="-40" width="24" height="40" fill="${A.stone2}"/><path d="M32-40h28l-14-18z" fill="${A.roof}"/></g>`+
 `<g transform="translate(92 96)"><rect x="-20" y="-80" width="40" height="80" fill="${A.stone2}"/>`+
 `<path d="M-24-80h48L0-122z" fill="#4E6B7A"/><rect x="-24" y="-80" width="48" height="6" fill="${A.stone3}"/>`+
 K.wins(-12,-64,1,3,10,13,0,22,A.ink)+
 `<path d="M0-122v-12" stroke="${A.ink}" stroke-width="2"/><path d="M0-134l14 5-14 5z" fill="${A.red}"/></g>`+
 K.tree(200,142,.55,"#4E7A55")+K.tree(350,150,.5,"#4E7A55"),

malta:()=>K.sky("#B9D6E2",A.warm)+K.sun(62,46,22,"#EFC15C")+K.sea(178,"#2F86A8")+K.waves(190,A.white,.4)+
 `<path d="M60 178V112h300v66z" fill="#E5D3A4"/><path d="M60 112h300v-8H60z" fill="#D2BE8C"/>`+
 [0,1,2,3,4,5,6].map(i=>`<rect x="${70+i*42}" y="104" width="20" height="12" fill="#D2BE8C"/>`).join("")+
 [[110,104],[176,96],[246,102],[314,94]].map(([x,y])=>
 `<g transform="translate(${x} ${y})"><rect x="-24" y="-40" width="48" height="40" fill="${A.stone}"/><path d="M-28-40h56l-28-14z" fill="#C7B183"/>`+
 `<rect x="-16" y="-28" width="13" height="18" fill="${["#C7523F","#3E6446","#2F6E9E","#E0A32C"][Math.floor(x/90)%4]}"/><rect x="4" y="-28" width="13" height="18" fill="${A.ink}" opacity=".45"/></g>`).join("")+
 `<g transform="translate(200 62)"><rect x="-14" y="0" width="28" height="44" fill="${A.stone}"/>`+K.dome(0,0,20,"#B5794A",A.stone3)+`<path d="M0-40v-12" stroke="${A.gold}" stroke-width="2"/></g>`+
 `<g transform="translate(250 226)"><path d="M-54 0q10 20 54 20t54-20z" fill="#2F6E9E"/><path d="M-54 0h108v-10H-54z" fill="#E0A32C"/><path d="M-40-10h80v-8h-80z" fill="#C7523F"/><path d="M0-18v-30" stroke="${A.brown}" stroke-width="3"/><circle cx="-38" cy="-4" r="4" fill="${A.white}"/><circle cx="-38" cy="-4" r="2" fill="${A.ink}"/></g>`,

moldova:()=>K.sky(A.warm,"#F7EACB")+K.sun(324,52,24,"#EFC15C")+
 `<path d="M0 132q70-30 140-12t130 8 130-22v154H0z" fill="#9CAF72"/>`+
 `<path d="M0 132q70-30 140-12t130 8 130-22" fill="none" stroke="#7E9A5E" stroke-width="4"/>`+
 [0,1,2,3].map(r=>{const y=156+r*26;let s=`<path d="M-10 ${y}q110 16 200 4t220 4" fill="none" stroke="#6E8C4E" stroke-width="3"/>`;
 for(let i=0;i<7;i++){const x=i*58+14+(r%2)*22, yy=y-(i<4?2:-2);
 s+=`<g transform="translate(${x} ${yy}) scale(${1+r*0.12})"><path d="M0 0v-16" stroke="#5C4633" stroke-width="3"/><path d="M0-12q-12-4-14-14 12 0 14 8zM0-12q12-4 14-14-12 0-14 8z" fill="#5F7F48"/><circle cx="-4" cy="-3" r="4" fill="${A.plum}"/><circle cx="4" cy="-1" r="4" fill="${A.plum}"/><circle cx="0" cy="-8" r="3.4" fill="#63405A"/></g>`}
 return s}).join("")+
 `<g transform="translate(320 226)"><ellipse rx="34" ry="28" fill="${A.brown}"/><ellipse rx="34" ry="28" fill="none" stroke="${A.brown2}" stroke-width="3"/><path d="M-34-11h68M-34 11h68" stroke="${A.stone3}" stroke-width="4"/><ellipse cx="-15" rx="11" ry="24" fill="${A.brown2}" opacity=".3"/></g>`+
 `<g transform="translate(58 214)"><path d="M-34 32V6a34 34 0 0 1 68 0v26z" fill="${A.stone2}"/><path d="M-20 32V10a20 20 0 0 1 40 0v22z" fill="${A.ink}" opacity=".65"/></g>`,

monaco:()=>K.sky("#B7D5E4",A.warm)+K.sun(70,44,20,"#EFC15C")+
 `<path d="M0 176V60q70-30 130-14t140 30 130-16v116z" fill="#8FA07E"/>`+
 `<path d="M0 176V96q70-22 130-8t140 22 130-10v76z" fill="#7D9070"/>`+
 [[30,150,58],[70,150,72],[112,150,52],[286,150,66],[330,150,86],[372,150,56]].map(([x,b,h])=>
 `<g transform="translate(${x} ${b})"><rect y="${-h}" width="30" height="${h}" fill="${A.stone}"/>`+K.wins(5,-h+10,2,Math.floor(h/24),7,9,12,20,A.ink)+`</g>`).join("")+
 `<g transform="translate(180 138)"><rect x="-38" y="-30" width="76" height="30" fill="${A.stone}"/><path d="M-42-30h84l-42-16z" fill="${A.roof}"/><path d="M0-46v-12" stroke="${A.ink}" stroke-width="2"/><path d="M0-58l12 4-12 4z" fill="${A.red}"/></g>`+
 K.sea(176,"#2F86A8")+K.waves(188,A.white,.3)+
 [[70,206,1],[160,226,1.25],[290,210,.9]].map(([x,y,s])=>
 `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 0h80l-10 14h-60z" fill="${A.white}"/><rect x="-24" y="-14" width="48" height="14" fill="${A.white}"/><path d="M0-14v-44" stroke="${A.ink}" stroke-width="2"/><path d="M2-56l26 40H2z" fill="#EDE4D2"/></g>`).join("")+
 `<path d="M0 250q80-26 160 0t240-10" fill="none" stroke="${A.ink}" stroke-width="6" opacity=".25"/>`
};

Object.assign(SCENES,{
montenegro:()=>K.sky("#C0D7E0","#E8F0F0")+
 `<path d="M0 200V54l70 70 60-40 80 96 60-70 60 60 70-40v70z" fill="#7E8E86"/>`+
 `<path d="M0 200V96l70 48 70-36 80 72 70-50 60 46 50-26v50z" fill="#67796F"/>`+
 `<path d="M130 200q70-30 140 0z" fill="#4E7A55"/>`+
 K.sea(200,"#2F7E9C")+K.waves(210,A.white,.3)+
 `<path d="M0 200q60 26 130 20t150-14 120 10v-16z" fill="#5C8FA4"/>`+
 `<g transform="translate(96 200)"><rect x="-20" y="-30" width="40" height="30" fill="${A.stone}"/><path d="M-24-30h48l-24-16z" fill="${A.roof}"/><rect x="-6" y="-56" width="12" height="26" fill="${A.stone}"/><path d="M-10-56h20L0-72z" fill="${A.roof}"/></g>`+
 `<g transform="translate(276 226)"><path d="M-30 0h60l-8 12h-44z" fill="${A.white}"/><rect x="-16" y="-10" width="32" height="10" fill="${A.white}"/><path d="M0-10v-26" stroke="${A.ink}" stroke-width="2"/></g>`+
 K.pine(40,196,.7)+K.pine(360,192,.8),

netherlands:()=>K.sky("#BFD8E4","#EDF3F1")+K.cloud(84,38,.9)+K.cloud(304,56,.7)+
 `<rect y="150" width="400" height="110" fill="#93A86E"/>`+
 `<rect y="150" width="400" height="14" fill="#5C8FA4"/>`+
 [["#C7523F",180],["#E0A32C",204],["#C05A8A",230],["#EFE6D2",256]].map(([c,y],r)=>
 [...Array(24)].map((_,i)=>{const x=4+i*17+(r%2)*8,s=1+r*0.18;
 return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 9V-1" stroke="#4E7A55" stroke-width="1.8"/><path d="M-5 1q-1-9 5-11t5 11q0 3-5 3t-5-3z" fill="${c}"/><path d="M-5 9q-6-3-7-8 6 0 7 5z" fill="#4E7A55"/></g>`}).join("")+
 `<rect y="${y+9}" width="400" height="${4+r}" fill="#5F7F48" opacity=".75"/>`).join("")+
 `<g transform="translate(288 152)">`+
 `<path d="M-32 0l13-72h38l13 72z" fill="${A.brown}"/><path d="M-19-72h38l-19-16z" fill="${A.brown2}"/>`+
 `<rect x="-8" y="-28" width="16" height="28" fill="${A.ink}" opacity=".6"/>`+
 `<g transform="translate(0 -82)" stroke="${A.stone}" stroke-width="5"><path d="M0 0l-56-30M0 0l56 30M0 0l30-56M0 0l-30 56"/></g>`+
 `<g transform="translate(0 -82)" stroke="${A.stone3}" stroke-width="1.5" fill="none" opacity=".85"><path d="M-50-26l-6 12M-34-18l-6 12M50 26l6-12M34 18l6-12M26-50l12 6M18-34l12 6M-26 50l-12-6M-18 34l-12-6"/></g>`+
 `<circle cx="0" cy="-82" r="5" fill="${A.ink}"/></g>`+
 `<g transform="translate(88 150)"><path d="M-21 0l8-46h26l8 46z" fill="#9E7A54"/><path d="M-13-46h26l-13-10z" fill="${A.brown2}"/><g transform="translate(0 -52)" stroke="${A.stone}" stroke-width="3.5"><path d="M0 0l-36-18M0 0l36 18M0 0l18-36M0 0l-18 36"/></g></g>`,

macedonia:()=>K.sky("#C4DAE2",A.pale)+K.peak(70,138,96,74,"#8E9E96")+K.peak(330,138,100,84,"#7E9088")+
 K.ground(138,"#5F7F58")+K.sea(190,"#3E88A4")+K.waves(200,A.white,.35)+
 `<path d="M120 190V132q60-26 140-6v64z" fill="#7E8B6E"/>`+
 `<path d="M120 190q60 14 140 0v-6q-70 12-140 0z" fill="${A.stone3}"/>`+
 `<g transform="translate(196 132)">`+
 `<rect x="-34" y="-40" width="68" height="40" fill="${A.stone}"/><path d="M-38-40h76l-38-12z" fill="${A.roof}"/>`+
 `<rect x="-14" y="-72" width="28" height="32" fill="${A.stone}"/>`+K.dome(0,-72,17,"#B5794A",A.stone3)+
 `<path d="M0-106v-12" stroke="${A.gold}" stroke-width="2"/><path d="M-6-112h12" stroke="${A.gold}" stroke-width="2"/>`+
 K.arch(-6,-18,12,18,A.ink)+`</g>`+
 K.pine(140,136,.55)+K.pine(262,130,.6)+
 `<g transform="translate(320 226)"><path d="M-28 0q6 12 28 12t28-12z" fill="${A.brown}"/><path d="M0 0v-26" stroke="${A.ink}" stroke-width="2"/><path d="M2-24l18 20H2z" fill="${A.white}"/></g>`,

norway:()=>K.sky("#BCD3E0",A.warm)+K.sun(200,66,22,"#EFC15C")+
 K.sea(150,"#3E7392")+K.waves(168,A.white,.28)+
 `<path d="M0 260V38l56 38 44-22 76 80 24 126z" fill="#5E6E76"/>`+
 `<path d="M400 260V52l-52 34-46-26-74 88-20 112z" fill="#6E7E86"/>`+
 `<path d="M0 260V104l46 30 42-14 66 66 18 74z" fill="#465862"/>`+
 `<path d="M400 260V118l-44 26-40-18-70 62-14 72z" fill="#53626B"/>`+
 `<path d="M0 56l56 38 44-22 76 80" fill="none" stroke="${A.snow}" stroke-width="5" opacity=".7"/>`+
 `<path d="M400 72l-52 34-46-26-74 88" fill="none" stroke="${A.snow}" stroke-width="5" opacity=".7"/>`+
 `<path d="M154 260l22-104 8 0 20 104z" fill="#6E7E86" opacity=".35"/>`+
 `<g transform="translate(200 224)"><path d="M-28 0h56l-9 13h-38z" fill="${A.red}"/><rect x="-13" y="-11" width="26" height="11" fill="${A.white}"/><path d="M0-11v-28" stroke="${A.ink}" stroke-width="2"/><path d="M2-37l18 26H2z" fill="${A.stone}"/></g>`+
 `<path d="M150 238q18-8 36 0t36 0" fill="none" stroke="${A.white}" stroke-width="2.5" opacity=".5"/>`+
 K.pine(104,196,.5,"#2E4A3E")+K.pine(296,190,.45,"#2E4A3E")+K.birds(300,48,.9),

poland:()=>K.sky("#C2D7E2","#EBF1F1")+K.cloud(320,44,.8)+K.ground(214,A.stone2)+
 `<g transform="translate(120 214)">`+
 `<rect x="-26" y="-150" width="26" height="150" fill="${A.stone}"/><rect x="4" y="-172" width="26" height="172" fill="${A.stone}"/>`+
 `<path d="M-30-150h34l-17-36z" fill="#8A5B4A"/><path d="M0-172h38l-19-42z" fill="#8A5B4A"/>`+
 `<path d="M-13-186v-10M19-214v-12" stroke="${A.gold}" stroke-width="2"/><circle cx="-13" cy="-198" r="4" fill="${A.gold}"/><circle cx="19" cy="-228" r="4" fill="${A.gold}"/>`+
 K.wins(-22,-130,1,4,10,14,0,26,A.ink)+K.wins(10,-150,1,4,10,14,0,26,A.ink)+
 `<rect x="-26" y="-64" width="56" height="64" fill="${A.stone2}"/>`+K.arch(-8,-30,20,30,A.ink)+`</g>`+
 `<g transform="translate(276 214)">`+
 `<rect x="-90" y="-76" width="180" height="76" fill="${A.stone}"/>`+
 `<path d="M-96-76h192l-96-30z" fill="#8A5B4A"/>`+
 [0,1,2,3,4].map(i=>K.arch(-80+i*36,-40,26,40,"#B9A77F")).join("")+
 K.wins(-80,-66,6,1,10,12,30,0,A.ink)+`</g>`+
 `<rect y="214" width="400" height="46" fill="#C9B994"/>`+
 [0,1,2,3,4,5,6,7,8].map(i=>`<path d="M${i*48} 214l-12 46" stroke="${A.stone3}" stroke-width="2" opacity=".6"/>`).join(""),

portugal:()=>K.sky("#BED7E2",A.warm)+K.sun(58,44,20,"#EFC15C")+
 `<rect y="150" width="400" height="110" fill="${A.stone3}"/>`+
 [[10,"#E8D7B0"],[104,"#CFA26A"],[290,"#E2C9A0"],[360,"#C8A88E"]].map(([x,c],i)=>
 `<g transform="translate(${x} 150)"><rect y="-110" width="80" height="110" fill="${c}"/>`+
 K.wins(10,-96,3,3,12,18,24,32,"#3E5B6E")+
 [0,1,2].map(j=>`<rect x="${8+j*24}" y="-36" width="16" height="26" fill="${A.ink}" opacity=".35"/>`).join("")+
 `<path d="M0-110h80" stroke="${A.roof}" stroke-width="7"/></g>`).join("")+
 `<path d="M0 150h400v10H0z" fill="#B49A6E"/>`+
 [0,1,2,3,4,5,6,7,8,9,10,11,12].map(i=>`<path d="M${i*32} 260v-100" stroke="${A.stone2}" stroke-width="2" opacity=".5"/>`).join("")+
 `<path d="M0 196h400" stroke="${A.stone2}" stroke-width="2" opacity=".5"/><path d="M0 228h400" stroke="${A.stone2}" stroke-width="2" opacity=".5"/>`+
 `<g transform="translate(200 232)">`+
 `<rect x="-58" y="-56" width="116" height="48" rx="6" fill="${A.gold}"/><rect x="-58" y="-16" width="116" height="10" fill="#B07B24"/>`+
 `<rect x="-48" y="-48" width="34" height="26" fill="#CFE3E8"/><rect x="-6" y="-48" width="30" height="26" fill="#CFE3E8"/><rect x="30" y="-48" width="20" height="26" fill="#CFE3E8"/>`+
 `<circle cx="-34" cy="-2" r="8" fill="${A.ink}"/><circle cx="34" cy="-2" r="8" fill="${A.ink}"/>`+
 `<path d="M0-56v-14M-30-70h60" stroke="${A.ink}" stroke-width="2"/></g>`,

romania:()=>K.sky("#B9CEDC","#E2EBEE")+K.cloud(70,42,.8)+
 K.peak(60,160,90,70,"#8C9EA8")+K.peak(330,160,96,80,"#7E909C")+
 `<path d="M0 260V166q90-34 200-24t200 16v102z" fill="#3F6446"/>`+
 `<g transform="translate(206 176)">`+
 `<path d="M-64 0q6-30 64-30t64 30z" fill="#8B7F63"/>`+
 `<rect x="-52" y="-58" width="104" height="30" fill="${A.stone}"/>`+
 `<rect x="-56" y="-86" width="30" height="28" fill="${A.stone}"/><path d="M-60-86h38l-19-30z" fill="#9E4A3C"/>`+
 `<rect x="26" y="-96" width="30" height="38" fill="${A.stone}"/><path d="M22-96h38l-19-34z" fill="#9E4A3C"/>`+
 `<rect x="-14" y="-108" width="30" height="50" fill="${A.stone}"/><path d="M-18-108h38l-19-38z" fill="#9E4A3C"/>`+
 K.wins(-46,-50,4,1,8,12,24,0,A.ink)+K.win(-6,-96,10,14,A.ink,.6)+
 `<path d="M1-146v-12" stroke="${A.ink}" stroke-width="2"/><path d="M1-158l12 4-12 4z" fill="${A.red}"/></g>`+
 [24,58,346,378].map((x,i)=>K.pine(x,250,.75+(i%2)*.18,"#2E4A3E")).join("")+K.pine(120,256,.6,"#2E4A3E")+K.pine(300,258,.55,"#2E4A3E"),

russia:()=>K.sky("#C2D4E2","#EAF0F2")+K.cloud(60,40,.8)+K.ground(212,A.stone2)+
 `<g transform="translate(200 212)">`+
 `<rect x="-110" y="-56" width="220" height="56" fill="${A.stone}"/>`+
 `<rect x="-34" y="-130" width="68" height="74" fill="${A.stone}"/>`+K.onion(0,-130,22,"#C7523F")+
 `<path d="M0-186v-12" stroke="${A.gold}" stroke-width="2.5"/><path d="M-7-192h14" stroke="${A.gold}" stroke-width="2.5"/>`+
 [[-78,-96,16,"#3E7392"],[78,-96,16,"#4E7A55"],[-46,-84,13,"#E0A32C"],[46,-84,13,"#7A5068"]].map(([x,y,r,c])=>
 `<rect x="${x-r*0.9}" y="${y}" width="${r*1.8}" height="${-y}" fill="${A.stone}"/>`+K.onion(x,y,r,c)+
 `<path d="M${x} ${y-r*2.2-4}v-8" stroke="${A.gold}" stroke-width="2"/>`).join("")+
 `<path d="M-110-56h220" stroke="${A.stone3}" stroke-width="3"/>`+
 K.arch(-12,-16,24,34,A.ink)+K.wins(-98,-42,3,1,10,14,26,0,A.ink)+K.wins(62,-42,3,1,10,14,26,0,A.ink)+
 `</g>`+
 `<rect y="212" width="400" height="48" fill="#BEA87E"/>`+
 [0,1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${i*44} 212l-14 48" stroke="${A.stone3}" stroke-width="2" opacity=".55"/>`).join(""),

sanmarino:()=>K.sky("#BDD6E2",A.warm)+K.sun(60,48,20,"#EFC15C")+K.cloud(310,52,.7)+
 `<path d="M0 260V206q60-16 110-44t120-52 170-24v174z" fill="#7E8E72"/>`+
 `<path d="M60 206q70-22 120-50t120-46v20q-70 18-130 52t-110 34z" fill="#8E9C80"/>`+
 [[120,150,52],[212,120,64],[310,96,56]].map(([x,b,h])=>
 `<g transform="translate(${x} ${b})"><path d="M-22 0q0-8 22-8t22 8z" fill="#9AA58C"/>`+
 `<rect x="-15" y="${-h}" width="30" height="${h}" fill="${A.stone}"/>`+
 `<rect x="-20" y="${-h-10}" width="40" height="12" fill="${A.stone2}"/>`+
 [0,1,2,3].map(i=>`<rect x="${-20+i*11}" y="${-h-18}" width="7" height="9" fill="${A.stone2}"/>`).join("")+
 K.wins(-6,-h+16,1,2,10,13,0,24,A.ink)+
 `<path d="M0 ${-h-18}v-14" stroke="${A.ink}" stroke-width="2"/><path d="M0 ${-h-32}l14 5-14 5z" fill="${A.red}"/></g>`).join("")+
 `<path d="M120 150q46-16 92-30M212 120q50-14 98-24" stroke="${A.stone3}" stroke-width="3" fill="none" opacity=".7"/>`+
 K.pine(40,250,.7,"#3E6446")+K.pine(76,258,.55,"#3E6446"),

serbia:()=>K.sky("#C6D8E2",A.pale)+K.cloud(70,44,.8)+
 `<path d="M0 260V160q80-40 200-40t200 26v114z" fill="#6E8C5A"/>`+
 `<g transform="translate(200 148)">`+
 `<rect x="-140" y="-16" width="280" height="30" fill="${A.stone2}"/>`+
 [0,1,2,3,4,5,6,7,8,9].map(i=>`<rect x="${-140+i*29}" y="-26" width="16" height="12" fill="${A.stone2}"/>`).join("")+
 `<rect x="-60" y="-70" width="46" height="54" fill="${A.stone}"/><path d="M-64-70h54l-27-20z" fill="#8A5B4A"/>`+
 `<rect x="34" y="-60" width="40" height="44" fill="${A.stone}"/><path d="M30-60h48l-24-18z" fill="#8A5B4A"/>`+
 K.arch(-14,-16,28,36,A.ink)+K.wins(-52,-58,2,1,9,12,22,0,A.ink)+K.wins(44,-50,2,1,9,12,20,0,A.ink)+
 `<path d="M-37-90v-14" stroke="${A.ink}" stroke-width="2"/><path d="M-37-104l14 5-14 5z" fill="${A.red}"/></g>`+
 K.sea(196,"#4F86A2")+K.waves(206,A.white,.3)+
 `<path d="M0 196h400v-6H0z" fill="#3E6E88"/>`+
 `<path d="M190 196v64" stroke="#3E6E88" stroke-width="5" opacity=".6"/>`+
 `<g transform="translate(300 232)"><path d="M-34 0h68l-10 14h-48z" fill="${A.white}"/><rect x="-14" y="-12" width="28" height="12" fill="${A.stone2}"/><path d="M0-12v-20" stroke="${A.ink}" stroke-width="2"/></g>`,

slovakia:()=>K.sky("#BFD6E4","#E9F0F0")+
 K.peak(80,176,100,116)+K.peak(200,176,112,144)+K.peak(318,176,96,108)+
 `<rect y="176" width="400" height="84" fill="#6E8C5A"/>`+
 `<path d="M0 176q80 26 200 18t200-14v14z" fill="#5F7F48"/>`+
 `<g transform="translate(300 202)"><rect x="-26" y="-34" width="52" height="34" fill="${A.brown}"/><path d="M-32-34h64L0-76z" fill="#5C4633"/><rect x="-7" y="-20" width="14" height="20" fill="${A.ink}" opacity=".5"/><path d="M0-76v-16" stroke="${A.ink}" stroke-width="2"/><path d="M-7-84h14" stroke="${A.ink}" stroke-width="2"/></g>`+
 `<g transform="translate(88 208)"><rect x="-34" y="-30" width="68" height="30" fill="${A.stone}"/>`+
 [0,1,2,3].map(i=>`<rect x="${-30+i*18}" y="-58" width="14" height="28" fill="${A.stone}"/><path d="M${-32+i*18}-58h18l-9-16z" fill="#8A5B4A"/>`).join("")+
 `<path d="M-38-30h76" stroke="${A.stone3}" stroke-width="3"/>`+K.win(-6,-18,12,18,A.ink,.55)+`</g>`+
 K.pine(24,236,.8,"#2E4A3E")+K.pine(150,246,.7,"#2E4A3E")+K.pine(240,242,.65,"#2E4A3E")+K.pine(376,240,.75,"#2E4A3E"),

slovenia:()=>K.sky("#C4DAE4","#EDF2F1")+K.peak(80,150,100,86)+K.peak(300,150,110,96)+
 `<path d="M0 150h400v30H0z" fill="#4E7A55"/>`+
 K.sea(180,"#4E97AE")+K.waves(192,A.white,.3)+
 `<ellipse cx="200" cy="216" rx="76" ry="30" fill="#6E8C5A"/>`+
 `<g transform="translate(200 206)"><rect x="-26" y="-34" width="52" height="34" fill="${A.stone}"/><path d="M-30-34h60l-30-14z" fill="#9E4A3C"/>`+
 `<rect x="-9" y="-78" width="18" height="44" fill="${A.stone}"/><path d="M-13-78h26L0-104z" fill="#9E4A3C"/>`+
 `<path d="M0-104v-10" stroke="${A.ink}" stroke-width="2"/><circle cx="0" cy="-116" r="4" fill="${A.gold}"/>`+
 K.arch(-6,-12,12,18,A.ink)+`</g>`+
 K.pine(160,212,.45,"#2E4A3E")+K.pine(244,214,.45,"#2E4A3E")+
 `<g transform="translate(96 238)"><path d="M-30 0q6 12 30 12t30-12z" fill="${A.brown}"/><path d="M-12-2q0-10 12-10t12 10z" fill="${A.brown2}"/><path d="M-34 6l-14-10M34 6l14-10" stroke="${A.brown2}" stroke-width="3"/></g>`,

spain:()=>K.sky("#BED5E2",A.warm)+K.sun(62,46,22,"#EFC15C")+K.ground(216,"#B49A6E")+
 `<g transform="translate(200 216)">`+
 [[-96,140,17],[-58,178,20],[-18,206,22],[24,190,20],[64,156,18],[100,126,15]].map(([x,h,w])=>
 `<path d="M${x-w} 0q${w*0.2} ${-h} ${w} ${-h}t${w} ${h}z" fill="${A.stone2}"/>`+
 `<path d="M${x-w*0.5} ${-h*0.5}q${w*0.3} ${-h*0.5} ${w*0.5} ${-h*0.5}t${w*0.5} ${h*0.5}z" fill="${A.stone}" opacity=".7"/>`+
 `<circle cx="${x}" cy="${-h-6}" r="5" fill="${A.gold}"/><circle cx="${x}" cy="${-h-16}" r="3" fill="${A.red}"/>`+
 [0,1,2].map(i=>`<circle cx="${x}" cy="${-h*0.35-i*h*0.2}" r="2.6" fill="${A.ink}" opacity=".5"/>`).join("")).join("")+
 `<rect x="-116" y="-56" width="232" height="56" fill="${A.stone2}"/>`+
 [0,1,2,3,4,5,6].map(i=>K.arch(-108+i*33,-12,20,34,"#A99372")).join("")+
 `<path d="M-116-56h232" stroke="${A.stone3}" stroke-width="3"/></g>`+
 `<rect y="216" width="400" height="44" fill="#A8925F"/>`+K.tree(40,252,.7,"#4E7A55")+K.tree(362,256,.75,"#4E7A55"),

sweden:()=>K.sky("#C0D8E4",A.warm)+K.sun(330,50,22,"#EFC15C")+
 `<rect y="186" width="400" height="74" fill="#3E7392"/>`+K.waves(198,A.white,.3)+
 [["#C7523F",4,86],["#E0C05A",50,104],["#C9A24A",96,92],["#B0553F",142,110],["#E8DCC0",188,96],["#C7523F",234,106],["#D9A86E",280,88],["#C9A24A",326,100],["#B0553F",372,92]].map(([c,x,h])=>
 `<g transform="translate(${x} 186)"><rect y="${-h}" width="42" height="${h}" fill="${c}"/><path d="M-3 ${-h}h48l-24-14z" fill="#6E5B4A"/>`+
 K.wins(7,-h+14,2,Math.floor(h/32),9,12,18,26,A.ink)+`</g>`).join("")+
 `<g transform="translate(150 186)"><rect x="-12" y="-150" width="24" height="60" fill="#E8DCC0"/><path d="M-16-150h32L0-190z" fill="#5C7A8E"/><path d="M0-190v-12" stroke="${A.ink}" stroke-width="2"/><circle cx="0" cy="-204" r="4" fill="${A.gold}"/></g>`+
 `<g transform="translate(300 226)"><path d="M-44 0h88l-12 16h-64z" fill="${A.white}"/><rect x="-26" y="-14" width="52" height="14" fill="${A.white}"/><path d="M-10-14v-40" stroke="${A.ink}" stroke-width="2"/><path d="M-8-52l24 36H-8z" fill="#EDE4D2"/></g>`,

switzerland:()=>K.sky("#BFD9E6","#EDF3F2")+K.cloud(70,42,.8)+
 `<path d="M60 196L196 32l56 74 30-24 58 114z" fill="#8FA4B2"/>`+
 `<path d="M196 32l-46 56 26 14 24-22 24 20 18-24z" fill="${A.snow}"/>`+
 `<path d="M196 32l56 74 30-24 58 114H228z" fill="#7B90A0"/>`+
 `<rect y="196" width="400" height="64" fill="#6E8C5A"/>`+
 `<path d="M0 196q100 20 200 12t200-6v10H0z" fill="#5F7F48"/>`+
 `<g transform="translate(96 226)"><rect x="-34" y="-30" width="68" height="30" fill="${A.brown}"/><path d="M-42-30h84L0-58z" fill="#5C4633"/><rect x="-24" y="-20" width="14" height="20" fill="${A.gold}" opacity=".8"/><rect x="8" y="-20" width="14" height="20" fill="${A.gold}" opacity=".8"/><path d="M-42-30h84" stroke="${A.stone3}" stroke-width="3"/></g>`+
 `<g transform="translate(270 238)"><rect x="-56" y="-26" width="112" height="26" rx="5" fill="${A.red}"/><rect x="-48" y="-20" width="26" height="14" fill="#CFE3E8"/><rect x="-16" y="-20" width="26" height="14" fill="#CFE3E8"/><rect x="16" y="-20" width="26" height="14" fill="#CFE3E8"/><circle cx="-34" cy="2" r="6" fill="${A.ink}"/><circle cx="34" cy="2" r="6" fill="${A.ink}"/></g>`+
 `<path d="M-10 250h420" stroke="${A.ink}" stroke-width="3" opacity=".35"/>`,

ukraine:()=>K.sky("#9FC6E0","#D8E8F0")+K.sun(66,46,22,"#EFC15C")+
 `<rect y="150" width="400" height="110" fill="#E0B03C"/>`+
 `<g transform="translate(220 150)">`+
 `<rect x="-70" y="-56" width="140" height="56" fill="${A.white}"/>`+
 `<rect x="-22" y="-104" width="44" height="48" fill="${A.white}"/>`+K.onion(0,-104,20,A.gold)+
 `<path d="M0-156v-10" stroke="${A.gold}" stroke-width="2"/>`+
 [[-52,-78,13],[52,-78,13]].map(([x,y,r])=>`<rect x="${x-r*0.85}" y="${y}" width="${r*1.7}" height="${-y}" fill="${A.white}"/>`+K.onion(x,y,r,A.gold)).join("")+
 `<path d="M-70-56h140" stroke="${A.stone3}" stroke-width="2.5"/>`+
 K.arch(-10,-16,20,28,A.ink)+K.wins(-60,-44,3,1,9,13,24,0,"#3E5B6E")+K.wins(36,-44,3,1,9,13,24,0,"#3E5B6E")+`</g>`+
 [[40,214,1.2],[110,236,1.45],[184,224,1.1],[268,244,1.5],[340,220,1.2],[376,250,1.3]].map(([x,y,s])=>
 `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0v34" stroke="#4E7A55" stroke-width="4"/>`+
 [...Array(10)].map((_,i)=>`<ellipse cx="0" cy="-15" rx="5" ry="15" fill="${A.gold}" transform="rotate(${i*36}) translate(0 0)"/>`).join("")+
 `<circle r="9" fill="#6B4326"/></g>`).join(""),

uk:()=>K.sky("#B6C9D6","#DCE7EC")+K.cloud(80,46,.9)+K.cloud(320,38,.7)+
 `<rect y="204" width="400" height="56" fill="#5C7A8E"/>`+K.waves(214,A.white,.25)+
 `<g transform="translate(300 204)">`+
 `<rect x="-34" y="-176" width="68" height="176" fill="#C9AE72"/>`+
 `<rect x="-38" y="-120" width="76" height="10" fill="#B59A60"/>`+
 `<circle cx="0" cy="-146" r="24" fill="${A.white}"/><circle cx="0" cy="-146" r="24" fill="none" stroke="${A.ink}" stroke-width="2.5"/>`+
 `<path d="M0-146v-14M0-146l10 8" stroke="${A.ink}" stroke-width="2.5"/>`+
 `<path d="M-34-176h68l-34-24z" fill="#8A6E3E"/><path d="M0-200v-14" stroke="${A.ink}" stroke-width="2"/><circle cx="0" cy="-216" r="4" fill="${A.gold}"/>`+
 K.wins(-24,-104,3,3,10,16,18,26,A.ink)+`</g>`+
 `<g transform="translate(120 204)">`+
 `<rect x="-110" y="-64" width="220" height="64" fill="#B9A77F"/>`+
 [0,1,2,3,4,5].map(i=>K.arch(-100+i*34,-30,22,34,"#9E8A62")).join("")+
 `<path d="M-110-64h220" stroke="${A.stone3}" stroke-width="3"/>`+
 `<rect x="-60" y="-100" width="52" height="36" rx="4" fill="${A.red}"/>`+
 `<rect x="-52" y="-94" width="14" height="12" fill="#DCE7EC"/><rect x="-32" y="-94" width="14" height="12" fill="#DCE7EC"/>`+
 `<rect x="-52" y="-78" width="14" height="10" fill="#DCE7EC"/><rect x="-32" y="-78" width="14" height="10" fill="#DCE7EC"/>`+
 `<circle cx="-46" cy="-62" r="5" fill="${A.ink}"/><circle cx="-18" cy="-62" r="5" fill="${A.ink}"/></g>`,

vatican:()=>K.sky("#C2D8E2",A.warm)+K.sun(58,44,20,"#EFC15C")+K.ground(216,A.stone2)+
 `<g transform="translate(200 216)">`+
 `<path d="M-168 0q4-46 58-64l6 18q-42 16-46 46z" fill="${A.stone}"/>`+
 `<path d="M168 0q-4-46-58-64l-6 18q42 16 46 46z" fill="${A.stone}"/>`+
 [0,1,2,3,4,5].map(i=>`<rect x="${-160+i*22}" y="${-16-i*8}" width="9" height="${16+i*8}" fill="${A.stone3}" opacity=".85"/>`).join("")+
 [0,1,2,3,4,5].map(i=>`<rect x="${151-i*22}" y="${-16-i*8}" width="9" height="${16+i*8}" fill="${A.stone3}" opacity=".85"/>`).join("")+
 `<path d="M-168-14q6-40 56-58l3 8q-46 20-50 50z" fill="${A.stone2}"/>`+
 `<path d="M168-14q-6-40-56-58l-3 8q46 20 50 50z" fill="${A.stone2}"/>`+
 `<rect x="-66" y="-86" width="132" height="86" fill="${A.stone}"/>`+
 `<path d="M-70-86h140l-70-22z" fill="${A.stone3}"/>`+
 [0,1,2,3,4,5].map(i=>`<rect x="${-58+i*21}" y="-72" width="11" height="48" fill="${A.stone3}" opacity=".5"/>`).join("")+
 `<rect x="-38" y="-120" width="76" height="34" fill="${A.stone}"/>`+
 `<path d="M-42-120a42 46 0 0 1 84 0z" fill="#93A8A4"/>`+
 [-28,-14,0,14,28].map(x=>`<path d="M${x} -120q${-x*0.3} -28 ${-x*0.82} -44" fill="none" stroke="${A.stone}" stroke-width="2" opacity=".55"/>`).join("")+
 `<path d="M-42-120h84" stroke="${A.stone3}" stroke-width="3"/>`+
 `<rect x="-11" y="-180" width="22" height="18" fill="${A.stone}"/><circle cx="0" cy="-186" r="8" fill="${A.gold}"/>`+
 `<path d="M0-196v-14M-6-204h12" stroke="${A.gold}" stroke-width="2.5"/>`+
 K.arch(-13,-26,26,38,A.ink)+K.wins(-46,-70,2,1,10,14,72,0,A.ink)+`</g>`+
 `<g transform="translate(52 216)"><path d="M-8 0h16l-3-76h-10z" fill="${A.stone3}"/><path d="M-15 0h30v7h-30z" fill="${A.stone2}"/><path d="M0-76v-12M-5-84h10" stroke="${A.gold}" stroke-width="2"/></g>`
});
