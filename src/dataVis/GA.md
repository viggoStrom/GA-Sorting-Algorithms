





Sorteringsalgoritmers Effektivitet
Hur effektiva är olika algoritmer på att sortera korta och långa listor?

Abstract
Här skriver du en kort sammanfattande text på engelska om ditt arbete. I abstract ska syfte, frågeställning, metod, material, resultat och slutsats ingå. Läsaren ska kunna läsa enbart abstract och förstå undersökningen från start till slut. 
Max en halv A4-sida.

Innehåll
1 Inledning	1
2 Syfte och frågeställning	1
3 Teori och Bakgrund	2
3.1 Begrepp	2
Intern kontra extern sortering	2
Stabilitet (stability)	2
Adaptivitet (adaptivity)	3
Destruktivitet (destructiveness)	3
Tidskomplexitet (time complexity)	3
Utrymmeskomplexitet (space complexity)	3
3.2 Sorteringsalgoritmer	4
3.2.1 Jämförelsealgoritmer	4
3.2.2 icke-jämförande algoritmer.	4
3.2.3 “Roliga” algoritmer	4
3.3 Datamängder	5
3.4 Avgränsningar	5
4 Metod och material	6
4.1 Material	6
4.2 Metod	6
5 Resultat	7
6 Diskussion	7
7 Slutsats	8
Källförteckning	10
Bilagor	11


1 Inledning
Denna rapport kommer att beröra effektiviteten av olika vanliga, och ovanliga, sorteringsalgoritmer. Rapporten kommer att visa hur bra de olika algoritmerna presterar vid sortering av olika långa listor.
2 Syfte och frågeställning
Syftet är att ta reda på vilken sorteringsalgoritm som är lämplig att använda i vilka situationer. Olika algoritmer har olika fördelar så vissa bör prestera bättre på kortare listor medan den presterar sämre på längre. Motsatsen bör också stämma. Vissa algoritmer som presterar bra på längre listor kan falera med kortare listor. I dagens samhälle där uppåt 1,5% av världens totala energi går till datacenter och servrar (International Energy Agency, 2023). Därför är det mycket viktigt att bespara så mycket energi som möjligt där det går för att minska miljöpåverkan. Så fort man ska söka på eller sortera ett resultat på webben måste åtminstone en lista sorteras på vägen, antagligen fler än så. Om man då kan sortera listan med den lämpligaste algoritmen sparar man processorcyklar, diskaktivitet och ström. Frågeställningen är därmed, “Vilka sorteringsalgoritmer är minst tids- och resursintensiva vid sortering av korta och långa listor?”.
3 Teori och Bakgrund
Att sortera en lista innebär att varje element i listan är i storleksordning, stigande eller fallande. En sorteringsalgoritms mål är att sortera en lista så effektivt som möjligt. Effektiviteten av en algoritm kan delas upp i och beskrivas med följande: Intern kontra extern sortering, stabilitet, adaptivitet, destruktivitet, tidskomplexitet, och utrymmeskomplexitet.


3.1 Begrepp
3.1.1 Intern kontra extern sortering
Intern sortering sker när datamängden är så liten att den kan lagras helt i minnet (Internal sort, Wikipedia, 2022). Intern sortering har fördelen att ha tillgång till all data som ska sorteras väldigt fort. Nackdelen är att man måste ha så mycket minne som data vilket fort bli dyrt.
Extern sortering sker när datamängden är så stor att den måste lagras på disk (External sort, Wikipedia, 2023). Fördelen är att det bara behövs mer diskutrymme, vilket är billigt, för att hantera större datamängder. Nackdelen med extern sortering är att det oftast kommer vara mycket långsammare än intern sortering i och med att hårddiskar och SSDs är långsammare än RAM-minne.


3.1.2 Stabilitet (stability)
En algoritm är stabil ifall flera element i listan med samma värde behåller sina relativa positioner (Yash, Chauhan & Anuj Duggal, 2020, s.1). Det är inte relevant vid sortering av enkla listor i och med att en trea är identisk till en annan trea. En viktig tillämpning av sorteringsalgoritmer kräver å andra sidan en stabil algoritm, sortering av objekt med flera datapunkter. Exempelvis en lista personer. Ska man bara sortera på födelsedatum eller längd spelar det ingen roll om algoritmen är stabil eller inte eftersom det enda du är intresserad av är födelsedatumet eller längden. Om man vill ta reda på den längsta personen per ålder måste man sortera listan med hänsyn till båda värdena. För att lösa problemet sorterar man först listan med en algoritm, stabil eller inte, som tar hänsyn till längd. Efter att den sorterats en gång sorterar man den igen med hänsyn till ålder med en stabil algoritm. Boom, nu är listan sorterad främst efter ålder men inom åldersgrupperna är individerna sorterade på längd.


