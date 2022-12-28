---
title: GraphQL - Vector search parameters
sidebar_position: 5
# layout: layout-documentation
# solution: weaviate
# sub-menu: GraphQL references
# title: Vector search parameters
# intro: ​Vector search parameters allow you to conduct specific vector search operations. Some are built into Weaviate directly, and others are enabled through Weaviate modules.
# description: GraphQL search parameters
# tags: ['graphql', 'vector search parameters']
# sidebar_position: 5
# open-graph-type: article
# toc: true
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Setting search parameters

Vector search parameters are added to GraphQL queries on the class level.

For example:

import GraphQLFiltersExample from '/_includes/code/graphql.filters.example.mdx';

<GraphQLFiltersExample/>

## Built-in parameters

B​uilt-in search parameters are available in all Weaviate instances and don't require any modules.​

### nearVector

This filter allows you to find data objects in the vicinity of an input vector. It's supported by the `Get{}` function.

* Note: this argument is different from the [GraphQL `Explore{}` function](./explore.md) )
* Note: Cannot use multiple `'near'` arguments, or a `'near'` argument along with an [`'ask'`](/docs/weaviate/modules/reader-generator-modules/qna-transformers.md) filter

#### Variables

| Variables | Mandatory | Type | Description |
| --- | --- | --- | --- |
| `vector` | yes | `[float]` | This variable takes a vector embedding in the form of an array of floats. The array should have the same length as the vectors in this class. |
| `distance` | no | `float` | The required degree of similarity between an object's characteristics and the provided filter values. Can't be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/docs/weaviate/configuration/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).. Can't be used together with the `distance` variable. |

#### Example

import GraphQLFiltersNearVector from '/_includes/code/graphql.filters.nearVector.mdx';

<GraphQLFiltersNearVector/>

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0A%20%20Get%7B%0A%20%20%20%20Publication%28%0A%20%20%20%20%20%20nearVector%3A%20%7B%0A%20%20%20%20%20%20%20%20vector%3A%20%5B-0.23465763%2C0.17979929%2C0.102799274%2C0.024113754%2C0.028255954%2C0.027368147%2C0.05160567%2C0.044174556%2C-0.37165773%2C-0.17372784%2C0.06370711%2C-0.014063497%2C-0.007861198%2C0.33682644%2C0.11614874%2C0.18399939%2C0.31976607%2C0.07835108%2C-0.098653905%2C-0.03590513%2C-0.06187989%2C0.09194802%2C-0.04729259%2C-0.11346251%2C-0.3803298%2C-0.10139798%2C0.119549245%2C0.11505816%2C0.23455755%2C0.09849567%2C0.01249316%2C-0.05364768%2C-0.040253654%2C0.18844208%2C0.050965175%2C0.07916835%2C-0.012258343%2C0.0671034%2C-0.054112636%2C0.04180599%2C0.092125595%2C-0.018237045%2C-0.22897908%2C0.02750451%2C-0.2790535%2C-0.3441088%2C-0.058022186%2C0.049728215%2C-0.12160574%2C0.2205436%2C0.037941944%2C0.08513926%2C0.122934945%2C0.09057151%2C-0.038932543%2C-0.03429459%2C-0.08880545%2C-0.25762177%2C-0.16863364%2C-0.059970103%2C0.14436457%2C0.17749363%2C0.22366543%2C-0.012577283%2C-0.19367333%2C-0.020099051%2C0.08746966%2C-0.090860695%2C-0.079980455%2C-0.12675235%2C0.08376062%2C0.0903464%2C-0.00061829574%2C0.13518003%2C0.025386855%2C-0.012249976%2C0.046253454%2C0.03561518%2C-0.19014797%2C0.01390166%2C0.090683326%2C-0.06893731%2C-0.094287015%2C0.07015253%2C-0.23144877%2C0.29581574%2C0.05523665%2C0.112800926%2C-0.18251088%2C0.008940386%2C0.2676646%2C-0.03692727%2C0.06238877%2C-0.14202276%2C-0.08937121%2C0.05693051%2C-0.0432525%2C0.18392386%2C-0.06341782%2C-0.12967975%2C-0.35598278%2C-0.0023491327%2C-0.06266682%2C0.009586824%2C0.077612974%2C-0.21517417%2C-0.09696568%2C0.036491744%2C-0.02124694%2C-0.12933266%2C0.113069154%2C0.064186916%2C0.109830804%2C0.19753163%2C-0.0865918%2C0.099933594%2C0.073294%2C0.021562478%2C-0.09796098%2C0.11724932%2C0.21206819%2C-0.09595199%2C-0.032359455%2C-0.07369516%2C-0.0032142093%2C0.16771081%2C-0.21079993%2C0.13013682%2C0.020967718%2C0.0051083555%2C0.0034307502%2C0.087087154%2C-0.030605571%2C-0.009762479%2C-0.04826925%2C0.135053%2C-0.06856737%2C-0.036154717%2C0.07328842%2C0.08172625%2C-0.010930129%2C-0.019117197%2C0.027507683%2C-0.042174876%2C-0.122324735%2C-0.059549067%2C-0.05604652%2C0.28068227%2C0.061018653%2C0.03457643%2C0.067162685%2C0.017143786%2C0.026661776%2C0.0090041235%2C-0.04096501%2C0.030862%2C0.32934877%2C0.16742821%2C-0.0039201444%2C0.021448493%2C0.053120323%2C-0.063359454%2C-0.1641798%2C0.18127228%2C0.07749719%2C0.20283675%2C-0.11017373%2C-0.107470766%2C0.015754933%2C-0.043649945%2C0.16548371%2C-0.25340077%2C-0.018367544%2C0.027777113%2C0.113526076%2C-0.18193291%2C0.044229295%2C0.110506475%2C-0.058374397%2C-0.097559266%2C-0.2719125%2C0.19185185%2C0.06707544%2C0.22687668%2C-0.16616467%2C-0.034963913%2C0.20147288%2C0.08696243%2C0.037441466%2C0.023626866%2C0.049714584%2C0.0965035%2C0.07282559%2C0.0440484%2C-0.0645741%2C0.057806853%2C-0.1274356%2C-0.06270439%2C0.00849327%2C0.113322705%2C0.006761973%2C-0.05550707%2C-0.055237696%2C-0.12199958%2C0.011936213%2C-0.016280506%2C-0.18963426%2C-0.114819944%2C0.0605402%2C0.07305948%2C0.42009065%2C-0.04713229%2C-0.13189736%2C0.056811567%2C0.07452918%2C-0.033649046%2C0.12336579%2C0.2777558%2C-0.07795057%2C0.17896728%2C-0.17787835%2C0.37503108%2C-0.1261996%2C-0.09618712%2C0.071471915%2C-0.0067055803%2C0.05865556%2C-0.0024448698%2C0.016127113%2C0.025038403%2C0.19005394%2C-0.04669397%2C0.12561052%2C0.0966604%2C0.07671112%2C0.11160054%2C-0.016865058%2C0.10937623%2C0.10490088%2C-0.1851902%2C-0.21393222%2C0.16733423%2C-0.016179845%2C0.12150621%2C0.1316216%2C-0.11354348%2C0.10850461%2C-0.072117805%2C-0.026643105%2C0.061819315%2C-0.20617527%2C0.076222524%2C0.12505898%2C-0.033876866%2C0.096771985%2C0.0017282967%2C-0.16708866%2C0.010973749%2C-0.05297373%2C0.1574822%2C-0.06757769%2C-0.04683279%2C0.06375807%2C0.0088846%2C-0.13538598%2C-0.084824845%2C0.068975314%2C0.33688343%2C0.20711815%2C-0.043730423%2C-0.072583824%2C0.04977499%2C-0.17070043%2C-0.07051943%2C0.021004502%2C-0.03730134%2C-0.21386296%2C-0.053417273%2C-0.1673489%2C0.026971681%2C-0.06328513%2C-0.15684208%2C0.012555064%2C-0.04434634%2C-0.12287592%2C-0.18033288%2C-0.08037485%2C-0.23065373%2C-0.043814242%2C0.25294116%2C0.028202772%2C-0.12566684%2C-0.024512842%2C-0.014470105%2C0.13780904%2C-0.077516556%2C-0.23391989%2C-0.08482521%2C-0.010969244%2C0.3326309%2C-0.009098832%2C0.10228478%2C-0.04993008%2C-0.016812975%2C-0.103875265%2C-0.02068389%2C-0.12670788%2C-0.024401654%2C0.07415338%2C-0.11476372%2C0.18051672%2C-0.053926274%2C-0.057002045%2C0.212168%2C-0.14792497%2C0.113478884%2C0.14276274%2C0.05609845%2C0.014511127%2C0.16792081%2C0.18126106%2C0.001699484%2C-0.045843486%2C0.019494196%2C0.06698305%2C-0.13571832%2C0.055380456%2C0.024890993%2C0.0439167%2C-0.22175919%2C-0.033260856%2C0.026795506%2C-0.012411%2C-0.13519171%2C-0.09366397%2C0.099667564%2C0.07607931%2C0.34444964%2C-0.06121245%2C0.02994556%2C-0.05987379%2C0.028532853%2C0.15583034%2C-0.07173464%2C-0.16250613%2C-0.03735872%2C0.12899329%2C-0.06963391%2C-0.12464738%2C-0.003398872%2C0.01928471%2C-0.04379806%2C-0.017325576%2C-0.07278164%2C0.06282024%2C-0.0100141885%2C-0.13836662%2C-0.086074606%2C-0.04928808%2C0.10639307%2C-0.015313828%2C0.027083673%2C0.07370242%2C0.088965744%2C-0.14360012%2C0.012048652%2C-0.100931644%2C0.10895235%2C-0.050664075%2C-0.025369175%2C0.1658789%2C0.037601925%2C0.21811733%2C-0.063603476%2C-0.08376581%2C0.137202%2C0.009401917%2C-0.045291744%2C-0.1512802%2C-0.025105534%2C0.07110933%2C-0.35801277%2C0.20491669%2C-0.03635557%2C-0.02195874%2C0.11570546%2C-0.04557519%2C-0.013054491%2C-0.18375936%2C-0.07126909%2C-0.08992924%2C-0.14313167%2C0.000055442564%2C-0.1726888%2C0.067026064%2C-0.18438172%2C-0.012237902%2C-0.03082749%2C-0.07132076%2C-0.07292381%2C-0.009753299%2C0.23502126%2C-0.093918204%2C-0.023575446%2C0.083127365%2C0.0108186%2C0.07566714%2C0.006115687%2C-0.13677943%2C-0.3294332%2C-0.10151925%2C-0.133713%2C-0.043996178%2C-0.025704846%2C0.09658231%2C-0.1521731%2C-0.03620415%2C-0.1182407%2C0.045563802%2C0.06867553%2C0.047214612%2C-0.059277043%2C-0.070367694%2C-0.052436374%2C-0.03402625%2C-0.14968148%2C0.093308404%2C0.07272077%2C0.10590238%2C-0.06045601%2C0.02874743%2C0.20087448%2C-0.059354134%2C0.075395405%2C0.051043946%2C-0.030768977%2C0.016028143%2C0.10692045%2C-0.11002893%2C-0.09673653%2C0.049469613%2C0.041776117%2C0.16689134%2C-0.21752623%2C-0.19430524%2C-0.12307017%2C0.043573726%2C-0.048717104%2C0.04465528%2C0.13443576%2C-0.12346366%2C-0.011959422%2C-0.16607215%2C0.0018878467%2C0.13503549%2C-0.023593955%2C0.28526396%2C0.00063936226%2C0.08890096%2C-0.1582424%2C-0.12614277%2C0.605354%2C0.022748979%2C0.07435266%2C0.14555922%2C-0.004281237%2C0.1637888%2C-0.21018502%2C-0.0789703%2C0.09784391%2C-0.06461661%2C0.038825393%2C-0.11709451%2C-0.02530866%2C0.0065722%2C0.04326789%2C-0.075842716%2C-0.3116881%2C-0.039845794%2C0.054108217%2C0.0985363%2C0.015000608%2C-0.007967957%2C-0.088186085%2C0.06138216%2C-0.08127389%2C0.01570968%2C-0.016085781%2C0.21098772%2C0.038870648%2C-0.07691855%2C-0.086050354%2C0.07641947%2C0.02579334%2C-0.17190132%2C0.0992676%2C-0.08618325%2C0.05433204%2C-0.08881177%2C-0.06658524%2C-0.19849047%2C-0.11686146%2C0.009849584%2C0.10218163%2C-0.012717381%2C0.08553991%2C-0.018123155%2C-0.045293525%2C0.026818573%2C-0.11323824%2C0.14800489%2C-0.11361582%2C-0.074924506%2C-0.12954782%2C0.018139653%2C0.20968463%2C0.12987098%2C0.13087825%2C0.19959521%2C0.054626856%2C0.08166587%2C0.1935697%2C-0.03500442%2C0.14532338%2C0.0026432252%2C0.06321498%2C0.037508067%2C-0.03933152%2C0.05270709%2C0.0048466437%2C0.14209333%2C-0.048704967%2C0.062610336%2C-0.002316019%2C-0.08442129%2C-0.0023012161%2C0.15175562%2C0.045703776%2C-0.12891865%2C0.032947607%2C0.010447428%2C0.054664463%2C0.21886581%2C-0.10746093%2C0.23723373%2C0.0032382086%2C0.042789146%2C0.28078836%2C0.01577283%2C-0.0059065185%2C-0.06500554%2C-0.024099294%2C-0.09003623%2C0.015527177%2C0.11270352%2C-0.047571227%2C-0.031762563%2C0.08175194%2C0.06570573%2C-0.017216744%2C-0.017516207%2C0.06985715%2C0.04550825%2C-0.024760865%2C-0.12943135%2C-0.004374942%2C0.018212453%2C0.15515165%2C0.06205265%2C0.07773018%2C-0.13690233%2C-0.14280525%2C0.07745191%2C-0.18464002%2C0.12081312%2C-0.026572619%2C0.020704217%2C0.058941066%2C0.051170163%2C-0.013110386%2C-0.03357399%2C0.009641135%2C-0.15939642%2C-0.15717936%2C-0.05750653%2C-0.07251076%2C0.06520609%2C-0.037277523%2C0.02285239%2C-0.22244416%2C0.0654858%2C0.21554282%2C0.059626978%2C-0.081284%2C0.07179128%2C-0.152839%2C0.13677043%2C0.048378944%2C0.13458024%2C0.13931236%2C-0.076032534%2C-0.038226645%2C0.055144362%2C-0.08410028%2C-0.115194306%2C-0.048347984%2C0.06564306%2C0.05905451%2C-0.031956047%2C-0.022075457%2C-0.07168111%2C-0.14497352%2C-0.018555913%2C-0.20753776%2C-0.18044674%2C0.028881893%2C-0.1325844%2C0.13116214%2C0.04691655%2C-0.23364337%2C-0.11188713%2C-0.13637887%2C-0.016772587%2C0.22563687%2C-0.033255585%2C0.18282045%2C0.04078422%2C0.07255135%2C-0.021764483%2C0.2107%2C-0.22811268%2C-0.20520219%2C-0.122624695%2C-0.075651444%2C-0.017318744%2C0.092903495%2C0.102291435%2C-0.09432292%2C0.10696524%2C0.11473412%2C-0.04533612%2C-0.043883137%2C-0.0012241001%2C-0.09604044%2C-0.12196341%2C-0.011742681%2C-0.094535545%2C0.24636087%2C-0.011901259%2C-0.045293164%2C0.078836195%2C0.3076279%2C-0.0030795278%2C0.13073339%2C-0.054781057%2C0.022838669%2C-0.047530524%2C0.18570168%2C0.05688159%2C0.11852153%2C0.17682163%2C0.082003936%2C0.07978268%2C0.0034061046%2C-0.09435686%2C-0.008865017%2C0.017782282%2C0.20146354%2C-0.04896053%2C-0.101671904%2C0.14009666%2C-0.024583366%2C0.036193445%2C-0.1820283%2C0.11522126%2C0.044222895%2C-0.15434028%2C0.03421437%2C-0.24441665%2C0.09539177%2C-0.20637691%2C-0.013288546%2C-0.0908784%2C-0.020693514%2C0.25038427%2C-0.07887416%2C0.08126651%2C-0.08605219%2C-0.009043915%2C-0.049351137%2C-0.020553615%2C0.0058903676%2C0.0020338092%2C-0.032364827%2C-0.11840828%2C0.19374238%2C0.121487685%2C-0.075439855%2C-0.3790606%2C-0.13741675%2C0.0687274%2C0.10233968%2C0.019255105%2C0.17166223%2C-0.076944485%2C-0.27786955%2C0.052569695%2C-0.008112809%2C0.00905671%2C-0.018261207%2C0.02456199%2C0.01319736%2C-0.029943712%2C0.023340277%2C0.0831485%2C-0.08815096%2C0.19995248%2C-0.26680195%2C-0.06844357%2C-0.27540848%2C-0.04463947%2C-0.058132604%2C0.06350815%2C0.033096854%2C0.013701245%2C-0.08375896%2C0.052284367%2C0.095668085%2C-0.05824688%2C-0.085416846%2C-0.002367309%2C0.07347369%2C-0.008068767%2C0.19756658%2C-0.0045130225%2C-0.009136167%2C-0.24484903%2C-0.079925045%2C0.16070287%2C0.0761349%2C0.17387088%2C0.047619935%2C0.21801475%2C-0.03402488%2C0.014446441%2C0.055997074%2C-0.038093414%2C0.04919812%2C0.15207188%2C-0.0759414%2C-0.039339487%2C0.1197402%2C-0.24078262%2C0.21332002%2C0.18520337%2C-0.035598926%2C-0.16920975%2C-0.06034118%2C0.22399509%2C-0.07997291%2C0.004313186%2C-0.06332217%2C0.07368236%2C-0.12980051%2C-0.020264369%2C0.025797214%2C0.014003551%2C-0.08809432%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%29%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0A%20%20Get%7B%0A%20%20%20%20Publication%28%0A%20%20%20%20%20%20nearVector%3A%20%7B%0A%20%20%20%20%20%20%20%20vector%3A%20%5B-0.23465763%2C0.17979929%2C0.102799274%2C0.024113754%2C0.028255954%2C0.027368147%2C0.05160567%2C0.044174556%2C-0.37165773%2C-0.17372784%2C0.06370711%2C-0.014063497%2C-0.007861198%2C0.33682644%2C0.11614874%2C0.18399939%2C0.31976607%2C0.07835108%2C-0.098653905%2C-0.03590513%2C-0.06187989%2C0.09194802%2C-0.04729259%2C-0.11346251%2C-0.3803298%2C-0.10139798%2C0.119549245%2C0.11505816%2C0.23455755%2C0.09849567%2C0.01249316%2C-0.05364768%2C-0.040253654%2C0.18844208%2C0.050965175%2C0.07916835%2C-0.012258343%2C0.0671034%2C-0.054112636%2C0.04180599%2C0.092125595%2C-0.018237045%2C-0.22897908%2C0.02750451%2C-0.2790535%2C-0.3441088%2C-0.058022186%2C0.049728215%2C-0.12160574%2C0.2205436%2C0.037941944%2C0.08513926%2C0.122934945%2C0.09057151%2C-0.038932543%2C-0.03429459%2C-0.08880545%2C-0.25762177%2C-0.16863364%2C-0.059970103%2C0.14436457%2C0.17749363%2C0.22366543%2C-0.012577283%2C-0.19367333%2C-0.020099051%2C0.08746966%2C-0.090860695%2C-0.079980455%2C-0.12675235%2C0.08376062%2C0.0903464%2C-0.00061829574%2C0.13518003%2C0.025386855%2C-0.012249976%2C0.046253454%2C0.03561518%2C-0.19014797%2C0.01390166%2C0.090683326%2C-0.06893731%2C-0.094287015%2C0.07015253%2C-0.23144877%2C0.29581574%2C0.05523665%2C0.112800926%2C-0.18251088%2C0.008940386%2C0.2676646%2C-0.03692727%2C0.06238877%2C-0.14202276%2C-0.08937121%2C0.05693051%2C-0.0432525%2C0.18392386%2C-0.06341782%2C-0.12967975%2C-0.35598278%2C-0.0023491327%2C-0.06266682%2C0.009586824%2C0.077612974%2C-0.21517417%2C-0.09696568%2C0.036491744%2C-0.02124694%2C-0.12933266%2C0.113069154%2C0.064186916%2C0.109830804%2C0.19753163%2C-0.0865918%2C0.099933594%2C0.073294%2C0.021562478%2C-0.09796098%2C0.11724932%2C0.21206819%2C-0.09595199%2C-0.032359455%2C-0.07369516%2C-0.0032142093%2C0.16771081%2C-0.21079993%2C0.13013682%2C0.020967718%2C0.0051083555%2C0.0034307502%2C0.087087154%2C-0.030605571%2C-0.009762479%2C-0.04826925%2C0.135053%2C-0.06856737%2C-0.036154717%2C0.07328842%2C0.08172625%2C-0.010930129%2C-0.019117197%2C0.027507683%2C-0.042174876%2C-0.122324735%2C-0.059549067%2C-0.05604652%2C0.28068227%2C0.061018653%2C0.03457643%2C0.067162685%2C0.017143786%2C0.026661776%2C0.0090041235%2C-0.04096501%2C0.030862%2C0.32934877%2C0.16742821%2C-0.0039201444%2C0.021448493%2C0.053120323%2C-0.063359454%2C-0.1641798%2C0.18127228%2C0.07749719%2C0.20283675%2C-0.11017373%2C-0.107470766%2C0.015754933%2C-0.043649945%2C0.16548371%2C-0.25340077%2C-0.018367544%2C0.027777113%2C0.113526076%2C-0.18193291%2C0.044229295%2C0.110506475%2C-0.058374397%2C-0.097559266%2C-0.2719125%2C0.19185185%2C0.06707544%2C0.22687668%2C-0.16616467%2C-0.034963913%2C0.20147288%2C0.08696243%2C0.037441466%2C0.023626866%2C0.049714584%2C0.0965035%2C0.07282559%2C0.0440484%2C-0.0645741%2C0.057806853%2C-0.1274356%2C-0.06270439%2C0.00849327%2C0.113322705%2C0.006761973%2C-0.05550707%2C-0.055237696%2C-0.12199958%2C0.011936213%2C-0.016280506%2C-0.18963426%2C-0.114819944%2C0.0605402%2C0.07305948%2C0.42009065%2C-0.04713229%2C-0.13189736%2C0.056811567%2C0.07452918%2C-0.033649046%2C0.12336579%2C0.2777558%2C-0.07795057%2C0.17896728%2C-0.17787835%2C0.37503108%2C-0.1261996%2C-0.09618712%2C0.071471915%2C-0.0067055803%2C0.05865556%2C-0.0024448698%2C0.016127113%2C0.025038403%2C0.19005394%2C-0.04669397%2C0.12561052%2C0.0966604%2C0.07671112%2C0.11160054%2C-0.016865058%2C0.10937623%2C0.10490088%2C-0.1851902%2C-0.21393222%2C0.16733423%2C-0.016179845%2C0.12150621%2C0.1316216%2C-0.11354348%2C0.10850461%2C-0.072117805%2C-0.026643105%2C0.061819315%2C-0.20617527%2C0.076222524%2C0.12505898%2C-0.033876866%2C0.096771985%2C0.0017282967%2C-0.16708866%2C0.010973749%2C-0.05297373%2C0.1574822%2C-0.06757769%2C-0.04683279%2C0.06375807%2C0.0088846%2C-0.13538598%2C-0.084824845%2C0.068975314%2C0.33688343%2C0.20711815%2C-0.043730423%2C-0.072583824%2C0.04977499%2C-0.17070043%2C-0.07051943%2C0.021004502%2C-0.03730134%2C-0.21386296%2C-0.053417273%2C-0.1673489%2C0.026971681%2C-0.06328513%2C-0.15684208%2C0.012555064%2C-0.04434634%2C-0.12287592%2C-0.18033288%2C-0.08037485%2C-0.23065373%2C-0.043814242%2C0.25294116%2C0.028202772%2C-0.12566684%2C-0.024512842%2C-0.014470105%2C0.13780904%2C-0.077516556%2C-0.23391989%2C-0.08482521%2C-0.010969244%2C0.3326309%2C-0.009098832%2C0.10228478%2C-0.04993008%2C-0.016812975%2C-0.103875265%2C-0.02068389%2C-0.12670788%2C-0.024401654%2C0.07415338%2C-0.11476372%2C0.18051672%2C-0.053926274%2C-0.057002045%2C0.212168%2C-0.14792497%2C0.113478884%2C0.14276274%2C0.05609845%2C0.014511127%2C0.16792081%2C0.18126106%2C0.001699484%2C-0.045843486%2C0.019494196%2C0.06698305%2C-0.13571832%2C0.055380456%2C0.024890993%2C0.0439167%2C-0.22175919%2C-0.033260856%2C0.026795506%2C-0.012411%2C-0.13519171%2C-0.09366397%2C0.099667564%2C0.07607931%2C0.34444964%2C-0.06121245%2C0.02994556%2C-0.05987379%2C0.028532853%2C0.15583034%2C-0.07173464%2C-0.16250613%2C-0.03735872%2C0.12899329%2C-0.06963391%2C-0.12464738%2C-0.003398872%2C0.01928471%2C-0.04379806%2C-0.017325576%2C-0.07278164%2C0.06282024%2C-0.0100141885%2C-0.13836662%2C-0.086074606%2C-0.04928808%2C0.10639307%2C-0.015313828%2C0.027083673%2C0.07370242%2C0.088965744%2C-0.14360012%2C0.012048652%2C-0.100931644%2C0.10895235%2C-0.050664075%2C-0.025369175%2C0.1658789%2C0.037601925%2C0.21811733%2C-0.063603476%2C-0.08376581%2C0.137202%2C0.009401917%2C-0.045291744%2C-0.1512802%2C-0.025105534%2C0.07110933%2C-0.35801277%2C0.20491669%2C-0.03635557%2C-0.02195874%2C0.11570546%2C-0.04557519%2C-0.013054491%2C-0.18375936%2C-0.07126909%2C-0.08992924%2C-0.14313167%2C0.000055442564%2C-0.1726888%2C0.067026064%2C-0.18438172%2C-0.012237902%2C-0.03082749%2C-0.07132076%2C-0.07292381%2C-0.009753299%2C0.23502126%2C-0.093918204%2C-0.023575446%2C0.083127365%2C0.0108186%2C0.07566714%2C0.006115687%2C-0.13677943%2C-0.3294332%2C-0.10151925%2C-0.133713%2C-0.043996178%2C-0.025704846%2C0.09658231%2C-0.1521731%2C-0.03620415%2C-0.1182407%2C0.045563802%2C0.06867553%2C0.047214612%2C-0.059277043%2C-0.070367694%2C-0.052436374%2C-0.03402625%2C-0.14968148%2C0.093308404%2C0.07272077%2C0.10590238%2C-0.06045601%2C0.02874743%2C0.20087448%2C-0.059354134%2C0.075395405%2C0.051043946%2C-0.030768977%2C0.016028143%2C0.10692045%2C-0.11002893%2C-0.09673653%2C0.049469613%2C0.041776117%2C0.16689134%2C-0.21752623%2C-0.19430524%2C-0.12307017%2C0.043573726%2C-0.048717104%2C0.04465528%2C0.13443576%2C-0.12346366%2C-0.011959422%2C-0.16607215%2C0.0018878467%2C0.13503549%2C-0.023593955%2C0.28526396%2C0.00063936226%2C0.08890096%2C-0.1582424%2C-0.12614277%2C0.605354%2C0.022748979%2C0.07435266%2C0.14555922%2C-0.004281237%2C0.1637888%2C-0.21018502%2C-0.0789703%2C0.09784391%2C-0.06461661%2C0.038825393%2C-0.11709451%2C-0.02530866%2C0.0065722%2C0.04326789%2C-0.075842716%2C-0.3116881%2C-0.039845794%2C0.054108217%2C0.0985363%2C0.015000608%2C-0.007967957%2C-0.088186085%2C0.06138216%2C-0.08127389%2C0.01570968%2C-0.016085781%2C0.21098772%2C0.038870648%2C-0.07691855%2C-0.086050354%2C0.07641947%2C0.02579334%2C-0.17190132%2C0.0992676%2C-0.08618325%2C0.05433204%2C-0.08881177%2C-0.06658524%2C-0.19849047%2C-0.11686146%2C0.009849584%2C0.10218163%2C-0.012717381%2C0.08553991%2C-0.018123155%2C-0.045293525%2C0.026818573%2C-0.11323824%2C0.14800489%2C-0.11361582%2C-0.074924506%2C-0.12954782%2C0.018139653%2C0.20968463%2C0.12987098%2C0.13087825%2C0.19959521%2C0.054626856%2C0.08166587%2C0.1935697%2C-0.03500442%2C0.14532338%2C0.0026432252%2C0.06321498%2C0.037508067%2C-0.03933152%2C0.05270709%2C0.0048466437%2C0.14209333%2C-0.048704967%2C0.062610336%2C-0.002316019%2C-0.08442129%2C-0.0023012161%2C0.15175562%2C0.045703776%2C-0.12891865%2C0.032947607%2C0.010447428%2C0.054664463%2C0.21886581%2C-0.10746093%2C0.23723373%2C0.0032382086%2C0.042789146%2C0.28078836%2C0.01577283%2C-0.0059065185%2C-0.06500554%2C-0.024099294%2C-0.09003623%2C0.015527177%2C0.11270352%2C-0.047571227%2C-0.031762563%2C0.08175194%2C0.06570573%2C-0.017216744%2C-0.017516207%2C0.06985715%2C0.04550825%2C-0.024760865%2C-0.12943135%2C-0.004374942%2C0.018212453%2C0.15515165%2C0.06205265%2C0.07773018%2C-0.13690233%2C-0.14280525%2C0.07745191%2C-0.18464002%2C0.12081312%2C-0.026572619%2C0.020704217%2C0.058941066%2C0.051170163%2C-0.013110386%2C-0.03357399%2C0.009641135%2C-0.15939642%2C-0.15717936%2C-0.05750653%2C-0.07251076%2C0.06520609%2C-0.037277523%2C0.02285239%2C-0.22244416%2C0.0654858%2C0.21554282%2C0.059626978%2C-0.081284%2C0.07179128%2C-0.152839%2C0.13677043%2C0.048378944%2C0.13458024%2C0.13931236%2C-0.076032534%2C-0.038226645%2C0.055144362%2C-0.08410028%2C-0.115194306%2C-0.048347984%2C0.06564306%2C0.05905451%2C-0.031956047%2C-0.022075457%2C-0.07168111%2C-0.14497352%2C-0.018555913%2C-0.20753776%2C-0.18044674%2C0.028881893%2C-0.1325844%2C0.13116214%2C0.04691655%2C-0.23364337%2C-0.11188713%2C-0.13637887%2C-0.016772587%2C0.22563687%2C-0.033255585%2C0.18282045%2C0.04078422%2C0.07255135%2C-0.021764483%2C0.2107%2C-0.22811268%2C-0.20520219%2C-0.122624695%2C-0.075651444%2C-0.017318744%2C0.092903495%2C0.102291435%2C-0.09432292%2C0.10696524%2C0.11473412%2C-0.04533612%2C-0.043883137%2C-0.0012241001%2C-0.09604044%2C-0.12196341%2C-0.011742681%2C-0.094535545%2C0.24636087%2C-0.011901259%2C-0.045293164%2C0.078836195%2C0.3076279%2C-0.0030795278%2C0.13073339%2C-0.054781057%2C0.022838669%2C-0.047530524%2C0.18570168%2C0.05688159%2C0.11852153%2C0.17682163%2C0.082003936%2C0.07978268%2C0.0034061046%2C-0.09435686%2C-0.008865017%2C0.017782282%2C0.20146354%2C-0.04896053%2C-0.101671904%2C0.14009666%2C-0.024583366%2C0.036193445%2C-0.1820283%2C0.11522126%2C0.044222895%2C-0.15434028%2C0.03421437%2C-0.24441665%2C0.09539177%2C-0.20637691%2C-0.013288546%2C-0.0908784%2C-0.020693514%2C0.25038427%2C-0.07887416%2C0.08126651%2C-0.08605219%2C-0.009043915%2C-0.049351137%2C-0.020553615%2C0.0058903676%2C0.0020338092%2C-0.032364827%2C-0.11840828%2C0.19374238%2C0.121487685%2C-0.075439855%2C-0.3790606%2C-0.13741675%2C0.0687274%2C0.10233968%2C0.019255105%2C0.17166223%2C-0.076944485%2C-0.27786955%2C0.052569695%2C-0.008112809%2C0.00905671%2C-0.018261207%2C0.02456199%2C0.01319736%2C-0.029943712%2C0.023340277%2C0.0831485%2C-0.08815096%2C0.19995248%2C-0.26680195%2C-0.06844357%2C-0.27540848%2C-0.04463947%2C-0.058132604%2C0.06350815%2C0.033096854%2C0.013701245%2C-0.08375896%2C0.052284367%2C0.095668085%2C-0.05824688%2C-0.085416846%2C-0.002367309%2C0.07347369%2C-0.008068767%2C0.19756658%2C-0.0045130225%2C-0.009136167%2C-0.24484903%2C-0.079925045%2C0.16070287%2C0.0761349%2C0.17387088%2C0.047619935%2C0.21801475%2C-0.03402488%2C0.014446441%2C0.055997074%2C-0.038093414%2C0.04919812%2C0.15207188%2C-0.0759414%2C-0.039339487%2C0.1197402%2C-0.24078262%2C0.21332002%2C0.18520337%2C-0.035598926%2C-0.16920975%2C-0.06034118%2C0.22399509%2C-0.07997291%2C0.004313186%2C-0.06332217%2C0.07368236%2C-0.12980051%2C-0.020264369%2C0.025797214%2C0.014003551%2C-0.08809432%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%29%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %} -->