3.1.3 Adaptivitet (adaptivity)
En algoritm är adaptiv om den sorterar en lista med färre operationer (snabbare) om listan redan är delvis sorterad (Yash, Chauhan & Anuj Duggal, 2020, s.1). I många riktiga fall kan en lista redan vara sorterad innan ny data introduceras som gör listan osorterad igen. En adaptiv algoritm kan hantera sorteringen av det nya elementet utan att behöva göra extra, onödiga operationer på delar av listan som redan är sorterade. Att en algoritm är adaptiv kan vara en av de viktigaste egenskaperna hos en algoritm i och med att dagens datacenter konstant fyller på med data som behöver sorteras in. Om det kan ske utan att sortera om all data kan det innebära betydliga energibesparingar. 
3.1.4 Destruktivitet (destructiveness)
Destruktivitet betecknar om listan före, och efter sorteringen har lika många element och att de har samma element.
3.1.5 Tidskomplexitet (time complexity)
Namnet kan vara lite missvisande men det är ett mått på hur många operationer i snitt, i värsta fall, och i bästa fall en algoritm tar på sig att sortera listan. Man betecknar ofta det med stora O(n), för ordo (latin för ordning). n är längden av listan som sorteras. Exempelvis quicksort, en populär algoritm har en tidskomplexitet av O(n ⋅ log(n)) vilket innebär att många operationer algoritmer tar är relaterat till listans längd i relationen n ⋅ log(n). Ifall en lista på 100 element ska sorteras av quicksort kommer den i snitt använda 100 ⋅ log(100) = 200 operationer för att sortera listan. Färre är bättre.
3.1.6 Utrymmeskomplexitet (space complexity)
Likt tidskomplexitet är det ett mått i relation till listans längd, n. Om en algoritm har en utrymmeskomplexitet på 1 kommer den bara att kräva så mycket utrymme som listan tar upp i sig. Alternativt om en algoritm har en utrymmeskomplexitet på n kommer den ta upp utrymmet av sig själv gånger längden av listan. T.ex. en lista på 100 element som tar upp 30 MB sorteras med en algoritm som har utrymmeskomplexiteten n kommer då att ta upp 100 ⋅ 30 = 3 000 MB i minnet, inte alltid optimalt ifall datamängden är för stor. 
3.2 Sorteringsalgoritmer 
Det finns två huvudkategorier av sorteringsalgoritmer, nämligen jämförelsealgoritmer, och icke-jämförelsealgoritmer. Det finns även mindre seriösa algoritmer som också kommer att analyseras utan förväntningar om att de kommer att prestera väl. En algoritm som bör nämnas är den inbyggda .sort() metoden i JavaScript som använder sig av introsort som är en kombination av quicksort, heapsort, och insertionsort (Introsort, Wikipedia, 2023).
3.2.1 Jämförelsealgoritmer
Det är algoritmer som endast använder enkla jämförelser mellan värden, det vill säga: mindre än, större än, mindre eller lika med, större eller lika med, och lika med. De betecknas: <, >, <=, >=, respektive = (Comparison sort, Wikipedia, 2023). Följande är några vanliga sorteringsalgoritmer som kommer att testas och även deras tidskomplexiteter i snitt (Sorting algorithm, Wikipedia, 2023).
Quicksort - [n ⋅ log(n)]
Mergesort - [n ⋅ log(n)]
Heapsort - [n ⋅ log(n)]
Combsort - [n2]
Selectionsort - [n2]
Insertionsort - [n2]
Binary Insertionsort - [n2]
Bubblesort - [n2]
3.2.2 Icke-jämförande algoritmer
Det är algoritmer som använder sig av matematiska operationer med nycklar som representerar elementen i en lista. De kan vara snabbare än traditionella jämförelsealgoritmer i vissa fall, beroende på datamängden som sorteras (Integer sorting, Wikipedia, 2023). Följande är några vanliga icke-jämförande algoritmer.
Bucketsort
LSD Radixsort
MSD Radixsort
3.2.3 ”Roliga” algoritmer
Dessa är algoritmer som inte har mycket praktiskt värde som inte bör användas i något syfte annat än för rekreation.
* Gravitysort
* Pancakesort
* Spagettisort
* Bogosort
Gravitysort är en algoritm som kan jämföras med en kulram med olika antal kulor per stång. Man tänker sig att varje kolumn av kulramen representerar ett element, där mängden kulor i kolumnen motsvarar värdet av elementet. Om kulramen lutas åt ett håll glider alla kulorna till samma ände av stängerna med hjälp av gravitation. Läser man sen av mängden kulor per kolumn får man varje element i sorterad ordning. Algoritmen bygger på att gravitation existerar som fenomen, men i kod måste ”gravitationen” programmeras, vilket leder till att metodens huvudfördel försvinner.
Pancakesort är en algoritm där den enda operationen är att ta en godtycklig mängd element från toppen av listan och vända den upp och ner. Algoritmen kommer från ett matematiskt problem där pannkakor ska sorteras med hjälp av en stekspade. I och med att algoritmen är begränsad till en operation kan den inte vara lika effektiv som konventionella algoritmer.
Spagettisort går ut på att plocka ut det största element ur listan och flytta det till en ny lista, tills att elementen är flyttade till den nya listan. Den bygger på principen för hur en människa skulle göra för att sortera en bunt okokta spagettistrån efter längd, men är en ineffektiv algoritm för en dator i och med att den kräver en processor per element.
Bogosort går ut på att slumpa ordningen av alla element i listan tills den är sorterad. Nackdelen med denna algoritm är att den kan fortsätta för evigt utan att någonsin lyckas sortera listan.