### Additional information

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

### nearObject

This filter allows you to find data objects in the vicinity of other data objects by UUID. It's supported by the `Get{}` function.

* Note: You cannot use multiple `near<Media>` arguments, or a `near<Media>` argument along with an [`ask`](/docs/weaviate/modules/reader-generator-modules/qna-transformers.md) argument.
* Note: You can specify an object's `id` or `beacon` in the argument, along with a desired `certainty`.
* Note that the first result will always be the object in the filter itself.
* Near object search can also be combined with `text2vec` modules.

#### Variables

| Variables | Mandatory | Type | Description |
| --- | --- | --- | --- |
| `id` | yes | `UUID` | Data object identifier in the uuid format. |
| `beacon` | yes | `url` | Data object identifier in the beacon URL format. E.g., `weaviate://<hostname>/<kind>/id`. |
| `distance` | no | `float` | The required degree of similarity between an object's characteristics and the provided filter values. Can't be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/docs/weaviate/configuration/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).. Can't be used together with the `distance` variable. |

#### Example

import GraphQLFiltersNearObject from '/_includes/code/graphql.filters.nearObject.mdx';

<GraphQLFiltersNearObject/>

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Article%28%0D%0A++++++nearObject%3A+%7B%0D%0A++++++++beacon%3A+%22weaviate%3A%2F%2Flocalhost%2Fe5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf%22%2C+%0D%0A++++++++certainty%3A+0.7%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Article%28%0D%0A++++++nearObject%3A+%7B%0D%0A++++++++beacon%3A+%22weaviate%3A%2F%2Flocalhost%2Fe5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf%22%2C+%0D%0A++++++++certainty%3A+0.7%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