3.3 Datamängder
Listorna som sorteras är normalfördelade. Anledningen till den fördelningen är att nästan all data från verkligheten, insamlat från personer, naturen, allt. Det gäller så länge datamängden är så stor att slump försummas (Central limit theorem, Wikipedia, 2023). Halvsorterade listor kommer också att sorteras för att testa adaptivitet. För att bevara normalfördelningen kommer den halvsorterade listan bestå av en kortare normalfördelad lista som sorteras, därefter kommer mer, normalfördelad data att läggas till så listan når den fulla längden. Både den halvsorterade och osorterade listan kommer från samma slumpade källa för att göra datan så jämförbar som möjligt i samma generation. Alla algoritmer kommer att sortera och prövas på X antal slumpade listor för att kunna försumma slumpen tillslut enligt the law of large numbers (Law of large numbers, Wikipedia, 2023). För att kontrollera stabiliteten av algoritmerna kommer de att prövas med en lista av objekt med två värden så ordningen kan kontrolleras med det andra värdet som inte kommer att läsas.


3.4 Avgränsningar
Denna avhandling kommer bara att beröra intern sortering och endast indirekt beröra extern sortering i och med att extern sortering är en vidare tillämpning av intern sortering. För att sortera externt krävs det att bitar av listan lyfts in i minnet och sorteras med en intern sorteringsalgoritm. Det innebär att all extern sortering innefattar och bygger på intern sortering. Därmed är undersökningen av intern sortering mer intressant än extern sortering för syftet med denna undersökning. Dessutom är datamängderna som används i undersökningen så pass små att de ryms med god marginal i systemets minne. En lista på 1 000 000 element tar upp cirka 19 MB medan hela RAM-minnet som datorn har är 32 GB totalt varav ungefär 20 GB är tillgängligt för processen. 20 GB motsvarar 20 000 MB som är ungefär 1000 gånger större än listan
Ännu en avgränsning som är värd att nämna är att undersökningen inte kommer att ta hänsyn till icke-jämförande algoritmer i och med att de inte är så lätta att jämföra de teoretiska tidskomplexiteterna och inte heller de ”roliga” algoritmerna eftersom de oftast inte ens blir klara. Det finns nästintill inget värde att jämföra en algoritm som bogosort med en som heapsort. De är på helt olika nivåer med helt olika syften.


4 Metod och material
4.1 Material
Till att börja med krävdes en dator för att genomföra undersökningen (32 GB RAM-minne). Programmeringsspråket TypeScript (version 5.2.2) användes för att skriva programmet. TypeScript är en utökad och striktare version av det mer kända JavaScript. Ett bibliotek var även installerat, TensorFlowJS (TFJS) (version 10.0.0). TFJS är ett bibliotek för att underlätta utvecklingen av AI och neurala nätverk. De aspekterna av paketet användes dock inte utan bara dess vektorfunktioner, särskilt den som genererar en normalfördelad vektor med slumpade värden. Node JS (version 18.17.1) bör också vara installerad. För att redigera koden användes programmet Visual Studio Code (version. 1.84.0).