## hybrid
This filter allows you to combine dense and sparse vectors to get the best of both search methods. It's supported by the `Get{}` function.  

| Variables | Mandatory | Description |
| --- | --- | --- | --- |
| `hybrid` | yes | need to specify that you want to use hybrid search |
| `query` | yes | search query |
| `alpha` | no (default is set to 0.75) | weighting for each search algorithm |
| `vector` | no | optional to supply your own vector |
| `score` | no | ranked score that is assigned to each document |

* Note: `alpha` can be any number from 0 to 1 
  * If `alpha` = 0, it is using a pure **sparse** search method 
  * If `alpha` = 1, it is using a pure **vector** search method
  * If `alpha` = 0.5, it is weighing the sparse and vector method evenly

### Example 

import GraphQLFiltersHybrid from '/_includes/code/graphql.filters.hybrid.mdx';

<GraphQLFiltersHybrid/>

<MoleculeGQLDemo query='%7B%0A+  +Get+{%0A++++Article+(%0A++++++hybrid:+{%0A++++++++query:+%22Fisherman+that+catches+salmon%22%0A++++++++alpha:+0.5%0A++++++})%0A+++++{%0A++++++title%0A++++++summary%0A++++++_additional+{score}%0A++++}%0A++}%0A%7D'/>


### Example with vector parameter
If you're providing your own embeddings, you can add the vector query to the `vector` parameter. If Weaviate is handling the vectorization, then you can ignore the `vector` parameter and use the example code snippets above.

import GraphQLFiltersHybridVector from '/_includes/code/graphql.filters.hybrid.vector.mdx';

<GraphQLFiltersHybridVector/>

## bm25
The `bm25` operator performs a keyword (sparse vector) search, and uses the BM25F ranking function to score the results. BM25F (**B**est **M**atch **25** with Extension to Multiple Weighted **F**ields) is an extended version of BM25 that applies the scoring algorithm to multiple fields (`properties`), producing better results.

The search is case-insensitive, and case matching does not confer a score advantage. Stop words are removed. [Stemming is not supported yet](https://github.com/semi-technologies/weaviate/issues/2439).

### Schema configuration
The settings for BM25 are the [free parameters `k1` and `b`](https://en.wikipedia.org/wiki/Okapi_BM25#The_ranking_function), and they are optional. The defaults (`k1` = 1.2 and `b` = 0.75) work well for most cases. If necessary, they can be configured in the schema per class, and can optionally be overridden per property:

```json
{
  "class": "string",
  "sparseIndexType": "bm25f",
  // Configuration of the sparse index
  "sparseIndexConfig": {
    "bm25f": {
      "b": 0.75,
      "k1": 1.2
    }
  },
  "properties": [
    {
      "name": "string",
      "description": "string",
      "dataType": [
        "string"
      ],
      // Property-level settings override the class-level settings
      "sparseIndexConfig": {
        "bm25f": {
          "b": 0.75,
          "k1": 1.2
        }
      },
      "indexInverted": true
    }
  ]
}
```

### Variables
The `bm25` operator supports two variables:
* `query` (mandatory) - the keyword search query
* `properties` (optional) - array of properties (fields) to search in, defaulting to all properties in the class. Specific properties can be boosted by a factor specified as a number after the caret sign, for example `properties: ["title^3", "description"]`.

### Example query

import GraphQLFiltersBM25 from '/_includes/code/graphql.filters.bm25.mdx';

<GraphQLFiltersBM25/>

<MoleculeGQLDemo query='%7B%0A++Get+{%0A++++Article(%0A++++++bm25:+{%0A++++++++query:+%22fox%22,%0A++++++++properties:+%5B%22title%22%5D%0A++++++}%0A++++)+{%0A++++++title%0A++++++_additional+{%0A++++++++score%0A++++++}%0A++++}%0A++}%0A%7D'/>

### GraphQL response

The `_additional` object in the GraphQL result exposes the score:

```json
{
  "_additional": {
    "score": "5.3201",
    "distance": null,  // always null
    "certainty": null  // always null
  }
}
```

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "certainty": null,
            "distance": null,
            "score": "3.4985464"
          },
          "title": "Tim Dowling: is the dog’s friendship with the fox sweet – or a bad omen?"
        }
      ]
    }
  },
  "errors": null
}
```


### group

You can use a group operator to combine similar concepts (aka _entity merging_). There are two ways of grouping objects with a semantic similarity together.

#### Variables

| Variables | Mandatory | Type | Description |
| --- | --- | --- | --- |
| `type` | yes | `string` | You can only show the closest concept (`closest`) or merge all similar entities into one single string (`merge`). |
| `force` | yes | `float` | The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible. |

### Example

import GraphQLFiltersGroup from '/_includes/code/graphql.filters.group.mdx';

<GraphQLFiltersGroup/>

{% include graphql.filters.group-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28%0D%0A++++++group%3A%7B%0D%0A++++++++type%3A+merge%2C%0D%0A++++++++force%3A0.05%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++name%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

This results in the following. Note that publications `International New York Times`, `The New York Times Company` and `New York Times` are merged. The property values that do not have an exact overlap will all be shown, with the value of the most central concept before the brackets.

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "Vogue"
        },
        {
          "name": "Wired"
        },
        {
          "name": "Financial Times"
        },
        {
          "name": "New Yorker"
        },
        {
          "name": "The Economist"
        },
        {
          "name": "International New York Times (The New York Times Company, New York Times)"
        },
        {
          "name": "Wall Street Journal"
        },
        {
          "name": "CNN"
        },
        {
          "name": "Game Informer"
        },
        {
          "name": "The Guardian"
        },
        {
          "name": "Fox News"
        }
      ]
    }
  },
  "errors": null
}
```