4.2 Metod
En normalfördelad, slumpmässig lista på X element genereras med en slumpad standardavvikelse. Listan genereras och en kopia av listan delas upp i två delar med en slumpad storlek. Den ena delen av listan sorteras med den inbyggda .sort() metoden, sedan kombineras den med den osorterade halvan av listan. Både den helt osorterade och den halvsorterade listan sorteras sedan en gång av alla algoritmer. Det upprepas X gånger med andra listor som genererats på samma sätt som den initiala listan.
Föregående steg upprepas med listor med X, X, X, och X element.
Alla algoritmer sorterar sedan listan av objekt för att kontrollera stabilitet.
5 Resultat
Stor jävla tabell
Mycket grafer och sånt.
Nån gif animation av en algoritm in action kanske (väldigt eventuellt)
Här redogör du för ditt resultat på ett neutralt sätt. Kommentera alltså inte vad resultatet blev, utan skriv sakligt (tänk torrt och tråkigt!) Redovisa data i den presentationsform som är lämplig för din typ av data. Numeriska data (såsom resultat av laborationer) redovisar du i tabell- och diagramform. Kvalitativa data (såsom enkät- eller intervjusvar) redovisar du genom att till exempel återge citat eller observationer. 
Om du har en mycket stor mängd mätdata kan du välja att här bara återge de delar som är relevanta för din diskussion och slutsats och bifoga dina fullständiga mätdata som en bilaga i slutet av rapporten. Glöm dock inte att hänvisa till bilagor i rapporten - till exempel ”(se bilaga)”.
Oavsett om du genomfört en kvantitativ eller kvalitativ studie så ska du alltid redovisa i löpande textform. Redovisa till exempel inte bara tabeller och diagram, utan skriv alltid en löpande text där du sammanfattar resultatet. Beskriv med ord i den löpande texten vilken typ av data varje tabell och diagram visar. Alla figurer, tabeller och diagram ska ha en hänvisning och beskrivas i den löpande texten.
Observera dock att du inte ska redovisa slutsatser eller diskutera dina resultat här – det gör du under kommande avsnitt (6. Diskussion och 7. Slutsats). Det enda du presenterar här är rådata, inga åsikter.
6 Diskussion
Detta är den största delen av rapporten. I detta avsnitt för du en diskussion kring de resultat som du har redovisat i ovanstående avsnitt. Här presenteras inga nya resultat, utan vad du anser att resultatet som du har redovisat visar på. Det är utifrån denna tolkning som du drar slutsatser om svaret på din frågeställning.
När du tolkat ditt resultat måste du diskutera hur säkra och pålitliga dina resultat är. Var metoden tillräckligt noggrann eller tillförlitlig för att du ska kunna dra en säker slutsats? Hur stora och relevanta är dina felkällor? Hur stort generellt värde har din slutsats – går den till exempel att använda i andra situationer eller har du bara undersökt vissa specialfall? Behöver man studera frågeställningen vidare? I så fall, hur?
Diskutera här också hur din slutsats relaterar till tidigare forskning inom området. Det är nu du ska jämföra vad källorna säger med vad ditt resultat blev. Motsäger ditt resultat andras resultat? Motsäger andras resultat varandra? I så fall, vems resultat är mest tillförlitlig, ditt eller deras? Varför? Här gäller det att argumentera på ett sakligt sätt, så att du kan presentera hållbar fakta som stödjer din slutsats. Om du inte kan göra det så måste du vara ärlig och erkänna det, och i stället redogöra för hur man kunde ha gått vidare med undersökningen för att göra den noggrannare. Tänk på att inget resultat också är ett resultat; det vill säga det är också intressant att visa att en viss undersökningsmetod inte är lämplig för att studera en viss frågeställning.
Var noga med att inte dra slutsatser som saknar stöd från ditt eget resultat eller källor. Om du använder dig av resultat från en annan källa måste du ange korrekt källhänvisning till den. Om du gör påståenden som baserar sig på spekulationer och inte fakta är det viktigt att det framgår tydligt. 
Diskussionsavsnittet är den del av rapporten där du kan uttrycka egna åsikter eller kommentera det som lyfts i rapporten. Tänk dock hela tiden på att dina påståenden måste ha stöd från källorna eller säker fakta; det vill säga, i resultatet och analysen av dem.