## Module specific parameters

Module specific search parameters are made available in certain Weaviate modules.​

### nearText

Enabled by the modules: [text2vec-openai](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-openai.md), [text2vec-transformers](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md), [text2vec-contextionary](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md).

This filter allows you to find data objects in the vicinity of the vector representation of a single or multiple concepts. It's supported by the `Get{}` function.

#### Variables

| Variables | Mandatory | Type | Description |
| --- | --- | --- | --- |
| `concepts` | yes | `[string]` | An array of strings, this can be natural language queries or single words. If multiple strings are used, a centroid is calculated and used. Learn more about how the concepts are parsed [here](#concept-parsing) |
| `certainty` | no | `float` | The required degree of similarity between an object's characteristics and the provided filter values. |
| `distance` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite). |
| `autocorrect` | no | `boolean` | Autocorrect input text values |
| `moveTo` | no | `object{}` | Move your search term closer to another vector described by keywords |
| `moveTo{concepts}`| no | `[string]` | An array of strings, this can be natural language queries or single words. If multiple strings are used, a centroid is calculated and used. |
| `moveTo{objects}`| no | `[UUID]` | Object IDs to move the results to. This is used to "bias" NLP search results into a certain direction in vector space | 
| `moveTo{force}`| no | `float` | The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible | 
| `moveAwayFrom` | no | `object{}` | Move your search term away from another vector described by keywords |
| `moveAwayFrom{concepts}`| no | `[string]` | An array of strings, this can be natural language queries or single words. If multiple strings are used, a centroid is calculated and used. |
| `moveAwayFrom{objects}`| no | `[UUID]` | Object IDs to move the results to. This is used to "bias" NLP search results into a certain direction in vector space | 
| `moveAwayFrom{force}`| no | `float` | The force to apply for a particular movements. Must be between 0 and 1 where 0 is equivalent to no movement and 1 is equivalent to largest movement possible | 
| `distance` | no | `float` | The required degree of similarity between an object's characteristics and the provided filter values. Can't be used together with the `certainty` variable. The interpretation of the value of the distance field depends on the [distance metric used](/docs/weaviate/configuration/distances.md). |
| `certainty` | no | `float` | Normalized Distance between the result item and the search vector. Normalized to be between 0 (identical vectors) and 1 (perfect opposite).. Can't be used together with the `distance` variable. |

#### Example I

This example shows a basic overview of using the `nearText` filter.

import GraphQLFiltersNearText from '/_includes/code/graphql.filters.nearText.mdx';

<GraphQLFiltersNearText/>

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Publication%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveAwayFrom%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22finance%22%5D%2C%0D%0A++++++++++force%3A+0.45%0D%0A++++++++%7D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22haute+couture%22%5D%2C%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++name%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

#### Example II

You can also bias results toward other data objects' vector representations. For example, in this dataset, we have an ambiguous query on our news article dataset, which we bias towards an article called: ["Tohoku: A Japan destination for all seasons."](https://link.semi.technology/3Czhg9p)

import GraphQLFiltersNearText2Obj from '/_includes/code/graphql.filters.nearText.2obj.mdx';

<GraphQLFiltersNearText2Obj/>

<MoleculeGQLDemo query='%7B%0D%0A++Get%7B%0D%0A++++Article%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22traveling+in+Asia%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++objects%3A+%5B%7B%0D%0A++++++++++++%23+this+ID+is+of+the+article%3A%0D%0A++++++++++++%23+%22Tohoku%3A+A+Japan+destination+for+all+seasons.%22%0D%0A++++++++++++id%3A+%222faf2b7d-f185-30c0-8c80-a01b7cfeefb4%22%0D%0A++++++++++%7D%5D%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++title%0D%0A++++++summary%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get%7B%0D%0A++++Article%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22traveling+in+Asia%22%5D%2C%0D%0A++++++++certainty%3A+0.7%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++objects%3A+%5B%7B%0D%0A++++++++++++%23+this+ID+is+of+the+article%3A%0D%0A++++++++++++%23+%22Tohoku%3A+A+Japan+destination+for+all+seasons.%22%0D%0A++++++++++++id%3A+%222faf2b7d-f185-30c0-8c80-a01b7cfeefb4%22%0D%0A++++++++++%7D%5D%0D%0A++++++++++force%3A+0.85%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29%7B%0D%0A++++++title%0D%0A++++++summary%0D%0A++++++_additional+%7B%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