7 Slutsats
Algoritm X fungerade mest effektivt i de flesta fall när det gäller längre listor. Algoritm Y fungerade mest effektivt i de flesta fall när det gäller kortare listor.
Detta avsnitt ska hållas kort och bara bestå av ett sammanfattat svar utifrån vad som sagts i 6. Diskussion. Detta blir alltså dels en sammanfattning av analysen av resultatet, dels ett svar på frågeställningen. Syftet med detta avsnitt är att en läsare enkelt ska kunna hitta och förstå din slutsats utan att behöva läsa igenom hela diskussionsavsnittet.
När du skriver din slutsats är det viktigt att du formulerar den så att den svarar på just rapportens frågeställning. Om den inte gör det behöver du revidera din frågeställning. Tänk också på att vara tydlig med hur pass tillförlitliga du anser att dina slutsatser är med tanke på dina felkällor.
Tänk på att en läsare ska kunna läsa enbart inledning, frågeställning och slutsats för att få en bild av vad du har undersökt och vilket svar du har kommit fram till. Inledning, frågeställning och slutsats ska alltså kunna stå för sig själva.
Källförteckning
International Energy Agency. (2023-07-11). Data Centres and Data Transmission Networks. https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks, [2023-11-03].
Wikipedia. (2023-10-30). Big O notation. https://en.wikipedia.org/wiki/Big_O_notation#cite_note-quantumcomplexity, [2023-11-03].
Yash, Chauhan & Anuj Duggal. (2020). Different Sorting Algorithms comparison based upon the Time Complexity. IJRAR. 7:3. s.1.
Wikipedia. (2022-12-03). Internal sort. https://en.wikipedia.org/wiki/Internal_sort, [2023-11-09].
Wikipedia. (2023-03-13). External sort. https://en.wikipedia.org/wiki/External_sorting, [2023-11-09].
Wikipedia. (2023-11-03). Introsort. https://en.wikipedia.org/wiki/Introsort, [2023-11-09].
Wikipedia. (2023-11-08). Integer sorting. https://en.wikipedia.org/wiki/Integer_sorting, [2023-11-09].
Wikipedia. (2023-11-01). Comparison sort. https://en.wikipedia.org/wiki/Comparison_sort, [2023-11-09].
Wikipedia. (2023-11-03). Sorting algorithm. https://en.wikipedia.org/wiki/Sorting_algorithm, [2023-11-22]
Wikipedia. (2023-10-25). Central limit theorem. https://en.wikipedia.org/wiki/Central_limit_theorem, [2023-11-03].
Wikipedia. (2023-11-11). Law of large numbers. https://en.wikipedia.org/wiki/Law_of_large_numbers, [2023-11-19].
Bilagor
Lägg till all data som jag fick.
https://github.com/viggoStrom/SortingGA (gör offentlig innan du lämnar in)

import * as tf from "@tensorflow/tfjs"
import * as fs from "fs"

// const listLength: number = 1000
// const list: tf.Tensor = tf.randomNormal([listLength])
// const max: number = tf.argMax(list).dataSync()[0]
// const min: number = tf.argMin(list).dataSync()[0]
// const span: number = max - min
// const values: number[] = new Array(40)

// for (let index = 0; index < listLength; index++) {
// if () {

// }
// }

// const map: string[] = [ // ▮
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
//     "▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯▯",
// ]

const addLeadingZeros = (binaryString: string): string => {
    if (binaryString === "0") {
        return "00000000"
    } else {
        return binaryString.replace(/^0*/, "0".repeat(8 - binaryString.length));
    }
}

const bitmap: string[] = fs.readFileSync("./graphs/normalDist.bmp", "binary").split("")
const bitmapLength: number = bitmap.length
for (let index = 0; index < bitmapLength; index++) {

    const bin: string = bitmap[index].charCodeAt(0).toString(2)
    if (bin !== "11111111") {
        const row: string = `${index} ${bitmap[index]} ${addLeadingZeros(bin)}`
        console.log(row);
    }
    // fs.appendFileSync("./outputs/binOut.txt", addLeadingZeros(bin) + "\n", "binary")
}

// const fileRows = fs.readFileSync("./outputs/binOut.txt", "binary").split("\n")

// fileRows.forEach((row, index) => {
//     const [base, middle, topLeft, bottomRight] = row.split("  ")
//     if (base !== bottomRight) {
//         console.log(index, row);
//     }
// })