### Additional information

#### Distance metrics

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

#### Concept parsing

Strings written in the concepts array are your fuzzy search terms. An array of concepts is required to set in the Explore query, and all words in this array should be present in the Contextionary.

There are three ways to define the concepts array argument in the filter.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

#### Semantic Path

* Only available in `txt2vec-contextionary` module

The semantic path returns an array of concepts from the query to the data object. This allows you to see which steps Weaviate took and how the query and data object are interpreted. 

| Property | Description |
| `concept` | the concept that is found in this step. |
| `distanceToNext` | the distance to the next step (null for the last step). |
| `distanceToPrevious` | this distance to the previous step (null for the first step). |
| `distanceToQuery` | the distance of this step to the query. |
| `distanceToResult` | the distance of the step to this result. |

_Note: Building a semantic path is only possible if a [`nearText: {}` filter](#neartext) is set as the explore term represents the beginning of the path and each search result represents the end of the path. Since `nearText: {}` queries are currently exclusively possible in GraphQL, the `semanticPath` is therefore not available in the REST API._

Example: showing a semantic path without edges.

import GraphQLUnderscoreSemanticpath from '/_includes/code/graphql.underscoreproperties.semanticpath.mdx';

<GraphQLUnderscoreSemanticpath/>

### Ask

Enabled by the module: [Question Answering](/docs/weaviate/modules/reader-generator-modules/qna-transformers.md).

This filter allows you to return answers to questions by running the results through a Q&A model.

#### Variables

| Variables | Mandatory | Type | Description |
| --- | --- | --- | --- |
| `question` 	| yes	| `string` | The question to be answered. 	|
| `certainty` 	| no 	| `float` | Desired minimal certainty or confidence of answer to the question. The higher the value, the stricter the search becomes. The lower the value, the fuzzier the search becomes. If no certainty is set, any answer that could be extracted will be returned|
| `properties` 	| no 	| `[string]` | The properties of the queries Class which contains text. If no properties are set, all are considered.	|
| `rerank` 	| no 	| `boolean`	| If enabled, the qna module will rerank the result based on the answer score. For example, if the 3rd result - as determined by the previous (semantic) search contained the most likely answer, result 3 will be pushed to position 1, etc. *Not supported prior to v1.10.0* |

#### Example

import QNATransformersAsk from '/_includes/code/qna-transformers.ask.mdx';

<QNATransformersAsk/>

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++ask%3A+%7B%0D%0A++++++++question%3A+%22Who+is+the+king+of+the+Netherlands%3F%22%2C%0D%0A++++++++properties%3A+%5B%22summary%22%5D%0D%0A++++++%7D%2C+%0D%0A++++++limit%3A1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++answer+%7B%0D%0A++++++++++hasAnswer%0D%0A++++++++++certainty%0D%0A++++++++++property%0D%0A++++++++++result%0D%0A++++++++++startPosition%0D%0A++++++++++endPosition%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++ask%3A+%7B%0D%0A++++++++question%3A+%22Who+is+the+king+of+the+Netherlands%3F%22%2C%0D%0A++++++++properties%3A+%5B%22summary%22%5D%0D%0A++++++%7D%2C+%0D%0A++++++limit%3A1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++answer+%7B%0D%0A++++++++++hasAnswer%0D%0A++++++++++certainty%0D%0A++++++++++property%0D%0A++++++++++result%0D%0A++++++++++startPosition%0D%0A++++++++++endPosition%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

#### Additional information

The `_additional{}` property is extended with the answer and a certainty of the answer.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
