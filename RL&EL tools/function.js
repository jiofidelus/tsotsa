//NodeJs fetch sync
let fetch = require('sync-fetch')
//File Server Library
let fs = require("fs"); 
//PATH Library
let path = require('path');  
//Googlethis Library
const google = require('googlethis'); 
//general search library
const gse = require("general-search-engine")
//Jaccard Index - Cousine Similarity - SorensenDice coefficient - Jaro-Winkler - Levenshtein
let stringComparison = require('string-comparison')
let natural = require('natural');  
let classifier = new natural.BayesClassifier();
let tokenizer = new natural.WordTokenizer();
let wordnet = new natural.WordNet();

//data
var stopwords_1 = ['start','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
var stopwords_2 = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];
var stopwords_3 = ["'ll","'tis","'twas","'ve","10","39","a","a's","able","ableabout","about","above","abroad","abst","accordance","according","accordingly","across","act","actually","ad","added","adj","adopted","ae","af","affected","affecting","affects","after","afterwards","ag","again","against","ago","ah","ahead","ai","ain't","aint","al","all","allow","allows","almost","alone","along","alongside","already","also","although","always","am","amid","amidst","among","amongst","amoungst","amount","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","ao","apart","apparently","appear","appreciate","appropriate","approximately","aq","ar","are","area","areas","aren","aren't","arent","arise","around","arpa","as","aside","ask","asked","asking","asks","associated","at","au","auth","available","aw","away","awfully","az","b","ba","back","backed","backing","backs","backward","backwards","bb","bd","be","became","because","become","becomes","becoming","been","before","beforehand","began","begin","beginning","beginnings","begins","behind","being","beings","believe","below","beside","besides","best","better","between","beyond","bf","bg","bh","bi","big","bill","billion","biol","bj","bm","bn","bo","both","bottom","br","brief","briefly","bs","bt","but","buy","bv","bw","by","bz","c","c'mon","c's","ca","call","came","can","can't","cannot","cant","caption","case","cases","cause","causes","cc","cd","certain","certainly","cf","cg","ch","changes","ci","ck","cl","clear","clearly","click","cm","cmon","cn","co","co.","com","come","comes","computer","con","concerning","consequently","consider","considering","contain","containing","contains","copy","corresponding","could","could've","couldn","couldn't","couldnt","course","cr","cry","cs","cu","currently","cv","cx","cy","cz","d","dare","daren't","darent","date","de","dear","definitely","describe","described","despite","detail","did","didn","didn't","didnt","differ","different","differently","directly","dj","dk","dm","do","does","doesn","doesn't","doesnt","doing","don","don't","done","dont","doubtful","down","downed","downing","downs","downwards","due","during","dz","e","each","early","ec","ed","edu","ee","effect","eg","eh","eight","eighty","either","eleven","else","elsewhere","empty","end","ended","ending","ends","enough","entirely","er","es","especially","et","et-al","etc","even","evenly","ever","evermore","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","face","faces","fact","facts","fairly","far","farther","felt","few","fewer","ff","fi","fifteen","fifth","fifty","fify","fill","find","finds","fire","first","five","fix","fj","fk","fm","fo","followed","following","follows","for","forever","former","formerly","forth","forty","forward","found","four","fr","free","from","front","full","fully","further","furthered","furthering","furthermore","furthers","fx","g","ga","gave","gb","gd","ge","general","generally","get","gets","getting","gf","gg","gh","gi","give","given","gives","giving","gl","gm","gmt","gn","go","goes","going","gone","good","goods","got","gotten","gov","gp","gq","gr","great","greater","greatest","greetings","group","grouped","grouping","groups","gs","gt","gu","gw","gy","h","had","hadn't","hadnt","half","happens","hardly","has","hasn","hasn't","hasnt","have","haven","haven't","havent","having","he","he'd","he'll","he's","hed","hell","hello","help","hence","her","here","here's","hereafter","hereby","herein","heres","hereupon","hers","herself","herse”","hes","hi","hid","high","higher","highest","him","himself","himse”","his","hither","hk","hm","hn","home","homepage","hopefully","how","how'd","how'll","how's","howbeit","however","hr","ht","htm","html","http","hu","hundred","i","i'd","i'll","i'm","i've","i.e.","id","ie","if","ignored","ii","il","ill","im","immediate","immediately","importance","important","in","inasmuch","inc","inc.","indeed","index","indicate","indicated","indicates","information","inner","inside","insofar","instead","int","interest","interested","interesting","interests","into","invention","inward","io","iq","ir","is","isn","isn't","isnt","it","it'd","it'll","it's","itd","itll","its","itself","itse”","ive","j","je","jm","jo","join","jp","just","k","ke","keep","keeps","kept","keys","kg","kh","ki","kind","km","kn","knew","know","known","knows","kp","kr","kw","ky","kz","l","la","large","largely","last","lately","later","latest","latter","latterly","lb","lc","least","length","less","lest","let","let's","lets","li","like","liked","likely","likewise","line","little","lk","ll","long","longer","longest","look","looking","looks","low","lower","lr","ls","lt","ltd","lu","lv","ly","m","ma","made","mainly","make","makes","making","man","many","may","maybe","mayn't","maynt","mc","md","me","mean","means","meantime","meanwhile","member","members","men","merely","mg","mh","microsoft","might","might've","mightn't","mightnt","mil","mill","million","mine","minus","miss","mk","ml","mm","mn","mo","more","moreover","most","mostly","move","mp","mq","mr","mrs","ms","msie","mt","mu","much","mug","must","must've","mustn't","mustnt","mv","mw","mx","my","myself","myse”","mz","n","na","name","namely","nay","nc","nd","ne","near","nearly","necessarily","necessary","need","needed","needing","needn't","neednt","needs","neither","net","netscape","never","neverf","neverless","nevertheless","new","newer","newest","next","nf","ng","ni","nine","ninety","nl","no","no-one","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","notwithstanding","novel","now","nowhere","np","nr","nu","null","number","numbers","nz","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","older","oldest","om","omitted","on","once","one","one's","ones","only","onto","open","opened","opening","opens","opposite","or","ord","order","ordered","ordering","orders","org","other","others","otherwise","ought","oughtn't","oughtnt","our","ours","ourselves","out","outside","over","overall","owing","own","p","pa","page","pages","part","parted","particular","particularly","parting","parts","past","pe","per","perhaps","pf","pg","ph","pk","pl","place","placed","places","please","plus","pm","pmid","pn","point","pointed","pointing","points","poorly","possible","possibly","potentially","pp","pr","predominantly","present","presented","presenting","presents","presumably","previously","primarily","probably","problem","problems","promptly","proud","provided","provides","pt","put","puts","pw","py","q","qa","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","reasonably","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","reserved","respectively","resulted","resulting","results","right","ring","ro","room","rooms","round","ru","run","rw","s","sa","said","same","saw","say","saying","says","sb","sc","sd","se","sec","second","secondly","seconds","section","see","seeing","seem","seemed","seeming","seems","seen","sees","self","selves","sensible","sent","serious","seriously","seven","seventy","several","sg","sh","shall","shan't","shant","she","she'd","she'll","she's","shed","shell","shes","should","should've","shouldn","shouldn't","shouldnt","show","showed","showing","shown","showns","shows","si","side","sides","significant","significantly","similar","similarly","since","sincere","site","six","sixty","sj","sk","sl","slightly","sm","small","smaller","smallest","sn","so","some","somebody","someday","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","sr","st","state","states","still","stop","strongly","su","sub","substantially","successfully","such","sufficiently","suggest","sup","sure","sv","sy","system","sz","t","t's","take","taken","taking","tc","td","tell","ten","tends","test","text","tf","tg","th","than","thank","thanks","thanx","that","that'll","that's","that've","thatll","thats","thatve","the","their","theirs","them","themselves","then","thence","there","there'd","there'll","there're","there's","there've","thereafter","thereby","thered","therefore","therein","therell","thereof","therere","theres","thereto","thereupon","thereve","these","they","they'd","they'll","they're","they've","theyd","theyll","theyre","theyve","thick","thin","thing","things","think","thinks","third","thirty","this","thorough","thoroughly","those","thou","though","thoughh","thought","thoughts","thousand","three","throug","through","throughout","thru","thus","til","till","tip","tis","tj","tk","tm","tn","to","today","together","too","took","top","toward","towards","tp","tr","tried","tries","trillion","truly","try","trying","ts","tt","turn","turned","turning","turns","tv","tw","twas","twelve","twenty","twice","two","tz","u","ua","ug","uk","um","un","under","underneath","undoing","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","upwards","us","use","used","useful","usefully","usefulness","uses","using","usually","uucp","uy","uz","v","va","value","various","vc","ve","versus","very","vg","vi","via","viz","vn","vol","vols","vs","vu","w","want","wanted","wanting","wants","was","wasn","wasn't","wasnt","way","ways","we","we'd","we'll","we're","we've","web","webpage","website","wed","welcome","well","wells","went","were","weren","weren't","werent","weve","wf","what","what'd","what'll","what's","what've","whatever","whatll","whats","whatve","when","when'd","when'll","when's","whence","whenever","where","where'd","where'll","where's","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","whichever","while","whilst","whim","whither","who","who'd","who'll","who's","whod","whoever","whole","wholl","whom","whomever","whos","whose","why","why'd","why'll","why's","widely","width","will","willing","wish","with","within","without","won","won't","wonder","wont","words","work","worked","working","works","world","would","would've","wouldn","wouldn't","wouldnt","ws","www","x","y","ye","year","years","yes","yet","you","you'd","you'll","you're","you've","youd","youll","young","younger","youngest","your","youre","yours","yourself","yourselves","youve","yt","yu","z","za","zero","zm","zr"];
var adjectives = ["aback","abaft","abandoned","abashed","aberrant","abhorrent","abiding","abject","ablaze","able","abnormal","aboard","aboriginal","abortive","abounding","abrasive","abrupt","absent","absorbed","absorbing","abstracted","absurd","abundant","abusive","acceptable","accessible","accidental","accurate","acid","acidic","acoustic","acrid","actually","ad","hoc","adamant","adaptable","addicted","adhesive","adjoining","adorable","adventurous","afraid","aggressive","agonizing","agreeable","ahead","ajar","alcoholic","alert","alike","alive","alleged","alluring","aloof","amazing","ambiguous","ambitious","amuck","amused","amusing","ancient","angry","animated","annoyed","annoying","anxious","apathetic","aquatic","aromatic","arrogant","ashamed","aspiring","assorted","astonishing","attractive","auspicious","automatic","available","average","awake","aware","awesome","awful","axiomatic","bad","barbarous","bashful","bawdy","beautiful","befitting","belligerent","beneficial","bent","berserk","best","better","bewildered","big","billowy","bite-sized","bitter","bizarre","black","black-and-white","bloody","blue","blue-eyed","blushing","boiling","boorish","bored","boring","bouncy","boundless","brainy","brash","brave","brawny","breakable","breezy","brief","bright","bright","broad","broken","brown","bumpy","burly","bustling","busy","cagey","calculating","callous","calm","capable","capricious","careful","careless","caring","cautious","ceaseless","certain","changeable","charming","cheap","cheerful","chemical","chief","childlike","chilly","chivalrous","chubby","chunky","clammy","classy","clean","clear","clever","cloistered","cloudy","closed","clumsy","cluttered","coherent","cold","colorful","colossal","combative","comfortable","common","complete","complex","concerned","condemned","confused","conscious","cooing","cool","cooperative","coordinated","courageous","cowardly","crabby","craven","crazy","creepy","crooked","crowded","cruel","cuddly","cultured","cumbersome","curious","curly","curved","curvy","cut","cute","cute","cynical","daffy","daily","damaged","damaging","damp","dangerous","dapper","dark","dashing","dazzling","dead","deadpan","deafening","dear","debonair","decisive","decorous","deep","deeply","defeated","defective","defiant","delicate","delicious","delightful","demonic","delirious","dependent","depressed","deranged","descriptive","deserted","detailed","determined","devilish","didactic","different","difficult","diligent","direful","dirty","disagreeable","disastrous","discreet","disgusted","disgusting","disillusioned","dispensable","distinct","disturbed","divergent","dizzy","domineering","doubtful","drab","draconian","dramatic","dreary","drunk","dry","dull","dusty","dynamic","dysfunctional","eager","early","earsplitting","earthy","easy","eatable","economic","educated","efficacious","efficient","eight","elastic","elated","elderly","electric","elegant","elfin","elite","embarrassed","eminent","empty","enchanted","enchanting","encouraging","endurable","energetic","enormous","entertaining","enthusiastic","envious","equable","equal","erect","erratic","ethereal","evanescent","evasive","even excellent excited","exciting exclusive","exotic","expensive","extra-large extra-small exuberant","exultant","fabulous","faded","faint fair","faithful","fallacious","false familiar famous","fanatical","fancy","fantastic","far"," far-flung"," fascinated","fast","fat faulty","fearful fearless","feeble feigned","female fertile","festive","few fierce","filthy","fine","finicky","first"," five"," fixed"," flagrant","flaky","flashy","flat","flawless","flimsy"," flippant","flowery","fluffy","fluttering"," foamy","foolish","foregoing","forgetful","fortunate","four frail","fragile","frantic","free"," freezing"," frequent"," fresh"," fretful","friendly","frightened frightening full fumbling functional","funny","furry furtive","future futuristic","fuzzy ","gabby","gainful","gamy","gaping","garrulous","gaudy","general gentle","giant","giddy","gifted","gigantic","glamorous","gleaming","glib","glistening glorious","glossy","godly","good","goofy","gorgeous","graceful","grandiose","grateful gratis","gray greasy great","greedy","green grey grieving","groovy","grotesque","grouchy","grubby gruesome","grumpy","guarded","guiltless","gullible gusty","guttural H habitual","half","hallowed","halting","handsome","handsomely","handy","hanging","hapless","happy","hard","hard-to-find","harmonious","harsh","hateful","heady","healthy","heartbreaking","heavenly heavy hellish","helpful","helpless","hesitant","hideous high","highfalutin","high-pitched","hilarious","hissing","historical","holistic","hollow","homeless","homely","honorable","horrible","hospitable","hot huge","hulking","humdrum","humorous","hungry","hurried","hurt","hushed","husky","hypnotic","hysterical","icky","icy","idiotic","ignorant","ill","illegal","ill-fated","ill-informed","illustrious","imaginary","immense","imminent","impartial","imperfect","impolite","important","imported","impossible","incandescent","incompetent","inconclusive","industrious","incredible","inexpensive","infamous","innate","innocent","inquisitive","insidious","instinctive","intelligent","interesting","internal","invincible","irate","irritating","itchy","jaded","jagged","jazzy","jealous","jittery","jobless","jolly","joyous","judicious","juicy","jumbled","jumpy","juvenile","kaput","keen","kind","kindhearted","kindly","knotty","knowing","knowledgeable","known","labored","lackadaisical","lacking","lame","lamentable","languid","large","last","late","laughable","lavish","lazy","lean","learned","left","legal","lethal","level","lewd","light","like","likeable","limping","literate","little","lively","lively","living","lonely","long","longing","long-term","loose","lopsided","loud","loutish","lovely","loving","low","lowly","lucky","ludicrous","lumpy","lush","luxuriant","lying","lyrical","macabre","macho","maddening","madly","magenta","magical","magnificent","majestic","makeshift","male","malicious","mammoth","maniacal","many","marked","massive","married","marvelous","material","materialistic","mature","mean","measly","meaty","medical","meek","mellow","melodic","melted","merciful","mere","messy","mighty","military","milky","mindless","miniature","minor","miscreant","misty","mixed","moaning","modern","moldy","momentous","motionless","mountainous","muddled","mundane","murky","mushy","mute","mysterious","naive","nappy","narrow","nasty","natural","naughty","nauseating","near","neat","nebulous","necessary","needless","needy","neighborly","nervous","new","next","nice","nifty","nimble","nine","nippy","noiseless","noisy","nonchalant","nondescript","nonstop","normal","nostalgic","nosy","noxious","null","numberless","numerous","nutritious","nutty","oafish","obedient","obeisant","obese","obnoxious","obscene","obsequious","observant","obsolete","obtainable","oceanic","odd","offbeat","old","old-fashioned","omniscient","one","onerous","open","opposite","optimal","orange","ordinary","organic","ossified","outgoing","outrageous","outstanding","oval","overconfident","overjoyed","overrated","overt","overwrought","painful","painstaking","pale","paltry","panicky","panoramic","parallel","parched","parsimonious","past","pastoral","pathetic","peaceful","penitent","perfect","periodic","permissible","perpetual","petite","petite","phobic","physical","picayune","pink","piquant","placid","plain","plant","plastic","plausible","pleasant","plucky","pointless","poised","polite","political","poor","possessive","possible","powerful","precious","premium","present","pretty","previous","pricey","prickly","private","probable","productive","profuse","protective","proud","psychedelic","psychotic","public","puffy","pumped","puny","purple","purring","pushy","puzzled","puzzling","quack","quaint","quarrelsome","questionable","quick","quickest","quiet","quirky","quixotic","quizzical","rabid","racial","ragged","rainy","rambunctious","rampant","rapid","rare","raspy","ratty","ready","real","rebel","receptive","recondite","red","redundant","reflective","regular","relieved","remarkable","reminiscent","repulsive","resolute","resonant","responsible","rhetorical","rich","right","righteous","rightful","rigid","ripe","ritzy","roasted","robust","romantic","roomy","rotten","rough","round","royal","ruddy","rude","rural","rustic","ruthless","sable","sad","safe","salty","same","sassy","satisfying","savory","scandalous","scarce","scared","scary","scattered","scientific","scintillating","scrawny","screeching","second","second-hand","secret","secretive","sedate","seemly","selective","selfish","separate","serious","shaggy","shaky","shallow","sharp","shiny","shivering","shocking","short","shrill","shut","shy","sick","silent","silent","silky","silly","simple","simplistic","sincere","six","skillful","skinny","sleepy","slim","slimy","slippery","sloppy","slow","small","smart","smelly","smiling","smoggy","smooth","sneaky","snobbish","snotty","soft","soggy","solid","somber","sophisticated","sordid","sore","sore","sour","sparkling","special","spectacular","spicy","spiffy","spiky","spiritual","spiteful","splendid","spooky","spotless","spotted","spotty","spurious","squalid","square","squealing","squeamish","staking","stale","standing","statuesque","steadfast","steady","steep","stereotyped","sticky","stiff","stimulating","stingy","stormy","straight","strange","striped","strong","stupendous","stupid","sturdy","subdued","subsequent","substantial","successful","succinct","sudden","sulky","super","superb","superficial","supreme","swanky","sweet","sweltering","swift","symptomatic","synonymous","taboo","tacit","tacky","talented","tall","tame","tan","tangible","tangy","tart","tasteful","tasteless","tasty","tawdry","tearful","tedious","teeny","teeny-tiny","telling","temporary","ten","tender tense","tense","tenuous","terrible","terrific","tested","testy","thankful","therapeutic","thick","thin","thinkable","third","thirsty","thoughtful","thoughtless","threatening","three","thundering","tidy","tight","tightfisted","tiny","tired","tiresome","toothsome","torpid","tough","towering","tranquil","trashy","tremendous","tricky","trite","troubled","truculent","true","truthful","two","typical","ubiquitous","ugliest","ugly","ultra","unable","unaccountable","unadvised","unarmed","unbecoming","unbiased","uncovered","understood","undesirable","unequal","unequaled","uneven","unhealthy","uninterested","unique","unkempt","unknown","unnatural","unruly","unsightly","unsuitable","untidy","unused","unusual","unwieldy","unwritten","upbeat","uppity","upset","uptight","used","useful","useless","utopian","utter","uttermost","vacuous","vagabond","vague","valuable","various","vast","vengeful","venomous","verdant","versed","victorious","vigorous","violent","violet","vivacious","voiceless","volatile","voracious","vulgar","wacky","waggish","waiting","","wakeful","wandering","wanting","warlike","warm","wary","wasteful","watery","weak","wealthy","weary","well-groomed","well-made","well-off","well-to-do","wet","whimsical","whispering","white","whole","wholesale","wicked","wide","wide-eyed","wiggly","wild","willing","windy","wiry","wise","wistful","witty","woebegone","womanly","wonderful","wooden","woozy","workable","worried","worthless","wrathful","wretched","wrong","wry","xenophobic","yellow","yielding","young","youthful","yummy","zany","zealous","zesty","zippy","zonked"];
var nouns = ["accelerator", "accordion", "account", "accountant", "acknowledgment", "acoustic", "acrylic", "act", "action", "active", "activity", "actor", "actress", "adapter", "addition", "address", "adjustment", "adult", "advantage", "advertisement", "advice", "afghanistan", "africa", "aftermath", "afternoon", "aftershave", "afterthought", "age", "agenda", "agreement", "air", "airbus", "airmail", "airplane", "airport", "airship", "alarm", "albatross", "alcohol", "algebra", "algeria", "alibi", "alley", "alligator", "alloy", "almanac", "alphabet", "alto", "aluminium", "aluminum", "ambulance", "america", "amount", "amusement", "anatomy", "anethesiologist", "anger", "angle", "angora", "animal", "anime", "ankle", "answer", "ant", "antarctica", "anteater", "antelope", "anthony", "anthropology", "apartment", "apology", "apparatus", "apparel", "appeal", "appendix", "apple", "appliance", "approval", "april", "aquarius", "arch", "archaeology", "archeology", "archer", "architecture", "area", "argentina", "argument", "aries", "arithmetic", "arm", "armadillo", "armchair", "armenian", "army", "arrow", "art", "ash", "ashtray", "asia", "asparagus", "asphalt", "asterisk", "astronomy", "athlete", "atm", "atom", "attack", "attempt", "attention", "attic", "attraction", "august", "aunt", "australia", "australian", "author", "authorisation", "authority", "authorization", "avenue", "babies", "baboon", "baby", "back", "backbone", "bacon", "badge", "badger", "bag", "bagel", "bagpipe", "bail", "bait", "baker", "bakery", "balance", "balinese", "ball", "balloon", "bamboo", "banana", "band", "bandana", "bangladesh", "bangle", "banjo", "bank", "bankbook", "banker", "bar", "barbara", "barber", "barge", "baritone", "barometer", "base", "baseball", "basement", "basin", "basket", "basketball", "bass", "bassoon", "bat", "bath", "bathroom", "bathtub", "battery", "battle", "bay", "beach", "bead", "beam", "bean", "bear", "beard", "beast", "beat", "beautician", "beauty", "beaver", "bed", "bedroom", "bee", "beech", "beef", "beer", "beet", "beetle", "beggar", "beginner", "begonia", "behavior", "belgian", "belief", "believe", "bell", "belt", "bench", "bengal", "beret", "berry", "bestseller", "betty", "bibliography", "bicycle", "bike", "bill", "billboard", "biology", "biplane", "birch", "bird", "birth", "birthday", "bit", "bite", "black", "bladder", "blade", "blanket", "blinker", "blizzard", "block", "blood", "blouse", "blow", "blowgun", "blue", "board", "boat", "bobcat", "body", "bolt", "bomb", "bomber", "bone", "bongo", "bonsai", "book", "bookcase", "booklet", "boot", "border", "botany", "bottle", "bottom", "boundary", "bow", "bowl", "bowling", "box", "boy", "bra", "brace", "bracket", "brain", "brake", "branch", "brand", "brandy", "brass", "brazil", "bread", "break", "breakfast", "breath", "brian", "brick", "bridge", "british", "broccoli", "brochure", "broker", "bronze", "brother", "brother-in-law", "brow", "brown", "brush", "bubble", "bucket", "budget", "buffer", "buffet", "bugle", "building", "bulb", "bull", "bulldozer", "bumper", "bun", "burglar", "burma", "burn", "burst", "bus", "bush", "business", "butane", "butcher", "butter", "button", "buzzard", "c-clamp", "cabbage", "cabinet", "cable", "cactus", "cafe", "cake", "calculator", "calculus", "calendar", "calf", "call", "camel", "camera", "camp", "can", "canada", "canadian", "cancer", "candle", "cannon", "canoe", "canvas", "cap", "capital", "cappelletti", "capricorn", "captain", "caption", "car", "caravan", "carbon", "card", "cardboard", "cardigan", "care", "carnation", "carol", "carp", "carpenter", "carriage", "carrot", "cart", "cartoon", "case", "cast", "castanet", "cat", "catamaran", "caterpillar", "cathedral", "catsup", "cattle", "cauliflower", "cause", "caution", "cave", "cd", "ceiling", "celery", "celeste", "cell", "cellar", "cello", "celsius", "cement", "cemetery", "cent", "centimeter", "century", "ceramic", "cereal", "certification", "chain", "chair", "chalk", "chance", "change", "channel", "character", "chard", "charles", "chauffeur", "check", "cheek", "cheese", "cheetah", "chef", "chemistry", "cheque", "cherries", "cherry", "chess", "chest", "chick", "chicken", "chicory", "chief", "child", "children", "chill", "chime", "chimpanzee", "chin", "china", "chinese", "chive", "chocolate", "chord", "christmas", "christopher", "chronometer", "church", "cicada", "cinema", "circle", "circulation", "cirrus", "citizenship", "city", "clam", "clarinet", "class", "claus", "clave", "clef", "clerk", "click", "client", "climb", "clipper", "cloakroom", "clock", "close", "closet", "cloth", "cloud", "cloudy", "clover", "club", "clutch", "coach", "coal", "coast", "coat", "cobweb", "cockroach", "cocktail", "cocoa", "cod", "coffee", "coil", "coin", "coke", "cold", "collar", "college", "collision", "colombia", "colon", "colony", "color", "colt", "column", "columnist", "comb", "comfort", "comic", "comma", "command", "commission", "committee", "community", "company", "comparison", "competition", "competitor", "composer", "composition", "computer", "condition", "condor", "cone", "confirmation", "conga", "congo", "conifer", "connection", "consonant", "continent", "control", "cook", "cooking", "copper", "copy", "copyright", "cord", "cork", "cormorant", "corn", "cornet", "correspondent", "cost", "cotton", "couch", "cougar", "cough", "country", "course", "court", "cousin", "cover", "cow", "cowbell", "crab", "crack", "cracker", "craftsman", "crate", "crawdad", "crayfish", "crayon", "cream", "creator", "creature", "credit", "creditor", "creek", "crib", "cricket", "crime", "criminal", "crocodile", "crocus", "croissant", "crook", "crop", "cross", "crow", "crowd", "crown", "crush", "cry", "cub", "cuban", "cucumber", "cultivator", "cup", "cupboard", "cupcake", "curler", "currency", "current", "curtain", "curve", "cushion", "custard", "customer", "cut", "cuticle", "cycle", "cyclone", "cylinder", "cymbal", "dad", "daffodil", "dahlia", "daisy", "damage", "dance", "dancer", "danger", "daniel", "dash", "dashboard", "database", "date", "daughter", "david", "day", "dead", "deadline", "deal", "death", "deborah", "debt", "debtor", "decade", "december", "decimal", "decision", "decrease", "dedication", "deer", "defense", "deficit", "degree", "delete", "delivery", "den", "denim", "dentist", "deodorant", "department", "deposit", "description", "desert", "design", "desire", "desk", "dessert", "destruction", "detail", "detective", "development", "dew", "diamond", "diaphragm", "dibble", "dictionary", "dietician", "difference", "digestion", "digger", "digital", "dill", "dime", "dimple", "dinghy", "dinner", "dinosaur", "diploma", "dipstick", "direction", "dirt", "disadvantage", "discovery", "discussion", "disease", "disgust", "dish", "distance", "distribution", "distributor", "diving", "division", "divorced", "dock", "doctor", "dog", "dogsled", "doll", "dollar", "dolphin", "domain", "donald", "donkey", "donna", "door", "dorothy", "double", "doubt", "downtown", "dragon", "dragonfly", "drain", "drake", "drama", "draw", "drawbridge", "drawer", "dream", "dredger", "dress", "dresser", "dressing", "drill", "drink", "drive", "driver", "driving", "drizzle", "drop", "drug", "drum", "dry", "dryer", "duck", "duckling", "dugout", "dungeon", "dust", "eagle", "ear", "earth", "earthquake", "ease", "east", "edge", "edger", "editor", "editorial", "education", "edward", "eel", "effect", "egg", "eggnog", "eggplant", "egypt", "eight", "elbow", "element", "elephant", "elizabeth", "ellipse", "emery", "employee", "employer", "encyclopedia", "end", "enemy", "energy", "engine", "engineer", "engineering", "english", "enquiry", "entrance", "environment", "epoch", "epoxy", "equinox", "equipment", "era", "error", "estimate", "ethernet", "ethiopia", "euphonium", "europe", "evening", "event", "ex-husband", "ex-wife", "examination", "example", "exchange", "exclamation", "exhaust", "existence", "expansion", "experience", "expert", "explanation", "eye", "eyebrow", "eyelash", "eyeliner", "face", "facilities", "fact", "factory", "fahrenheit", "fairies", "fall", "family", "fan", "fang", "farm", "farmer", "fat", "father", "father-in-law", "faucet", "fear", "feast", "feather", "feature", "february", "fedelini", "feedback", "feeling", "feet", "felony", "female", "fender", "ferry", "ferryboat", "fertilizer", "fiber", "fiberglass", "fibre", "fiction", "field", "fifth", "fight", "fighter", "file", "find", "fine", "finger", "fir", "fire", "fired", "fireman", "fireplace", "firewall", "fish", "fisherman", "flag", "flame", "flare", "flat", "flavor", "flax", "flesh", "flight", "flock", "flood", "floor", "flower", "flugelhorn", "flute", "fly", "foam", "fog", "fold", "font", "food", "foot", "football", "footnote", "force", "forecast", "forehead", "forest", "forgery", "fork", "form", "format", "fortnight", "foundation", "fountain", "fowl", "fox", "foxglove", "fragrance", "frame", "france", "freckle", "freeze", "freezer", "freighter", "french", "freon", "friction", "friday", "fridge", "friend", "frog", "front", "frost", "frown", "fruit", "fuel", "fur", "furniture", "galley", "gallon", "game", "gander", "garage", "garden", "garlic", "gas", "gasoline", "gate", "gateway", "gauge", "gazelle", "gear", "gearshift", "geese", "gemini", "gender", "geography", "geology", "geometry", "george", "geranium", "german", "germany", "ghana", "ghost", "giant", "giraffe", "girdle", "girl", "gladiolus", "glass", "glider", "gliding", "glockenspiel", "glove", "glue", "goal", "goat", "gold", "goldfish", "golf", "gondola", "gong", "good-bye", "goose", "gore-tex", "gorilla", "gosling", "government", "governor", "grade", "grain", "gram", "granddaughter", "grandfather", "grandmother", "grandson", "grape", "graphic", "grass", "grasshopper", "gray", "grease", "great-grandfather", "great-grandmother", "greece", "greek", "green", "grenade", "grey", "grill", "grip", "ground", "group", "grouse", "growth", "guarantee", "guatemalan", "guide", "guilty", "guitar", "gum", "gun", "gym", "gymnast", "hacksaw", "hail", "hair"];
var nouns2=["haircut", "half-brother", "half-sister", "halibut", "hall", "hallway", "hamburger", "hammer", "hamster", "hand", "handball", "handicap", "handle", "handsaw", "harbor", "hardboard", "hardcover", "hardhat", "hardware", "harmonica", "harmony", "harp", "hat", "hate", "hawk", "head", "headlight", "headline", "health", "hearing", "heart", "heat", "heaven", "hedge", "height", "helen", "helicopter", "helium", "hell", "helmet", "help", "hemp", "hen", "heron", "herring", "hexagon", "hill", "himalayan", "hip", "hippopotamus", "history", "hobbies", "hockey", "hoe", "hole", "holiday", "home", "honey", "hood", "hook", "hope", "horn", "horse", "hose", "hospital", "hot", "hour", "hourglass", "house", "hovercraft", "hub", "hubcap", "humidity", "humor", "hurricane", "hyacinth", "hydrant", "hydrofoil", "hydrogen", "hyena", "hygienic", "ice", "icebreaker", "icicle", "icon", "idea", "ikebana", "illegal", "imprisonment", "improvement", "impulse", "inch", "income", "increase", "index", "india", "indonesia", "industry", "ink", "innocent", "input", "insect", "instruction", "instrument", "insulation", "insurance", "interactive", "interest", "internet", "interviewer", "intestine", "invention", "inventory", "invoice", "iran", "iraq", "iris", "iron", "island", "israel", "italian", "italy", "jacket", "jaguar", "jail", "jam", "james", "january", "japan", "japanese", "jar", "jasmine", "jason", "jaw", "jeans", "jeep", "jeff", "jelly", "jellyfish", "jennifer", "jet", "jewel", "jogging", "john", "join", "joke", "joseph", "journey", "judge", "judo", "juice", "july", "jumbo", "jump", "jumper", "june", "jury", "justice", "jute", "kale", "kamikaze", "kangaroo", "karate", "karen", "kayak", "kendo", "kenneth", "kenya", "ketchup", "kettle", "kettledrum", "kevin", "key", "keyboard", "keyboarding", "kick", "kidney", "kilogram", "kilometer", "kimberly", "kiss", "kitchen", "kite", "kitten", "kitty", "knee", "knickers", "knife", "knight", "knot", "knowledge", "kohlrabi", "korean", "laborer", "lace", "ladybug", "lake", "lamb", "lamp", "lan", "land", "landmine", "language", "larch", "lasagna", "latency", "latex", "lathe", "laugh", "laundry", "laura", "law", "lawyer", "layer", "lead", "leaf", "learning", "leather", "leek", "leg", "legal", "lemonade", "lentil", "leo", "leopard", "letter", "lettuce", "level", "libra", "library", "license", "lier", "lift", "light", "lightning", "lilac", "lily", "limit", "linda", "line", "linen", "link", "lion", "lip", "lipstick", "liquid", "liquor", "lisa", "list", "literature", "litter", "liver", "lizard", "llama", "loaf", "loan", "lobster", "lock", "locket", "locust", "look", "loss", "lotion", "love", "low", "lumber", "lunch", "lunchroom", "lung", "lunge", "lute", "luttuce", "lycra", "lynx", "lyocell", "lyre", "lyric", "macaroni", "machine", "macrame", "magazine", "magic", "magician", "maid", "mail", "mailbox", "mailman", "makeup", "malaysia", "male", "mall", "mallet", "man", "manager", "mandolin", "manicure", "manx", "map", "maple", "maraca", "marble", "march", "margaret", "margin", "maria", "marimba", "mark", "market", "married", "mary", "mascara", "mask", "mass", "match", "math", "mattock", "may", "mayonnaise", "meal", "measure", "meat", "mechanic", "medicine", "meeting", "melody", "memory", "men", "menu", "mercury", "message", "metal", "meteorology", "meter", "methane", "mexican", "mexico", "mice", "michael", "michelle", "microwave", "middle", "mile", "milk", "milkshake", "millennium", "millimeter", "millisecond", "mimosa", "mind", "mine", "mini-skirt", "minibus", "minister", "mint", "minute", "mirror", "missile", "mist", "mistake", "mitten", "moat", "modem", "mole", "mom", "monday", "money", "monkey", "month", "moon", "morning", "morocco", "mosque", "mosquito", "mother", "mother-in-law", "motion", "motorboat", "motorcycle", "mountain", "mouse", "moustache", "mouth", "move", "multi-hop", "multimedia", "muscle", "museum", "music", "musician", "mustard", "myanmar", "nail", "name", "nancy", "napkin", "narcissus", "nation", "neck", "need", "needle", "neon", "nepal", "nephew", "nerve", "nest", "net", "network", "news", "newsprint", "newsstand", "nic", "nickel", "niece", "nigeria", "night", "nitrogen", "node", "noise", "noodle", "north", "north america", "north korea", "norwegian", "nose", "note", "notebook", "notify", "novel", "november", "number", "numeric", "nurse", "nut", "nylon", "oak", "oatmeal", "objective", "oboe", "observation", "occupation", "ocean", "ocelot", "octagon", "octave", "october", "octopus", "odometer", "offence", "offer", "office", "oil", "okra", "olive", "onion", "open", "opera", "operation", "ophthalmologist", "opinion", "option", "orange", "orchestra", "orchid", "order", "organ", "organisation", "organization", "ornament", "ostrich", "otter", "ounce", "output", "outrigger", "oval", "oven", "overcoat", "owl", "owner", "ox", "oxygen", "oyster", "package", "packet", "page", "pail", "pain", "paint", "pair", "pajama", "pakistan", "palm", "pamphlet", "pan", "pancake", "pancreas", "panda", "pansy", "panther", "panties", "pantry", "pants", "panty", "pantyhose", "paper", "paperback", "parade", "parallelogram", "parcel", "parent", "parentheses", "park", "parrot", "parsnip", "part", "particle", "partner", "partridge", "party", "passbook", "passenger", "passive", "pasta", "paste", "pastor", "pastry", "patch", "path", "patient", "patio", "patricia", "paul", "payment", "pea", "peace", "peak", "peanut", "pear", "pedestrian", "pediatrician", "peen", "peer-to-peer", "pelican", "pen", "penalty", "pencil", "pendulum", "pentagon", "peony", "pepper", "perch", "perfume", "period", "periodical", "peripheral", "permission", "persian", "person", "peru", "pest", "pet", "pharmacist", "pheasant", "philippines", "philosophy", "phone", "physician", "piano", "piccolo", "pickle", "picture", "pie", "pig", "pigeon", "pike", "pillow", "pilot", "pimple", "pin", "pine", "ping", "pink", "pint", "pipe", "pisces", "pizza", "place", "plain", "plane", "planet", "plant", "plantation", "plaster", "plasterboard", "plastic", "plate", "platinum", "play", "playground", "playroom", "pleasure", "plier", "plot", "plough", "plow", "plywood", "pocket", "poet", "point", "poison", "poland", "police", "policeman", "polish", "politician", "pollution", "polo", "polyester", "pond", "popcorn", "poppy", "population", "porch", "porcupine", "port", "porter", "position", "possibility", "postage", "postbox", "pot", "potato", "poultry", "pound", "powder", "power", "precipitation", "preface", "prepared", "pressure", "price", "priest", "print", "printer", "prison", "probation", "process", "processing", "produce", "product", "production", "professor", "profit", "promotion", "propane", "property", "prose", "prosecution", "protest", "protocol", "pruner", "psychiatrist", "psychology", "ptarmigan", "puffin", "pull", "puma", "pump", "pumpkin", "punch", "punishment", "puppy", "purchase", "purple", "purpose", "push", "pvc", "pyjama", "pyramid", "quail", "quality", "quart", "quarter", "quartz", "queen", "question", "quicksand", "quiet", "quill", "quilt", "quince", "quit", "quiver", "quotation", "rabbi", "rabbit", "racing", "radar", "radiator", "radio", "radish", "raft", "rail", "railway", "rain", "rainbow", "raincoat", "rainstorm", "rake", "ramie", "random", "range", "rat", "rate", "raven", "ravioli", "ray", "rayon", "reaction", "reading", "reason", "receipt", "recess", "record", "recorder", "rectangle", "red", "reduction", "refrigerator", "refund", "regret", "reindeer", "relation", "relative", "religion", "relish", "reminder", "repair", "replace", "report", "representative", "request", "resolution", "respect", "responsibility", "rest", "restaurant", "result", "retailer", "revolve", "revolver", "reward", "rhinoceros", "rhythm", "rice", "richard", "riddle", "rifle", "ring", "rise", "risk", "river", "riverbed", "road", "roadway", "roast", "robert", "robin", "rock", "rocket", "rod", "roll", "romania", "romanian", "ronald", "roof", "room", "rooster", "root", "rose", "rotate", "route", "router", "rowboat", "rub", "rubber", "rugby", "rule", "run", "russia", "russian", "rutabaga", "ruth", "sack", "sagittarius", "sail", "sailboat", "sailor", "salad", "salary", "sale", "salesman", "salmon", "salt", "sampan", "samurai", "sand", "sandra", "sandwich", "santa", "sarah", "sardine", "satin", "saturday", "sauce", "saudi arabia", "sausage", "save", "saw", "saxophone", "scale", "scallion", "scanner", "scarecrow", "scarf", "scene", "scent", "schedule", "school", "science", "scissors", "scooter", "scorpio", "scorpion", "scraper", "screen", "screw", "screwdriver", "sea", "seagull", "seal", "seaplane", "search", "seashore", "season", "seat", "second", "secretary", "secure", "security", "seed", "seeder", "segment", "select", "selection", "self", "semicircle", "semicolon", "sense", "sentence", "separated", "september", "servant", "server", "session", "sex", "shade", "shadow", "shake", "shallot", "shame", "shampoo", "shape", "share", "shark", "sharon", "shears", "sheep", "sheet", "shelf", "shell", "shield", "shingle", "ship", "shirt", "shock", "shoe", "shoemaker", "shop", "shorts", "shoulder", "shovel", "show", "shrimp", "shrine", "siamese", "siberian", "side", "sideboard", "sidecar", "sidewalk", "sign", "signature", "silica", "silk", "silver", "sing", "singer", "single", "sink", "sister", "sister-in-law", "size", "skate", "skiing", "skill", "skin", "skirt", "sky", "slash", "slave", "sled", "sleep", "sleet", "slice", "slime", "slip", "slipper", "slope", "smash", "smell", "smile", "smoke", "snail", "snake", "sneeze", "snow", "snowboarding", "snowflake", "snowman", "snowplow", "snowstorm", "soap", "soccer", "society", "sociology", "sock", "soda", "sofa", "softball", "softdrink", "software", "soil", "soldier", "son", "song", "soprano", "sort", "sound", "soup", "sousaphone", "south africa", "south america", "south korea", "soy", "soybean", "space", "spade", "spaghetti", "spain", "spandex", "spark", "sparrow", "spear", "specialist", "speedboat", "sphere", "sphynx", "spider", "spike", "spinach", "spleen", "sponge", "spoon", "spot", "spring", "sprout", "spruce", "spy", "square", "squash", "squid", "squirrel", "stage", "staircase", "stamp", "star", "start", "starter", "state", "statement", "station", "statistic", "steam", "steel", "stem", "step", "step-aunt", "step-brother", "step-daughter", "step-father", "step-grandfather", "step-grandmother", "step-mother", "step-sister", "step-son", "step-uncle", "stepdaughter", "stepmother", "stepson", "steven", "stew", "stick", "stinger", "stitch", "stock", "stocking", "stomach", "stone", "stool", "stop", "stopsign", "stopwatch", "store", "storm", "story", "stove", "stranger", "straw", "stream", "street", "streetcar", "stretch", "string", "structure", "study", "sturgeon", "submarine", "substance", "subway", "success", "sudan", "suede", "sugar", "suggestion", "suit", "summer", "sun", "sunday", "sundial", "sunflower", "sunshine", "supermarket", "supply", "support", "surfboard", "surgeon", "surname", "surprise", "susan", "sushi", "swallow", "swamp", "swan", "sweater", "sweatshirt", "sweatshop", "swedish", "sweets", "swim", "swimming", "swing", "swiss", "switch", "sword", "swordfish", "sycamore", "syria", "syrup", "system", "t-shirt", "table", "tablecloth", "tabletop", "tachometer", "tadpole", "tail", "tailor", "taiwan", "talk", "tank", "tanker", "tanzania", "target", "taste", "taurus", "tax", "taxi", "taxicab", "tea", "teacher", "teaching", "team", "technician", "teeth", "television", "teller", "temper", "temperature", "temple", "tempo", "tendency", "tennis", "tenor", "tent", "territory", "test", "text", "textbook", "texture", "thailand", "theater", "theory", "thermometer", "thing", "thistle", "thomas", "thought", "thread", "thrill", "throat", "throne", "thumb", "thunder", "thunderstorm", "thursday", "ticket", "tie", "tiger", "tights", "tile", "timbale", "time", "timer", "timpani", "tin", "tip", "tire", "titanium", "title", "toad", "toast", "toe", "toenail", "toilet", "tom-tom", "tomato", "ton", "tongue", "tooth", "toothbrush", "toothpaste", "top", "tornado", "tortellini", "tortoise", "touch", "tower", "town", "toy", "tractor", "trade", "traffic", "trail", "train", "tramp", "transaction", "transmission", "transport", "trapezoid", "tray", "treatment", "tree", "trial", "triangle", "trick", "trigonometry", "trip", "trombone", "trouble", "trousers", "trout", "trowel", "truck", "trumpet", "trunk", "tsunami", "tub", "tuba", "tuesday", "tugboat", "tulip", "tuna", "tune", "turkey", "turkish", "turn", "turnip", "turnover", "turret", "turtle", "tv", "twig", "twilight", "twine", "twist", "typhoon", "tyvek", "uganda", "ukraine", "ukrainian", "umbrella", "uncle", "underclothes", "underpants", "undershirt", "underwear", "unit", "united kingdom", "unshielded", "use", "utensil", "uzbekistan", "vacation", "vacuum", "valley", "value", "van", "var verbs = [aardvark", "vase", "vault", "vegetable", "vegetarian", "veil", "vein", "velvet", "venezuela", "venezuelan", "verdict", "vermicelli", "verse", "vessel", "vest", "veterinarian", "vibraphone", "vietnam", "view", "vinyl", "viola", "violet", "violin", "virgo", "viscose", "vise", "vision", "visitor", "voice", "volcano", "volleyball", "voyage", "vulture", "waiter", "waitress", "walk", "wall", "wallaby", "wallet", "walrus", "war", "warm", "wash", "washer", "wasp", "waste", "watch", "watchmaker", "water", "waterfall", "wave", "wax", "way", "wealth", "weapon", "weasel", "weather", "wedge", "wednesday", "weed", "weeder", "week", "weight", "whale", "wheel", "whip", "whiskey", "whistle", "white", "wholesaler", "whorl", "wilderness", "william", "willow", "wind", "windchime", "window", "windscreen", "windshield", "wine", "wing", "winter", "wire", "wish", "witch", "withdrawal", "witness", "wolf", "woman", "women", "wood", "wool", "woolen", "word", "work", "workshop", "worm", "wound", "wrecker", "wren", "wrench", "wrinkle", "wrist", "writer", "xylophone", "yacht", "yak", "yam", "yard", "yarn", "year", "yellow", "yew", "yogurt", "yoke", "yugoslavian", "zebra", "zephyr", "zinc", "zipper", "zone", "zoo", "zoology" ];
var cities = ["Abbott", "Abernathy", "Abilene", "Abram-Perezville", "Ackerly", "Addison", "Adrian", "Agua Dulce", "Agua Dulce", "Airport Road Addition", "Alamo", "Alamo Heights", "Alba", "Albany", "Aldine", "Aledo", "Alfred-South La Paloma", "Alice", "Alice Acres", "Allen", "Alma", "Alpine", "Alto", "Alto Bonito", "Alton", "Alton North", "Alvarado", "Alvin", "Alvord", "Amarillo", "Ames", "Amherst", "Anahuac", "Anderson", "Anderson Mill", "Andrews", "Angleton", "Angus", "Anna", "Annetta", "Annetta North", "Annetta South", "Annona", "Anson", "Anthony", "Anton", "Appleby", "Aquilla", "Aransas Pass", "Archer City", "Arcola", "Argyle", "Arlington", "Arp", "Arroyo Alto", "Arroyo Colorado Estates", "Arroyo Gardens-La Tina Ranch", "Asherton", "Aspermont", "Atascocita", "Athens", "Atlanta", "Aubrey", "Aurora", "Austin", "Austwell", "Avery", "Avinger", "Azle", "Bacliff", "Bailey", "Bailey'S Prairie", "Baird", "Balch Springs", "Balcones Heights", "Ballinger", "Balmorhea", "Bandera", "Bangs", "Bardwell", "Barrett", "Barry", "Barstow", "Bartlett", "Barton Creek", "Bartonville", "Bastrop", "Batesville", "Bausell And Ellis", "Bay City", "Bayou Vista", "Bayside", "Baytown", "Bayview", "Beach City", "Bear Creek", "Beasley", "Beaumont", "Beckville", "Bedford", "Bee Cave", "Beeville", "Bellaire", "Bellevue", "Bellmead", "Bells", "Bellville", "Belton", "Benavides", "Benbrook", "Benjamin", "Berryville", "Bertram", "Beverly Hills", "Bevil Oaks", "Bigfoot", "Big Lake", "Big Sandy", "Big Spring", "Big Wells", "Bishop", "Bishop Hills", "Bixby", "Blackwell", "Blanco", "Blanket", "Blessing", "Bloomburg", "Blooming Grove", "Bloomington", "Blossom", "Blue Berry Hill", "Blue Mound", "Blue Ridge", "Bluetown-Iglesia Antigua", "Blum", "Boerne", "Bogata", "Boling-Iago", "Bolivar Peninsula", "Bonham", "Bonney", "Booker", "Borger", "Botines", "Bovina", "Bowie", "Box Canyon-Amistad", "Boyd", "Brackettville", "Brady", "Brazoria", "Breckenridge", "Bremond", "Brenham", "Briar", "Briarcliff", "Briaroaks", "Bridge City", "Bridgeport", "Broaddus", "Bronte", "Brookshire", "Brookside Village", "Browndell", "Brownfield", "Brownsboro", "Brownsville", "Brownwood", "Bruceville-Eddy", "Brundage", "Bruni", "Brushy Creek", "Bryan", "Bryson", "Buchanan Dam", "Buckholts", "Buda", "Buffalo", "Buffalo Gap", "Buffalo Springs", "Bullard", "Bulverde", "Buna", "Bunker Hill Village", "Burkburnett", "Burke", "Burleson", "Burnet", "Burton", "Butterfield", "Byers", "Bynum", "Cactus", "Caddo Mills", "Caldwell", "Callisburg", "Calvert", "Cameron", "Cameron Park", "Campbell", "Camp Swift", "Camp Wood", "Canadian", "Caney City", "Canton", "Cantu Addition", "Canutillo", "Canyon", "Canyon Lake", "Carbon", "Carl'S Corner", "Carmine", "Carrizo Hill", "Carrizo Springs", "Carrollton", "Carthage", "Castle Hills", "Castroville", "Catarina", "Cedar Hill", "Cedar Park", "Celeste", "Celina", "Center", "Centerville", "Central Gardens", "Cesar Chavez", "Chandler", "Channelview", "Channing", "Charlotte", "Chester", "Chico", "Childress", "Chillicothe", "China", "China Grove", "Chireno", "Christine", "Christoval", "Chula Vista-Orason", "Chula Vista-River Spur", "Cibolo", "Cienegas Terrace", "Cinco Ranch", "Circle D-Kc Estates", "Cisco", "Citrus City", "Clarendon", "Clarksville", "Clarksville City", "Claude", "Clear Lake Shores", "Cleburne", "Cleveland", "Clifton", "Clint", "Cloverleaf", "Clute", "Clyde", "Coahoma", "Cockrell Hill", "Coffee City", "Coldspring", "Coleman", "College Station", "Colleyville", "Collinsville", "Colmesneil", "Colorado City", "Columbus", "Comanche", "Combes", "Combine", "Comfort", "Commerce", "Como", "Concepcion", "Conroe", "Converse", "Cool", "Coolidge", "Cooper", "Coppell", "Copperas Cove", "Copper Canyon", "Corinth", "Corpus Christi", "Corral City", "Corrigan", "Corsicana", "Cottonwood", "Cottonwood Shores", "Cotulla", "Cove", "Covington", "Coyanosa", "Coyote Acres", "Crandall", "Crane", "Cranfills Gap", "Crawford", "Creedmoor", "Crockett", "Crosby", "Crosbyton", "Cross Mountain", "Cross Plains", "Cross Roads", "Cross Timber", "Crowell", "Crowley", "Crystal City", "Cuero", "Cuevitas", "Cumby", "Cumings", "Cuney", "Cushing", "Cut And Shoot", "Daingerfield", "Daisetta", "Dalhart", "Dallas", "Dalworthington Gardens", "Damon", "Danbury", "Darrouzett", "Dawson", "Dayton", "Dayton Lakes", "Dean", "Decatur", "Deer Park", "De Kalb", "De Leon", "Dell City", "Del Mar Heights", "Del Rio", "Del Sol-Loma Linda", "Denison", "Denton", "Denver City", "Deport", "Desoto", "Detroit", "Devers", "Devine", "Deweyville", "Diboll", "Dickens", "Dickinson", "Dilley", "Dimmitt", "Dodd City", "Dodson", "Doffing", "Domino", "Donna", "Doolittle", "Dorchester", "Double Oak", "Douglassville", "Doyle", "Dripping Springs", "Driscoll", "Dublin", "Dumas", "Duncanville", "Eagle Lake", "Eagle Mountain", "Eagle Pass", "Early", "Earth", "East Bernard", "Eastland", "East Mountain", "Easton", "East Tawakoni", "Ector", "Edcouch", "Eden", "Edgecliff Village", "Edgewater-Paisano", "Edgewood", "Edinburg", "Edmonson", "Edna", "Edom", "Edroy", "Eidson Road", "Elbert", "El Camino Angosto", "El Campo", "El Cenizo", "Eldorado", "Electra", "Elgin", "El Indio", "Elkhart", "El Lago", "Elm Creek", "Elmendorf", "El Paso", "El Refugio", "Elsa", "Emhouse", "Emory", "Encantada-Ranchito El Calaboz", "Enchanted Oaks", "Encinal", "Encino", "Ennis", "Escobares", "Estelline", "Euless", "Eureka", "Eustace", "Evadale", "Evant", "Everman", "Fabens", "Fairchilds", "Fairfield", "Fair Oaks Ranch", "Fairview", "Falcon Heights", "Falcon Lake Estates", "Falcon Mesa", "Falcon Village", "Falfurrias", "Falls City", "Falman-County Acres", "Farmers Branch", "Farmersville", "Farwell", "Fate", "Fayetteville", "Faysville", "Ferris", "Fifth Street", "Flatonia", "Florence", "Floresville", "Flowella", "Flower Mound", "Floydada", "Follett", "Forest Hill", "Forney", "Forsan", "Fort Bliss", "Fort Davis", "Fort Hancock", "Fort Hood", "Fort Stockton", "Fort Worth", "Four Corners", "Fowlerton", "Franklin", "Frankston", "Fredericksburg", "Freeport", "Freer", "Fresno", "Friendswood", "Friona", "Frisco", "Fritch", "Fronton", "Frost", "Fruitvale", "Fulshear", "Fulton", "Gainesville", "Galena Park", "Gallatin", "Galveston", "Ganado", "Garceno", "Gardendale", "Garden Ridge", "Garfield", "Garland", "Garrett", "Garrison", "Gary City", "Gatesville", "Georgetown", "George West", "Geronimo", "Gholson", "Giddings", "Gilmer", "Girard", "Gladewater", "Glenn Heights", "Glen Rose", "Godley", "Goldsmith", "Goldthwaite", "Goliad", "Golinda", "Gonzales", "Goodlow", "Goodrich", "Gordon", "Goree", "Gorman", "Graford", "Graham", "Granbury", "Grand Acres", "Grandfalls", "Grand Prairie", "Grand Saline", "Grandview", "Granger", "Granite Shoals", "Granjeno", "Grape Creek", "Grapeland", "Grapevine", "Grays Prairie", "Greatwood", "Green Valley Farms", "Greenville", "Gregory", "Grey Forest", "Groesbeck", "Groom", "Groves", "Groveton", "Gruver", "Guerra", "Gun Barrel City", "Gunter", "Gustine", "Hackberry", "Hale Center", "Hallettsville", "Hallsburg", "Hallsville", "Haltom City", "Hamilton", "Hamlin", "Happy", "Hardin", "Harker Heights", "Harlingen", "Harper", "Hart", "Hartley", "Haskell", "Haslet", "Havana", "Hawk Cove", "Hawkins", "Hawley", "Hays", "Hearne", "Heath", "Hebbronville", "Hebron", "Hedley", "Hedwig Village", "Heidelberg", "Helotes", "Hemphill", "Hempstead", "Henderson", "Henrietta", "Hereford", "Hermleigh", "Hewitt", "Hickory Creek", "Hico", "Hidalgo", "Higgins", "Highland Haven", "Highland Park", "Highlands", "Highland Village", "Hill Country Village", "Hillcrest", "Hillsboro", "Hilltop", "Hilshire Village", "Hitchcock", "Holiday Lakes", "Holland", "Holliday", "Hollywood Park", "Homestead Meadows North", "Homestead Meadows South", "Hondo", "Honey Grove", "Hooks", "Horizon City", "Horseshoe Bay", "Houston", "Howardwick", "Howe", "Hubbard", "Hudson", "Hudson Bend", "Hudson Oaks", "Hughes Springs", "Humble", "Hungerford", "Hunters Creek Village", "Huntington", "Huntsville", "Hurst", "Hutchins", "Hutto", "Huxley", "Idalou", "Impact", "Imperial", "Indian Hills", "Indian Lake", "Industry", "Inez", "Ingleside", "Ingleside On The Bay", "Ingram", "Iowa Colony", "Iowa Park", "Iraan", "Iredell", "Irving", "Italy", "Itasca", "Jacinto City", "Jacksboro", "Jacksonville", "Jamaica Beach", "Jasper", "Jayton", "Jefferson", "Jersey Village", "Jewett", "Joaquin", "Johnson City", "Jolly", "Jollyville", "Jones Creek", "Jonestown", "Josephine", "Joshua", "Jourdanton", "Junction", "Justin", "Karnes City", "Katy", "Kaufman", "K-Bar Ranch", "Keene", "Keller", "Kemah", "Kemp", "Kempner", "Kendleton", "Kenedy", "Kenefick", "Kennard", "Kennedale", "Kerens", "Kermit", "Kerrville", "Kilgore", "Killeen", "Kingsbury", "Kingsland", "Kingsville", "Kirby", "Kirbyville", "Kirvin", "Knippa", "Knollwood", "Knox City", "Kosse", "Kountze", "Kress", "Krugerville", "Krum", "Kyle", "La Blanca", "La Casita-Garciasville", "Lackland Afb", "Lacoste", "Lacy-Lakeview", "Ladonia", "La Feria", "La Feria North", "Lago", "Lago Vista", "La Grange", "La Grulla", "Laguna Heights", "Laguna Seca", "Laguna Vista", "La Homa", "La Joya", "Lake Bridgeport", "Lake Brownwood", "Lake City", "Lake Dallas", "Lakehills", "Lake Jackson", "Lake Kiowa", "Lakeport", "Lakeshore Gardens-Hidden Acres", "Lakeside", "Lakeside", "Lakeside City", "Lake Tanglewood", "Lakeview", "Lake View", "Lakeway", "Lakewood Village", "Lake Worth", "La Marque", "Lamesa", "Lampasas", "Lancaster", "La Paloma", "La Paloma-Lost Creek", "La Porte", "La Presa", "La Pryor", "La Puerta", "Laredo", "Laredo Ranchettes", "Larga Vista", "La Rosita", "Lasana", "Lasara", "Las Colonias", "Las Lomas", "Las Lomitas", "Las Palmas-Juarez", "Las Quintas Fronterizas", "Latexo", "Laughlin Afb", "Laureles", "La Vernia", "La Victoria", "La Villa", "Lavon", "La Ward", "Lawn", "League City", "Leakey", "Leander", "Leary", "Lefors", "Leona", "Leonard", "Leon Valley", "Leroy", "Levelland", "Lewisville", "Lexington", "Liberty", "Liberty City", "Liberty Hill", "Lincoln Park", "Lindale", "Linden", "Lindsay", "Lindsay", "Lipan", "Lipscomb", "Little Elm", "Littlefield", "Little River-Academy", "Live Oak", "Liverpool", "Livingston", "Llano", "Llano Grande", "Lockhart", "Lockney", "Log Cabin", "Lolita", "Loma Linda East", "Lometa", "Lone Oak", "Lone Star", "Longview", "Lopeno", "Lopezville", "Loraine", "Lorena", "Lorenzo", "Los Alvarez", "Los Angeles Subdivision", "Los Ebanos", "Los Fresnos", "Los Indios", "Lost Creek", "Los Villareales", "Los Ybanez", "Lott", "Louise", "Lovelady", "Lowry Crossing", "Lozano", "Lubbock", "Lucas", "Lueders", "Lufkin", "Luling", "Lumberton", "Lyford", "Lyford South", "Lytle", "Mabank", "Mcallen", "Mccamey", "Mcgregor", "Mckinney", "Mclean", "Mclendon-Chisholm", "Mcqueeney", "Madisonville", "Magnolia", "Malakoff", "Malone", "Manor", "Mansfield", "Manvel", "Marathon", "Marble Falls", "Marfa", "Marietta", "Marion", "Markham", "Marlin", "Marquez", "Marshall", "Marshall Creek", "Mart", "Martindale", "Mason", "Matador", "Mathis", "Maud", "Mauriceville", "Maypearl", "Meadow", "Meadowlakes", "Meadows Place", "Medina", "Megargel", "Melissa", "Melvin", "Memphis", "Menard", "Mercedes", "Meridian", "Merkel", "Mertens", "Mertzon", "Mesquite", "Mexia", "Miami", "Midland", "Midlothian", "Midway", "Midway North", "Midway South", "Mila Doce", "Milam", "Milano", "Mildred", "Miles", "Milford", "Miller'S Cove", "Millican", "Millsap", "Mineola", "Mineral Wells", "Mingus", "Mirando City", "Mission", "Mission Bend", "Missouri City", "Mobeetie", "Mobile City", "Monahans", "Mont Belvieu", "Monte Alto", "Montgomery", "Moody", "Moore", "Moore Station", "Morales-Sanchez", "Moran", "Morgan", "Morgan Farm Area", "Morgan'S Point", "Morgan'S Point Resort", "Morning Glory", "Morse", "Morton", "Moulton", "Mountain City", "Mount Calm", "Mount Enterprise", "Mount Pleasant", "Mount Vernon", "Muenster", "Muleshoe", "Mullin", "Munday", "Muniz", "Murchison", "Murphy", "Mustang", "Mustang Ridge", "Nacogdoches", "Naples", "Nash", "Nassau Bay", "Natalia", "Navarro", "Navasota", "Nazareth", "Nederland", "Needville", "Nesbitt", "Nevada", "Newark", "New Berlin", "New Boston", "New Braunfels", "Newcastle", "New Chapel Hill", "New Deal", "New Fairview", "New Falcon", "New Home", "New Hope", "New London", "New Summerfield", "New Territory", "Newton", "New Waverly", "Neylandville", "Niederwald", "Nixon", "Nocona", "Nolanville", "Nome", "Noonday", "Nordheim", "Normangee", "Normanna", "North Alamo", "North Cleveland", "Northcliff", "North Escobares", "Northlake", "North Pearsall", "North Richland Hills", "North San Pedro", "Novice", "Nurillo", "Oak Grove", "Oakhurst", "Oak Leaf", "Oak Point", "Oak Ridge", "Oak Ridge", "Oak Ridge North", "Oak Trail Shores", "Oak Valley", "Oakwood", "O'Brien", "Odem", "Odessa", "O'Donnell", "Oglesby", "Oilton", "Old River-Winfree", "Olivarez", "Olmito", "Olmos Park", "Olney", "Olton", "Omaha", "Onalaska", "Onion Creek", "Opdyke West", "Orange", "Orange Grove", "Orchard", "Ore City", "Overton", "Ovilla", "Owl Ranch-Amargosa", "Oyster Creek", "O", "Paducah", "Paint Rock", "Palacios", "Palestine", "Palisades", "Palmer", "Palmhurst", "Palm Valley", "Palmview", "Palmview South", "Pampa", "Panhandle", "Panorama Village", "Pantego", "Paradise", "Paris", "Parker", "Pasadena", "Pattison", "Patton Village", "Pawnee", "Payne Springs", "Pearland", "Pearsall", "Pecan Acres", "Pecan Gap", "Pecan Grove", "Pecan Hill", "Pecan Plantation", "Pecos", "Pelican Bay", "Penelope", "Penitas", "Pernitas Point", "Perryton", "Petersburg", "Petrolia", "Petronila", "Pettus", "Pflugerville", "Pharr", "Pilot Point", "Pine Forest", "Pinehurst", "Pinehurst", "Pine Island", "Pineland", "Pinewood Estates", "Piney Point Village", "Pittsburg", "Plains", "Plainview", "Plano", "Pleak", "Pleasanton", "Pleasant Valley", "Plum Grove", "Point", "Point Blank", "Point Comfort", "Ponder", "Port Aransas", "Port Arthur", "Porter Heights", "Port Isabel", "Portland", "Port Lavaca", "Port Mansfield", "Port Neches", "Post", "Post Oak Bend City", "Poteet", "Poth", "Potosi", "Pottsboro", "Powell", "Poynor", "Prado Verde", "Prairie View", "Premont", "Presidio", "Primera", "Princeton", "Progreso", "Progreso Lakes", "Prosper", "Putnam", "Pyote", "Quail", "Quanah", "Queen City", "Quemado", "Quinlan", "Quintana", "Quitaque", "Quitman", "Radar Base", "Ralls", "Ranchette Estates", "Ranchitos Las Lomas", "Rancho Alegre", "Rancho Banquete", "Rancho Chico", "Ranchos Penitas West", "Rancho Viejo", "Ranger", "Rangerville", "Rankin", "Ransom Canyon", "Ratamosa", "Ravenna", "Raymondville", "Realitos", "Redford", "Red Lick", "Red Oak", "Redwater", "Redwood", "Reese Center", "Refugio", "Reid Hope King", "Reklaw", "Relampago", "Rendon", "Reno", "Reno", "Retreat", "Rhome", "Rice", "Richardson", "Richland", "Richland Hills", "Richland Springs", "Richmond", "Richwood", "Riesel", "Rio Bravo", "Rio Grande City", "Rio Hondo", "Rio Vista", "Rising Star", "River Oaks", "Riverside", "Roanoke", "Roaring Springs", "Robert Lee", "Robinson", "Robstown", "Roby", "Rochester", "Rockdale", "Rockport", "Rocksprings", "Rockwall", "Rocky Mound", "Rogers", "Rollingwood", "Roma", "Roma Creek", "Roman Forest", "Ropesville", "Roscoe", "Rosebud", "Rose City", "Rose Hill Acres", "Rosenberg", "Rosita North", "Rosita South", "Ross", "Rosser", "Rotan", "Round Mountain", "Round Rock", "Round Top", "Rowlett", "Roxton", "Royse City", "Rule", "Runaway Bay", "Runge", "Rusk", "Sabinal", "Sachse", "Sadler", "Saginaw", "St. Hedwig", "St. Jo", "St. Paul", "St. Paul", "Salado", "Salineno", "Samnorwood", "San Angelo", "San Antonio", "San Augustine", "San Benito", "San Carlos", "Sanctuary", "Sanderson", "Sandia", "San Diego", "Sandy Hollow-Escondidas", "San Elizario", "San Felipe", "Sanford", "Sanger", "San Ignacio", "San Isidro", "San Juan", "San Leanna", "San Leon", "San Manuel-Linn", "San Marcos", "San Patricio", "San Pedro", "San Perlita", "San Saba", "Sansom Park", "Santa Anna", "Santa Clara", "Santa Cruz", "Santa Fe", "Santa Maria", "Santa Monica", "Santa Rosa", "Savoy", "Scenic Oaks", "Schertz", "Schulenburg", "Scissors", "Scotland", "Scottsville", "Seabrook", "Seadrift", "Seagoville", "Seagraves", "Sealy", "Sebastian", "Seguin", "Selma", "Seminole", "Serenada", "Seth Ward", "Seven Oaks", "Seven Points", "Seymour", "Shady Hollow", "Shady Shores", "Shallowater", "Shamrock", "Shavano Park", "Sheldon", "Shenandoah", "Shepherd", "Sherman", "Shiner", "Shoreacres", "Sienna Plantation", "Sierra Blanca", "Siesta Shores", "Silsbee", "Silverton", "Simonton", "Sinton", "Skellytown", "Skidmore", "Slaton", "Smiley", "Smithville", "Smyer", "Snook", "Snyder", "Socorro", "Solis", "Somerset", "Somerville", "Sonora", "Sour Lake", "South Alamo", "South Fork Estates", "South Houston", "Southlake", "Southmayd", "South Mountain", "South Padre Island", "South Point", "Southside Place", "South Toledo Bend", "Spade", "Sparks", "Spearman", "Splendora", "Spofford", "Spring", "Spring Garden-Terra Verde", "Springlake", "Springtown", "Spring Valley", "Spur", "Stafford", "Stagecoach", "Stamford", "Stanton", "Star Harbor", "Stephenville", "Sterling City", "Stinnett", "Stockdale", "Stonewall", "Stowell", "Stratford", "Strawn", "Streetman", "Study Butte-Terlingua", "Sudan", "Sugar Land", "Sullivan City", "Sulphur Springs", "Sundown", "Sunnyvale", "Sunray", "Sunrise Beach Village", "Sunset", "Sunset Valley", "Sun Valley", "Surfside Beach", "Sweeny", "Sweetwater", "Taft", "Taft Southwest", "Tahoka", "Talco", "Talty", "Tatum", "Taylor", "Taylor Lake Village", "Teague", "Tehuacana", "Temple", "Tenaha", "Terrell", "Terrell Hills", "Texarkana", "Texas City", "Texhoma", "Texline", "The Colony", "The Hills", "The Woodlands", "Thompsons", "Thorndale", "Thornton", "Thorntonville", "Thrall", "Three Rivers", "Throckmorton", "Tierra Bonita", "Tierra Grande", "Tiki Island", "Timbercreek Canyon", "Timberwood Park", "Timpson", "Tioga", "Tira", "Toco", "Todd Mission", "Tolar", "Tomball", "Tom Bean", "Tool", "Tornillo", "Toyah", "Tradewinds", "Trent", "Trenton", "Trinidad", "Trinity", "Trophy Club", "Troup", "Troy", "Tuleta", "Tulia", "Tulsita", "Turkey", "Tuscola", "Tye", "Tyler", "Tynan", "Uhland", "Uncertain", "Union Grove", "Universal City", "University Park", "Utopia", "Uvalde", "Uvalde Estates", "Valentine", "Valley Mills", "Valley View", "Val Verde Park", "Van", "Van Alstyne", "Vanderbilt", "Van Horn", "Van Vleck", "Vega", "Venus", "Vernon", "Victoria", "Vidor", "Villa Del Sol", "Villa Pancho", "Villa Verde", "Vinton", "Waco", "Waelder", "Wake Village", "Waller", "Wallis", "Walnut Springs", "Warren City", "Waskom", "Watauga", "Waxahachie", "Weatherford", "Webster", "Weimar", "Weinert", "Weir", "Wellington", "Wellman", "Wells", "Wells Branch", "Weslaco", "West", "Westbrook", "West Columbia", "Westdale", "Westlake", "West Lake Hills", "West Livingston", "Westminster", "West Odessa", "Weston", "West Orange", "Westover Hills", "West Pearsall", "West Sharyland", "West Tawakoni", "West University Place", "Westway", "Westworth Village", "Wharton", "Wheeler", "White Deer", "Whiteface", "Whitehouse", "White Oak", "Whitesboro", "White Settlement", "Whitewright", "Whitney", "Wichita Falls", "Wickett", "Wild Peach Village", "Willamar", "Willis", "Willow Park", "Wills Point", "Wilmer", "Wilson", "Wimberley", "Windcrest", "Windemere", "Windom", "Windthorst", "Winfield", "Wink", "Winnie", "Winnsboro", "Winona", "Winters", "Wixon Valley", "Wolfe City", "Wolfforth", "Woodbranch", "Woodcreek", "Woodloch", "Woodsboro", "Woodson", "Woodville", "Woodway", "Wortham", "Wyldwood", "Wylie", "Yantis", "Yoakum", "Yorktown", "Yznaga", "Zapata", "Zapata Ranch", "Zavalla", "Zuehl"];
var verbs = ["accept", "add", "admire", "admit", "advise", "afford", "agree", "alert", "allow", "amuse", "analyse", "announce", "annoy", "answer", "apologise", "appear", "applaud", "appreciate", "approve", "argue", "arrange", "arrest", "arrive", "ask", "attach", "attack", "attempt", "attend", "attract", "avoid", "back", "bake", "balance", "ban", "bang", "bare", "bat", "bathe", "battle", "beam", "beg", "behave", "belong", "bleach", "bless", "blind", "blink", "blot", "blush", "boast", "boil", "bolt", "bomb", "book", "bore", "borrow", "bounce", "bow", "box", "brake", "branch", "breathe", "bruise", "brush", "bubble", "bump", "burn", "bury", "buzz", "calculate", "call", "camp", "care", "carry", "carve", "cause", "challenge", "change", "charge", "chase", "cheat", "check", "cheer", "chew", "choke", "chop", "claim", "clap", "clean", "clear", "clip", "close", "coach", "coil", "collect", "colour", "comb", "command", "communicate", "compare", "compete", "complain", "complete", "concentrate", "concern", "confess", "confuse", "connect", "consider", "consist", "contain", "continue", "copy", "correct", "cough", "count", "cover", "crack", "crash", "crawl", "cross", "crush", "cry", "cure", "curl", "curve", "cycle", "dam", "damage", "dance", "dare", "decay", "deceive", "decide", "decorate", "delay", "delight", "deliver", "depend", "describe", "desert", "deserve", "destroy", "detect", "develop", "disagree", "disappear", "disapprove", "disarm", "discover", "dislike", "divide", "double", "doubt", "drag", "drain", "dream", "dress", "drip", "drop", "drown", "drum", "dry", "dust", "earn", "educate", "embarrass", "employ", "empty", "encourage", "end", "enjoy", "enter", "entertain", "escape", "examine", "excite", "excuse", "exercise", "exist", "expand", "expect", "explain", "explode", "extend", "face", "fade", "fail", "fancy", "fasten", "fax", "fear", "fence", "fetch", "file", "fill", "film", "fire", "fit", "fix", "flap", "flash", "float", "flood", "flow", "flower", "fold", "follow", "fool", "force", "form", "found", "frame", "frighten", "fry", "gather", "gaze", "glow", "glue", "grab", "grate", "grease", "greet", "grin", "grip", "groan", "guarantee", "guard", "guess", "guide", "hammer", "hand", "handle", "hang", "happen", "harass", "harm", "hate", "haunt", "head", "heal", "heap", "heat", "help", "hook", "hop", "hope", "hover", "hug", "hum", "hunt", "hurry", "identify", "ignore", "imagine", "impress", "improve", "include", "increase", "influence", "inform", "inject", "injure", "instruct", "intend", "interest", "interfere", "interrupt", "introduce", "invent", "invite", "irritate", "itch", "jail", "jam", "jog", "join", "joke", "judge", "juggle", "jump", "kick", "kill", "kiss", "kneel", "knit", "knock", "knot", "label", "land", "last", "laugh", "launch", "learn", "level", "license", "lick", "lie", "lighten", "like", "list", "listen", "live", "load", "lock", "long", "look", "love", "man", "manage", "march", "mark", "marry", "match", "mate", "matter", "measure", "meddle", "melt", "memorise", "mend", "mess up", "milk", "mine", "miss", "mix", "moan", "moor", "mourn", "move", "muddle", "mug", "multiply", "murder", "nail", "name", "need", "nest", "nod", "note", "notice", "number", "obey", "object", "observe", "obtain", "occur", "offend", "offer", "open", "order", "overflow", "owe", "own", "pack", "paddle", "paint", "park", "part", "pass", "paste", "pat", "pause", "peck", "pedal", "peel", "peep", "perform", "permit", "phone", "pick", "pinch", "pine", "place", "plan", "plant", "play", "please", "plug", "point", "poke", "polish", "pop", "possess", "post", "pour", "practise", "pray", "preach", "precede", "prefer", "prepare", "present", "preserve", "press", "pretend", "prevent", "prick", "print", "produce", "program", "promise", "protect", "provide", "pull", "pump", "punch", "puncture", "punish", "push", "question", "queue", "race", "radiate", "rain", "raise", "reach", "realise", "receive", "recognise", "record", "reduce", "reflect", "refuse", "regret", "reign", "reject", "rejoice", "relax", "release", "rely", "remain", "remember", "remind", "remove", "repair", "repeat", "replace", "reply", "report", "reproduce", "request", "rescue", "retire", "return", "rhyme", "rinse", "risk", "rob", "rock", "roll", "rot", "rub", "ruin", "rule", "rush", "sack", "sail", "satisfy", "save", "saw", "scare", "scatter", "scold", "scorch", "scrape", "scratch", "scream", "screw", "scribble", "scrub", "seal", "search", "separate", "serve", "settle", "shade", "share", "shave", "shelter", "shiver", "shock", "shop", "shrug", "sigh", "sign", "signal", "sin", "sip", "ski", "skip", "slap", "slip", "slow", "smash", "smell", "smile", "smoke", "snatch", "sneeze", "sniff", "snore", "snow", "soak", "soothe", "sound", "spare", "spark", "sparkle", "spell", "spill", "spoil", "spot", "spray", "sprout", "squash", "squeak", "squeal", "squeeze", "stain", "stamp", "stare", "start", "stay", "steer", "step", "stir", "stitch", "stop", "store", "strap", "strengthen", "stretch", "strip", "stroke", "stuff", "subtract", "succeed", "suck", "suffer", "suggest", "suit", "supply", "support", "suppose", "surprise", "surround", "suspect", "suspend", "switch", "talk", "tame", "tap", "taste", "tease", "telephone", "tempt", "terrify", "test", "thank", "thaw", "tick", "tickle", "tie", "time", "tip", "tire", "touch", "tour", "tow", "trace", "trade", "train", "transport", "trap", "travel", "treat", "tremble", "trick", "trip", "trot", "trouble", "trust", "try", "tug", "tumble", "turn", "twist", "type", "undress", "unfasten", "unite", "unlock", "unpack", "untidy", "use", "vanish", "visit", "wail", "wait", "walk", "wander", "want", "warm", "warn", "wash", "waste", "watch", "water", "wave", "weigh", "welcome", "whine", "whip", "whirl", "whisper", "whistle", "wink", "wipe", "wish", "wobble", "wonder", "work", "worry", "wrap", "wreck", "wrestle", "wriggle", "x-ray", "yawn", "yell", "zip", "zoom"];
var stopwords_4 = ['about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can', 'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had', 'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into', 'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must', 'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over', 'said', 'same', 'should', 'since', 'some', 'still', 'such', 'take', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were', 'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i'];
var stopwords_5 = ["a","a's","able","about","above","according","accordingly","across","actually","after","afterwards","again","against","ain't","all","allow","allows","almost","alone","along","already","also","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","aside","ask","asking","associated","at","available","away","awfully","b","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","c'mon","c's","came","can","can't","cannot","cant","cause","causes","certain","certainly","changes","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","currently","d","definitely","described","despite","did","didn't","different","do","does","doesn't","doing","don't","done","down","downwards","during","e","each","edu","eg","eight","either","else","elsewhere","enough","entirely","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","far","few","fifth","first","five","followed","following","follows","for","former","formerly","forth","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","happens","hardly","has","hasn't","have","haven't","having","he","he's","hello","help","hence","her","here","here's","hereafter","hereby","herein","hereupon","hers","herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i","i'd","i'll","i'm","i've","ie","if","ignored","immediate","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","into","inward","is","isn't","it","it'd","it'll","it's","its","itself","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","little","look","looking","looks","ltd","m","mainly","many","may","maybe","me","mean","meanwhile","merely","might","more","moreover","most","mostly","much","must","my","myself","n","name","namely","nd","near","nearly","necessary","need","needs","neither","never","nevertheless","new","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","per","perhaps","placed","please","plus","possible","presumably","probably","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","shouldn't","since","six","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","t's","take","taken","tell","tends","th","than","thank","thanks","thanx","that","that's","thats","the","their","theirs","them","themselves","then","thence","there","there's","thereafter","thereby","therefore","therein","theres","thereupon","these","they","they'd","they'll","they're","they've","think","third","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","to","together","too","took","toward","towards","tried","tries","truly","try","trying","twice","two","u","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","uucp","v","value","various","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","we'll","we're","we've","welcome","well","went","were","weren't","what","what's","whatever","when","whence","whenever","where","where's","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","who's","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","won't","wonder","would","wouldn't","x","y","yes","yet","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","z","zero","'s","did","do","in","give","count","amount","code","does","Within","do","dies","can","correct","equal","greater","lesser","less","than","great","to","number","date","place","birth place","birthday","dead place"," means","name","country","person","id"];
var Interrogate_words = ["?", "which", "what", "whose", "when", "who", "whom", "where", "how", "why", "whether", "whatsoever", "whither", "whence", "whatever", "wherever"];
var Interrogate_words2 = [...Interrogate_words, "did", "dies", "'s", "do", "does", "give", ,"in","give","count","amount","code","does","Within","do","dies","can","correct","equal","greater","lesser","less","than","great","to","number","date","place","birth place","birthday","dead place"," means","name","country","person","id","company","album","river","lyrics","child","profession","gameplay","artist","railway","city","is"];
var nouns3 = ["eternal", "spotless", "lloyd", "richards", "demons", "winter", "asian", "united states", "ronnie", "mcdowell", "episode", "xenosaga", "airline", "whence", "bartok", "bela", "man", "women", "Orlando", "people", "fish"];
var RL_rwords = [...stopwords_1, ...nouns, ...nouns2, ...nouns3, ...cities ]
var wds = [...stopwords_1, ...stopwords_2, ...stopwords_3, ...stopwords_4, ...stopwords_5, ...Interrogate_words]; 
var rwords = wds.filter(function(item, pos) {
  return wds.indexOf(item) == pos;
})
var tokens_RL = [...nouns, ...nouns2, ...nouns3, ...verbs,"where","what","who","which","successor","relatives","relation","opponents","gameplay","recorded","failure","character","dishes","dreamWorks","company","industry","industry","created","write","books","book","fiction","distributor","distributed","developed","developer","starring","cast","member","actress","television","title","newspaper","buried","produce","classified","tactical","shooter","periodical","includes","cartoonist","name","ingredient","main","former","team","teams","executive","gender","authorities","local","alma","mater","tombs","tomb","museum","station","railway","borough","died","position","ethnicity","out","outflow","flow","into","constituency","primates","order","subsequent","work","distributor","teacher","role-playing","Antilles","islands","archipelago","macpherson","work","as","series","serie","businessman","write","field","form","affiliations","sport","institutions","association","founder","found","charge","kinds","conflict","engineering","area","management","led","band","township","spouse","speaks","serie","series","famous","track","wrote","community","source","mouth","battle","military","involved","world","service","award","singles","multiplayer","featured","academic","advisor","scientist","prizes","strategy","interred","rating","won","win","partner","song","cinematography","monitors","sign","team","hospitality","influence","influenced","label","racist","virtual","console","games","play","race","ethnicity","state","origin","profession","occupation","period","identified","movement","possesses","parent","children","child","song","language","speculative","titles","fiction","houses","legislature","owner","owns","leader","bandleader","records","distributed","writer","industry","companies","company","described","part","category","operator","produces","operated","trains","disease","nicknames","nickname","known","founder","hometown","home","town","written","fiction","book","format","released","episode","direct","garrison","garrisoned","mode","modes","parent","province","time","zone","origin","medicine","spoken","bridges","river","contained","hometown","participated","produceé,","industry","agent","nintendo","publish","citizenship","nationality","battle","wars","player","silent","license","relatives","historical","modes","available","pool","arcade","raconteurs","key","people","non-profit","organisations","label","track","know","orgin","won","awards","producer","written","records","highschool","school","mascot","fighting","animal","done","distributor","religion","pratices","sea","cities","flows","into","venue","hosted","job","judged","judges","instrument","was","created","film","movie","production","studio","location","edited","by","play","state","type","produced","due to","kind","kinds","president","hold","authors","publisher","wrote","video","game","specific","valley","municipalities","neighboring","screenwriter","occupation","drawn","picasso","ideology","party","communist","associated","professional","astronaut","for","deep","author","composer","song","lyric","symphony","starred","of","the","death","from","place","contained","written","founding","date","position","play","artist","name","albums","islands","birthplace","states","germany","die","location","birth","created","directed","founded","played","kept","remains","resting","county","heights","district","example","album","rock","genre","music","kind","was","born","town","city","state","writter","airline","organization","cinematographer","developer","in","located","is","a","locations","within","united states","record","produced","by","kind","of","art","like","series","belong"]
var RLTokens_toExtract = tokens_RL.filter(function(item, pos) {
  return tokens_RL.indexOf(item) == pos;
})
var tokens_EL = [...rwords,"END_EL","created","orginally","born","live","burial","produced","produce","play","involved","what's","where's","who's","did", "dies","do", "does", "give", ,"in","give","married","directed","recorded","albums","purposes","located","directed"]
var ELTokens_probited = tokens_EL.filter(function(item, pos) {
  return tokens_EL.indexOf(item) == pos;
})
var El_lastFilter=["type of film","written","woman","male","towns","films","live","town","city","position","the organization","of music","type of music","conflict","started","genre of music","member","battle","artist","provide","view","child","spoken","spoke","born","the organisation","ne","party","of","the", "of the","determined","sibling","student","school","language","competitor"]

//API EndPoints
var URL_wdok = new URL("https://query.wikidata.org/sparql");
var URL_wd = new URL("https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org");
var url_wpd = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageprops&ppprop=wikibase_item&redirects=1&titles=";
var url_wpd_new = "https://en.wikipedia.org/w/api.php?action=query&generator=allpages&prop=pageprops|info&inprop=url&ppprop=wikibase_item&gaplimit=5&gapfrom=";

//To pause the execution
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
//Remove_stopwords
function remove_words(str,wordsList) {
  res = []
  words = str.split(' ')
  for(i=0;i<words.length;i++) {
     word_clean = words[i].split(".").join("")
     if(!wordsList.includes(word_clean.toLowerCase())) {
         res.push(word_clean)
     }
  }
  return(res.join(' '))
}
//Extract_words
function extract_words(str,wordsList) {
  res = []
  words = str.split(' ')
  for(let i=0;i<words.length;i++) {
     word_clean = words[i].split(".").join("")
     if(wordsList.includes(word_clean.toLowerCase())) {
         res.push(word_clean)
     }
  }
  return(res.join(' '))
}
//preprocesisng string var
function pre_process(s){
  const regex = /[!"#$%&()*+-./:;<=>?@[\]^_`{|}~]/g;//,
  let clean_string = ""; 
  s = fixUtf8(s);
  let arr  = s.split(" ").filter(x => x !== "")
  for (let item of arr) {//remove all long spaces in string
      clean_string += item + " "
  }     
  clean_string =  clean_string.replace(/<\/?[^>]+(>|$)/gi, "");//remove HTML TAG  
  clean_string = clean_string.replace(regex, '')
          .replace('\\', '')
          .trim();
  //final = final.toUpperCase();    
  return clean_string; 
} 
//Extract ressource AT
function extract_ressource_QA(train_file,output){ 
    let finTab=[]
    var input_file = getJSON_file(train_file)  
    console.log(input_file.length)   
    for(i=0;i<input_file.length;i++){
        if(input_file[i].category=="resource"){
            finTab.push(input_file[i])
        }
    }
    console.log(finTab.length)   
    saveJsonFile(finTab,output) 
}
//Extract litteral AT
function extract_literal_QA(train_file,output){ 
  let finTab=[]
  var input_file = getJSON_file(train_file)  
  console.log(input_file.length)   
  for(i=0;i<input_file.length;i++){
      if(input_file[i].category=="literal"){
          finTab.push(input_file[i])
      }
  }
  console.log(finTab.length)   
  saveJsonFile(finTab,output) 
}
// Extract boolean AT
function extract_boolean_QA(train_file,output){
  let finTab=[]
  var input_file = getJSON_file(train_file)  
  console.log(input_file.length)   
  for(i=0;i<input_file.length;i++){
      if(input_file[i].category=="boolean"){
          finTab.push(input_file[i])
      }
  }
  console.log(finTab.length)   
  saveJsonFile(finTab,output) 
}
function getJSON_file(s){
  try{
    var data = fs.readFileSync(s);
    return JSON.parse(data)
  }catch(err) {
    console.error("Error:", err); 
    return null;
  }    
}
//Reseach a type on External KG
async function searchType(question,kg){
  let rslt=[], sen="", wkres=[]
  sen = remove_words(question, stopwords_1)
  sen = remove_words(sen, Interrogate_words)  
  //console.log(sen) 
  wkres = await wikipediaSearch(sen)
  //console.log(wkres.length) 
  if(wkres.length>0){    
    if(kg=='dbpedia'){
      let ID = gQID(wkres[0].link)
      let params = params_gcta("http://dbpedia.org/resource/"+ID);
      URL_wd.search = new URLSearchParams(params).toString(); 
      let metadata = await fetch(URL_wd, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
      let SparQLdata = safeParseJSON(metadata)
      //console.log(SparQLdata)
      if(SparQLdata!=undefined || SparQLdata!=[]){ 
        SparQLdata.results.bindings.forEach(bs => { 
          let t = gTID(bs.type.value)
          rslt.push("dbo:"+t);
        });
        //console.log("types :"+rslt)
      }  
    }else if(kg=='wikidata'){
      rslt = await wQID(wkres[0].link) 
      //console.log(rslt)
    }else{
      console.log("Erreur with KG=:"+kg)
    }
  } 
  return rslt
}
//SPARQL parameter to get a type
function params_gcta(annotation){
  return {
    query:`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbr: <http://dbpedia.org/resource>
    PREFIX dbo: <http://dbpedia.org/ontology>
    
    SELECT DISTINCT ?type WHERE{
    <`+annotation+`>  rdf:type ?type
    FILTER strstarts(str(?type), str(dbo:))}`                            
  }
}
//JSON Parse for SPARQL Results
function safeParseJSON(response) {
  var body = response.text(); 
  try {
      return JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
      return [];
  }
}
//JSON Parse for API Endpoints Results
function safeParseJSON2(response) {
  var body = response.text(); 
  try {
      return JSON.parse(body);
  } catch (err) {
      console.error("Error:", err);
      console.error("Response body:", body);
      return {
          head: {
          vars: [
            'entity',
            'entityLabel',
            'entityDescription',
            'type',
            'typeLabel'
          ]
        },
        results: { bindings: [] }
      };
  }
}
//Typing AT Task
async function _AT(input,output){
  let finTab=[]
  var input_file = getJSON_file(input)  
  for(let i=0;i<input_file.length;i++){
      if(input_file[i].category=="resource"){
          let types = await searchType(input_file[i].question.replaceAll("?","").toLowerCase())
          input_file[i].type = types
      }
      finTab.push(input_file[i])
  }
  saveJsonFile(finTab,output)
}
async function _AT_typed(input,output,kg){
  let finTab=[]
  var input_file = getJSON_file(input)  
  for(let i=0;i<input_file.length;i++){
      if(input_file[i].category=="resource"){
          let types = await searchType(input_file[i].question.replaceAll("?","").toLowerCase(),kg)
          input_file[i].type = types
          if(kg=="wikidata"){
            let wdres = getJSON_file(output) 
            wdres.push(input_file[i])
            saveJsonFile(wdres,output) 
          } 
      }
      finTab.push(input_file[i]) 
  }
  if(kg!="wikidata") saveJsonFile(finTab,output)
  console.log("End");
}
//SAVE Results in Json File
function saveJsonFile(finTab,output){  
  const jsonContent = JSON.stringify(finTab);
  fs.writeFileSync(output, jsonContent, 'utf8', function (err) {
      if (err) return console.log(err);
      //console.log("The file "+output+" was saved!");
  });
}
//Append Result in JSON
function appendJsonFile(output,data){
  // read file
  const file = fs.readFileSync(output)
  //check if file is empty
  if (file.length == 0) {
    //add data to json file
    fs.writeFileSync(output, JSON.stringify([data]))
  } else {
    //append data to jso file
    const json = JSON.parse(file.toString())
    //add json element to json object
    json.push(data);
    fs.writeFileSync(output, JSON.stringify(data))
  }
}
//WIKIBASE EndPoint search with wikipedia external source entry
async function wikipediaSearch(token){ 
	try{
      let petition = await new gse.search()
        .setType("wikipedia")
        .setQuery(token)
        .setOptions({language:'en'})
        .run()
      //console.log("gsearch : "+token)
      return(petition)
    }catch(err){
        console.log(err)
        return ""
    }
}
//Extract a Label for an Entity from a link
function gQID(url){
  if(url.startsWith("http://dbpedia.org/resource/")) 
    return url.substr(28); 
  if(url.startsWith("https://dbpedia.org/page/")) 
    return url.substr(25); 
  if(url.startsWith("https://en.m.wikipedia.org/wiki/"))
    return url.substr(32);
  if(url.startsWith("https://en.wikipedia.org/wiki/"))
    return url.substr(30);
  if(url.startsWith("http://www.wikidata.org/entity/"))
      return url.substr(31);
  return "";            
} 
//Extract a Label for a KG Class from a link
function gTID(url){
  if(url.startsWith("http://dbpedia.org/ontology/")) 
    return url.substr(28); 
  if(url.startsWith("https://dbpedia.org/ontology/")) 
    return url.substr(29); 
  return "";            
}  
//Reseach an Entity
async function wQID(url){
  let ID = gQID(url)
  let wpToWdUrl = url_wpd+""+ID; 
  //console.log("url_wikibase_item:"+wpToWdUrl)  
  let gFetchWpWd = await fetch(wpToWdUrl, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
  sleep(2000)
  wpToWd = safeParseJSON(gFetchWpWd)
  if(wpToWd!={}){
    let wdKey = ""+Object.values(wpToWd.query.pages)[0].pageprops.wikibase_item;  
    //console.log("wdKey:"+wdKey)
    params = params_gctawd(wdKey);
    URL_wdok.search = new URLSearchParams(params).toString(); 
    metadata = await fetch(URL_wdok, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
    sleep(2000)
    SparQLdata = safeParseJSON2(metadata);
    if(SparQLdata!=undefined || SparQLdata!=[]){ 
      let rst =[]
      //console.log(SparQLdata)
      SparQLdata.results.bindings.forEach(bs => { 
        let tQID = bs.type.value;
        let qid = gQID(tQID)
        rst.push(qid);    
      });
      return rst
    }
  }             
}  
//Parameters for SPAQRL to get an Entity type from an Label 
function params_gctawd(gQID){
  return {
    query:`#defaultView:Table
    PREFIX bd: <http://www.bigdata.com/rdf#> 
    PREFIX mwapi: <https://www.mediawiki.org/ontology#API/>
    PREFIX wdt: <http://www.wikidata.org/prop/direct/> 
    PREFIX wikibase: <http://wikiba.se/ontology#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>                     
    
    SELECT DISTINCT ?type ?typeLabel WHERE {
      wd:`+gQID+` (wdt:P279|wdt:P31) ?type. 
      SERVICE wikibase:label { 
        bd:serviceParam wikibase:language "en".
      } 
    } ORDER BY ASC(?type) LIMIT 10`                            
  }
}
//Naives Bayes Classification AT
async function NBayes_ATCat(input, type){
  console.log("Entrainement type :"+type)
  let nbc = await new natural.BayesClassifier();
  let input_file = getJSON_file(input)  
  let pattern = "", category = ""
  for(let i=0; i< input_file.length; i++){
    if(type==1) pattern = input_file[i].question.replaceAll('?','').toLowerCase()
    else if(type==2) pattern = extract_words(input_file[i].question.replaceAll('?','').toLowerCase(), Interrogate_words)
    else if(type==3) pattern = extract_words(input_file[i].question.replaceAll('?','').toLowerCase(), rwords)
    else if(type==4) pattern = extract_words(input_file[i].question.replaceAll('?','').toLowerCase(), Interrogate_words2)
    //console.log("type"+type+" :"+pattern)
    category = "resource"
    if(input_file[i].category=="literal") category ="literal"
    else if(input_file[i].category=="boolean") category ="boolean"
    else;
    await nbc.addDocument(pattern, category);
  }   
  //let raw = JSON.stringify(nbc);
  //saveJsonFile(raw,"AT_NBayesClassifiers.json")  
  console.log("Fin soumission des paramètres du train type :"+type)
  return nbc;
} 
//Naives Bayes Classification RL
function NaivesBayesClsfctRL(input){
  let nbc = new natural.BayesClassifier();
  let input_file = getJSON_file(input)  
  let pattern = ""
  for(let i=0; i< input_file.length; i++){
    let categories = ""
    pattern = remove_words(input_file[i].question.replaceAll('?',''), RL_rwords).toLowerCase()
    for(let j=0;j<input_file[i].relations.length;j++){
      for(let k=0;k<input_file[i].relations[j].length;k++){
          //categories= categories+',"'+input_file[i].relations[j][k]+'"'
          nbc.addDocument(pattern, String(input_file[i].relations[j][k]));
      }
      //categories = categories.substr(1)
      //nbc.addDocument(String(input_file[i].question).replaceAll("?","").toLowerCase(), categories);
    }
  }
  //let raw = JSON.stringify(nbc);
  //saveJsonFile(raw,"AT_NBayesClassifiers.json")
  return nbc;
}
//Static Typing of a question for Dbpedia KG
function _include_dbpedia_type(category,qst){
  let type = []
  if(category=="boolean")
    type = ["boolean"]
  else if(category=="literal"){
    if(qst.includes('how many ') || qst.includes('count ') || qst.includes(' code') || qst.includes(' amount') || qst.includes(' number') || qst.includes(' quantity') || qst.includes(' id') || qst.includes(' age') || qst.includes(' minimal') || qst.includes(' maximum') || qst.includes('how much ') || qst.includes(' population')){
      type = ["number"]
    }else if(qst.includes('timezone') || qst.includes('when ') || qst.includes(' time') || qst.includes(' period')  || qst.includes(' date') || qst.includes(' year') || qst.includes(' birthday')){
      type = ["date"]
    }else type = ["string"]   
  }else{
    if(qst.includes(' gameplay')) type = ["dbo:VideoGame"]
    if(qst.startsWith('where is ') || qst.startsWith('where are ')) type=["dbo:Place","dbo:Location","dbo:PopulatedPlace"]
    if(qst.startsWith('what timezone ')){
      type = ["dbo:Settlement"]
    }else if(qst.startsWith("what currency ") || qst.startsWith("what type of currency ") ){
      type = ["dbo:Currency"]
    }else if(qst.startsWith("what instrument ")){
      type = ["dbo:Instrument"]
    }else if(qst.startsWith("what illnesses ") || qst.startsWith("what type of currency ") || qst.startsWith("what killed ")){
      type = ["dbo:Disease"]
    }else if (qst.startsWith('what was the cause ')){
      if(qst.includes(' dead') || qst.includes(' death')) type = ["dbo:Disease"]
    }else if(qst.startsWith('what school ')){
      type = ["dbo:School","dbo:EducationalInstitution","dbo:Organisation","dbo:Agent"]
    }else if(qst.startsWith("what did ")){
      if(qst.includes(' die')) type = ["dbo:Disease"]
    }else if(qst.startsWith("what airport ")){
      type = ["dbo:Place","dbo:Location","dbo:ArchitecturalStructure","dbo:Airport","dbo:Infrastructure"]
    }else if(qst.startsWith("what sport ")){
      type = ["dbo:Sport","dbo:Activity"]
    }else if(qst.startsWith("which bridge ")){
      type = ["dbo:Place","dbo:Location","dbo:Infrastructure","dbo:Bridge","dbo:HistoricPlace"]
    }else if(qst.startsWith('who did the music') || qst.startsWith('which artist ') || qst.startsWith('what artist ')){
      type = ["dbo:Person","dbo:Artist","dbo:Agent"]
    }else if(qst.startsWith('which city ') || qst.startsWith('what city ')){
      type = ["dbo:Place","dbo:Location","dbo:City","dbo:State","dbo:PopulatedPlace","dbo:Settlement",]
    }else if(qst.startsWith('which language ') || qst.startsWith('what language ') || qst.startsWith('in what language ') ){
      type = ["dbo:Language"]
    }else if(qst.startsWith('which continent') || qst.startsWith('what continents ') || qst.startsWith('what continent ')){
      type=["dbo:Place","dbo:Location","dbo:Country","dbo:Continent","dbo:State","dbo:PopulatedPlace"]
    }else if(qst.startsWith('what nation ') || qst.startsWith('what country ') || qst.startsWith('what countries ')){
      type=["dbo:Place","dbo:Location","dbo:Country","dbo:State","dbo:PopulatedPlace"]
    }else if(qst.startsWith('which county ') || qst.startsWith('what county ') || qst.startsWith('what counties ')){
      type=["dbo:Place", "dbo:Location", "dbo:AdministrativeRegion","dbo:Settlement","dbo:Region","dbo:PopulatedPlace"]
    }else if(qst.startsWith('what sates ') || qst.startsWith('what state ')){
      type=["dbo:Place","dbo:Location","dbo:Country","dbo:State","dbo:PopulatedPlace","dbo:AdministrativeRegion","dbo:Region",]
    }else if(qst.startsWith('what kind of ') || qst.startsWith('what genre ') ){
      type=["dbo:Genre"]
    }else if(qst.startsWith('who plays ') || qst.startsWith('who started ')){
      type=["dbo:Person","dbo:Agent"]
    }else if(qst.startsWith('what award ')){
      type=["dbo:Award"]
    }else if(qst.startsWith('what is a game ')){
      type=["dbo:Software","dbo:VideoGame","dbo:Work"]
    }else if(qst.startsWith('what Town ')){
      type=["dbo:Place","dbo:Location","dbo:City","dbo:Settlement","dbo:Town","dbo:PopulatedPlace"]
    }else if(qst.startsWith('which country ') || qst.startsWith('which countries')){
      type = ["dbo:Country","dbo:State","dbo:PopulatedPlace","dbo:Place","dbo:Location"]
    }else if(qst.startsWith('which person ')){
      type = ["dbo:Person"]
    }else if(qst.startsWith('what person ') || qst.startsWith('who edited ') || qst.startsWith('who is') || qst.startsWith("who's") || qst.startsWith('who are') || qst.startsWith('who was') || qst.startsWith('who played ') || qst.startsWith('who developed ') || qst.startsWith('who directed  ') ){
      type = ["dbo:Person","dbo:Agent"]
      if(qst.includes(' composer')) type.push("dbo:Artist","dbo:Agent","dbo:MusicalArtist")
      else if(qst.includes(' architect')) type.push("dbo:Architect")
      else if(qst.includes(' the author of ')) type.push("dbo:Writer")  
      else if(qst.includes(' goalkeeper') || qst.includes(' football') ) type.push("dbo:Person","dbo:Athlete","dbo:Agent","dbo:SoccerPlayer")       
      else;
    }else if(qst.startsWith('what organization ')){
      type = ["dbo:Organization","dbo:Agent"]  
    }else if(qst.startsWith('what type of')){
      if(qst.includes(' music') || qst.includes(' rock')) type.push("dbo:MusicGenre","dbo:Genre","dbo:TopicalConcept")
      if(qst.includes(' ship')) type.push("dbo:Ship","dbo:MeanOfTransportation")
      if(qst.includes(' celestial object') || qst.includes(' space object')) type.push("dbo:CelestialBody")
      if(qst.includes(' movie') || qst.includes(' show') || qst.includes(' film')) type.push("dbo:Film","dbo:MusicGenre")
      if(qst.includes(' videogame') || qst.includes(' game')) type.push("dbo:VideoGame")
      if(qst.includes(' work')) type.push("dbo:PersonFunction")  
      if(qst.includes(' book') || qst.includes(' narrative')) type.push("dbo:Book","dbo:WrittenBook","dbo:Work")
    }else if(qst.startsWith('what ethnicity  ') || qst.includes('what profession ')){
      type = ["dbo:Band","dbo:EthnicGroup"]
    }else if(qst.startsWith('what religion ')){
      type = ["dbo:EthnicGroup"]
    }else if(qst.startsWith('what company ')){
      type = ["dbo:Company","dbo:Organisation","dbo:Agent"]
    }else if(qst.startsWith('Wich position ')){
      type = ["dbo:Athlete"]
    }else if(qst.startsWith('what position ') || qst.includes('what profession ')){
      type = ["dbo:PersonFunction"]
    }else if(qst.startsWith('what album') || qst.startsWith('on what album ') ){
      type = ["dbo:Album","dbo:MusicalWork","dbo:Work"]
    }else if(qst.startsWith('which river')){
      type = ["dbo:River","dbo:Stream","dbo:BodyOfWater","dbo:NaturalPlace","dbo:Place","dbo:Location"]
    }else if(qst.startsWith('what label ')){
      type =["dbo:RecordLabel","dbo:Company","dbo:Organisation","dbo:Agent"]  
    }else if(qst.startsWith('name a book ') || qst.startsWith('what encyclopedia ') || qst.startsWith('which book') || qst.startsWith('which  is the book') || qst.startsWith('name a work written')){
      type = ["dbo:Book","dbo:WrittenWork","dbo:Work"]
    }else if(qst.startsWith('Name someone ')){
      type = ["dbo:Person","dbo:Agent"]
      if(qst.includes(' football')) type.push("dbo:thlete","dbo:SoccerPlayer")
      if(qst.includes(' character')) ttype = ["dbo:FictionalCharacter","dbo:Agent"]
    }else if(qst.startsWith('show me ')){
      if(qst.includes(' songs')) type.push("dbo:Song","dbo:MusicalWork","dbo:Work")
      else if(qst.includes(' basketball player')) type.push("dbo:BasketballPlayer","dbo:Athlete","dbo:Person","dbo:Agent")
      else if(qst.includes(' autobiography') || qst.includes(' book')) type.push("dbo:Book","dbo:WrittenWork","dbo:Work")  
      else if(qst.includes(' building')) type.push("dbo:Building","dbo:ArchitecturalStructure","dbo:Place","dbo:Location")       
      else;
    }else if(qst.startsWith('what genre ')){
      type = ["dbo:Genre"]
      if(qst.includes(' game')) type.push("dbo:VideoGame")
      else if(qst.includes(' music')) type.push("dbo:MusicGenre")   
      else;
    }else if(qst.startsWith('what film ') || qst.startsWith('what films ')){
      type = ["dbo:Film","dbo:Work"]
    }else if(qst.startsWith('what profession ')){
      type = ["dbo:PersonFunction"]
    }else if(qst.startsWith('who published ')){
      type = ["dbo:Company","dbo:Organisation","dbo:Agent"]
    }else if(qst.startsWith('who wrote ')){
      type = ["dbo:Person","dbo:Writer","dbo:Agent"]
    }else if(qst.startsWith('whiwh war ') || qst.startsWith('in what war ') || qst.startsWith('what war ') || qst.startsWith('what major war ') || qst.startsWith('what conflict ') || qst.includes('whose commander')){
      type = ["dbo:MilitaryConflict","dbo:SocietalEvent","dbo:Event"]  
    }else if(qst.includes('what body of water')){
      type = ["dbo:Stream","dbo:BodyOfWater","dbo:NaturalPlace","dbo:Place","dbo:Location"]
      if(qst.includes(' river')) type.push("dbo:River","dbo:Bay")
      if(qst.includes(' lake')) type.push("dbo:Lake")
    }else if(qst.startsWith('name an ') ||  qst.startsWith('name a ') || qst.startsWith('name the ') || qst.startsWith('mention') || qst.startsWith('what is the ') || qst.startsWith("what's ")  || qst.startsWith("whats ") || qst.startsWith('what is ') || qst.startsWith('what are ')){
      if(qst.includes(' movie')) type.push("dbo:Film","dbo:Work")
      else if(qst.includes(' basketball player')) type.push("dbo:BasketballPlayer","dbo:Athlete","dbo:Person","dbo:Agent")
      else if(qst.includes(' autobiography') || qst.includes(' book')) type.push("dbo:Book","dbo:WrittenWork","dbo:Work")  
      else if(qst.includes(' building')) type.push("dbo:Building","dbo:ArchitecturalStructure","dbo:Place","dbo:Location")      
      else if(qst.includes(' book') || qst.includes(' encyclopedia')) type.push("dbo:Book","dbo:WrittenWork","dbo:Work")
      else if(qst.includes(' song ') || qst.includes(' lyrics ')) type.push("dbo:Single","dbo:MusicalWork","dbo:Work")           
      else if(qst.includes(' artist') || qst.includes(' illusionist')) type.push("dbo:Person","dbo:Artist","dbo:Agent")   
      else if(qst.includes(' religion')) type.push("dbo:EthnicGroup")   
      else if(qst.includes(' language')) type.push("dbo:Language")   
      else if(qst.includes(' nationality')) type = ["dbo:Place","dbo:Location","dbo:Country","dbo:PopulatedPlace"]
      else if(qst.includes(' genre') || qst.includes(' gender')) type.push("dbo:Genre")
      else if(qst.includes(' birthplace')  || qst.includes(' birth place') || qst.includes(' place')) type.push("dbo:Place","dbo:Location","dbo:Country","dbo:Settlement","dbo:PopulatedPlace")  
      else if(qst.includes(' profession')) type.push("dbo:PersonFunction")       
      else if(qst.includes(' album')) type.push("dbo:Album","dbo:Work")         
      else if(qst.includes(' film')) type.push("dbo:Film","dbo:Work")      
      else if(qst.includes(' city')) type.push("dbo:Place","dbo:Location","dbo:City","dbo:Settlement","dbo:AdministrativeRegion","dbo:Region","dbo:PopulatedPlace")      
      else if(qst.includes(' country')) type.push("dbo:Place","dbo:Location","dbo:Country","dbo:AdministrativeRegion","dbo:Region","dbo:PopulatedPlace")
      else if(qst.includes(' continents')) type.push("dbo:Place","dbo:Location","dbo:Country","dbo:Continent","dbo:PopulatedPlace")
      else if(qst.includes(' label')) type.push("dbo:RecordLabel","dbo:Company","dbo:Organisation","dbo:Agent")     
      else if(qst.includes(' company')) type.push("dbo:Company","dbo:Organisation","dbo:Agent")  
      else if(qst.includes(' single-player') || qst.includes(' video game')) type.push("dbo:Software","dbo:Company","dbo:Work")   
      else if(qst.includes(' son ') || qst.includes(' songwriter') || qst.includes(' child')) type.push("dbo:Person","dbo:Agent")   
      else if(qst.includes(' family name')) type.push("dbo:GivenName","dbo:Name")   
      else if(qst.includes(' bridge')) type.push("dbo:Bridge","dbo:RouteOfTransportation","dbo:Infrastructure","dbo:ArchitecturalStructure","dbo:Place","dbo:Location")   
      else if(qst.includes(' railway')) type.push("dbo:RailwayStation","dbo:Station","dbo:Infrastructure","dbo:ArchitecturalStructure","dbo:Place","dbo:Location")      
      else if(qst.includes(' dam')) type.push("dbo:Dam","dbo:Infrastructure","dbo:ArchitecturalStructure","dbo:Place","dbo:Location")     
      else;
    }else if(qst.startsWith('which')){
      if(qst.includes(' is the name of')){
        if(!qst.includes('business')) type = ["dbo:Person","dbo:Agent"]
        else type = ["dbo:Company","dbo:Organisation","dbo:Agent"]
      }else if(qst.includes(' song ') || qst.includes(' lyrics ') ||qst.includes(' single')) type = ["dbo:Single","dbo:MusicalWork","dbo:Work"]     
      else if(qst.includes(' label')) type.push("dbo:RecordLabel","dbo:Company","dbo:Organisation","dbo:Agent")   
      else if(qst.includes(' company')) type.push("dbo:Company","dbo:Organisation","dbo:Agent")  
      else if(qst.includes(' band') || qst.includes(' group')) type = ["dbo:Band","dbo:Group","dbo:Organisation","dbo:Agent"]
      else if(qst.includes(' baseball position') || qst.includes(' football position')) type.push("dbo:Athlete")  
    }else if(qst.startsWith('where ')){
      type = ["dbo:Place","dbo:Location"]  
      if(qst.includes(' born') || qst.includes(' spoken') || qst.includes(' located') || qst.includes(' live') || qst.includes(' birth place') || qst.includes(' death place')) type.push("dbo:Settlement","dbo:Location","dbo:PopulatedPlace","dbo:Settlement")
      else if(qst.includes(' architect')) type.push("dbo:Architect")
      else if(qst.includes(' river')) type.push("dbo:Location","dbo:BodyOfWater","dbo:NaturalPlace","dbo:River","dbo:Stream")
      else;
    }
  }
  let types = type.filter(function(item, pos) {
    return type.indexOf(item) == pos;
  })
  return types
}
//Static Typing of a question for Wikidata KG
function _include_wikidata_type(category, qst) {
  let type = []
  if (category == "boolean")
      type = ["boolean"]
  else if (category == "literal") {
      if (qst.includes('how many ') || qst.includes('count ') || qst.includes(' code') || qst.includes(' amount') || qst.includes(' number') || qst.includes(' quantity') || qst.includes(' id') || qst.includes(' age') || qst.includes(' minimal') || qst.includes(' maximum') || qst.includes('how much ') || qst.includes(' population')) {
          type = ["number"]
      } else if (qst.includes('timezone') || qst.includes('when ') || qst.includes(' time') || qst.includes(' period') || qst.includes(' date') || qst.includes(' year') || qst.includes(' birthday')) {
          type = ["date"]
      } else type = ["string"]
  } else {
      if (qst.includes(' gameplay')) type = ["creative work"]
      if (qst.startsWith('where is ') || qst.startsWith('where are ')) type = ["seat", "community", "human settlement"]
      if (qst.startsWith('what country ')) {
          type = ["political territorial entity", "country", "state"]
      } else if (qst.startsWith("what currency ") || qst.startsWith("what type of currency ")) {
          type = ["currency"]
      } else if (qst.startsWith("what instrument ")) {
          type = ["instrument"]
      } else if (qst.startsWith("what illnesses ") || qst.startsWith("what type of currency ") || qst.startsWith("what killed ")) {
          type = ["disease"]
      } else if (qst.startsWith('what was the cause ')) {
          if (qst.includes(' dead') || qst.includes(' death')) type = ["disease"]
      } else if (qst.startsWith('what school ')) {
          type = ["school",
              "academic institution",
              "educational organization",
              "public educational institution"]
      } else if (qst.startsWith("what did ")) {
          if (qst.includes(' die')) type = ["disease"]
      } else if (qst.startsWith("what airport ")) {
          type = ["airport",
              "aerodrome",
              "station", "architectural structure"]
      } else if (qst.startsWith("what sport ")) {
          type = ["class",
              "sport",]
      } else if (qst.startsWith("which bridge ")) {
          type = ["bridge",
              "girder bridge",
              "concrete bridge"]
      } else if (qst.startsWith('who did the music') || qst.startsWith('which artist ') || qst.startsWith('what artist ')) {
          type = ["natural person",
              "omnivore",
              "person"]
      } else if (qst.startsWith('which language ') || qst.startsWith('what language ') || qst.startsWith('in what language ')) {
          type = ["language"]
      } else if (qst.startsWith('which continent') || qst.startsWith('what continents ') || qst.startsWith('what continent ')) {
          type = ["political territorial entity","state","country","administrative territorial entity","continent"]
  } else if (qst.startsWith('what nation ') || qst.startsWith('what country ') || qst.startsWith('what countries ')) {
          type = ["political territorial entity", "state", "country", "administrative territorial entity"]
      } else if (qst.startsWith('which county ') || qst.startsWith('what county ') || qst.startsWith('what counties ')) {
          type = ["political territorial entity", "state", "country", "administrative territorial entity"]
      } else if (qst.startsWith('what sates ') || qst.startsWith('what state ')) {
          type = ["federated state",
              "constituency",
              "administrative territorial entity of the United States",
              "first-level administrative country subdivision",
              "state"]
      } else if (qst.startsWith('who plays ') || qst.startsWith('who started ')) {
          type = ["natural person",
              "omnivore",
              "person"]
      } else if (qst.startsWith('what award ')) {
          type = ["award", "recognition", "grant",]
      } else if (qst.startsWith('which city ') || qst.startsWith('what city ')) {
          type = ["seat", "city", "human settlement"]
      } else if (qst.startsWith('what countries ') || qst.startsWith('which country ') || qst.startsWith('which countries')) {
          type = ["political territorial entity", "country", "state"]
      } else if (qst.startsWith('which person ')) {
          type = ["person", "natural person", "omnivore"]
      } else if (qst.startsWith('what person ') || qst.startsWith('who edited ') || qst.startsWith('who is') || qst.startsWith("who's") || qst.startsWith('who are') || qst.startsWith('who was') || qst.startsWith('who played ') || qst.startsWith('who developed ')) {
          type = ["person", "natural person", "omnivore"]
          if (qst.includes(' composer')) type.push("person", "natural person", "omnivore")
          else if (qst.includes(' architect')) type.push("person", "natural person", "omnivore")
          else if (qst.includes(' the author of ')) type.push("person", "natural person", "omnivore")
          else if (qst.includes(' goalkeeper')) type.push("person", "natural person", "omnivore")
          else;
      } else if (qst.startsWith('what religion ')) {
          type = ["ideology", "tradition", "world view", "belief system", "religion"]
      } else if (qst.startsWith('what company ')) {
          type = ["company", "organization", "business"]
      } else if (qst.startsWith('what position ') || qst.includes('what profession ')) {
          type = ["position"]
      } else if (qst.startsWith('which river')) {
          type = ["river", "water reservoir"]
      } else if (qst.startsWith('what label ')) {
          type = ["brand", "trade name", "business", "record label"]
      } else if (qst.startsWith('name a book ') || qst.startsWith('what encyclopedia ') || qst.startsWith('which book') || qst.startsWith('which  is the book') || qst.startsWith('name a work written')) {
          type = ["text", "creative work", "written work"]
      } else if (qst.startsWith('show me ')) {
          if (qst.includes(' songs')) type.push("musical composition", "musical work", "literary work", "vocal music")
          else if (qst.includes(' basketball player')) type.push("natural person", "omnivore", "person")
          else if (qst.includes(' autobiography') || qst.includes(' book')) type.push("text", "creative work", "written work")
          else if (qst.includes(' building')) type.push("building")
          else;
      }else if(qst.includes('what kinds of music ')){
        type.push("art genre", "aspect of music")
      } else if (qst.startsWith('what genre ')) {
          type = ["art genre"]
          if (qst.includes(' game')) type.push("application", "electronic game", "audiovisual work", "creative work")
          else if (qst.includes(' music')) type.push("art genre", "aspect of music")
          else;
      } else if (qst.startsWith('what film ')) {
          type = ["audiovisual work", "visual artwork", "moving image", "series"]
      } else if (qst.startsWith('what profession ')) {
          type = ["position"]
      } else if (qst.startsWith('who wrote ')) {
          type = ["person", "natural person", "omnivore"]
      } else if (qst.startsWith('name a ') || qst.startsWith('name the ') || qst.startsWith('what is the ') || qst.startsWith("what's ") || qst.startsWith('what is ') || qst.startsWith('what are ')) {
          if (qst.includes(' nationality')) type = ["political territorial entity", "federal system", "nation", "republic", "country", "state", "democracy", "historical country", "state with limited recognition"]
          else if (qst.includes(' genre') || qst.includes(' gender')) type.push("art genre")
          else if (qst.includes(' birthplace') || qst.includes(' birth place') || qst.includes(' place')) type.push("seat", "community", "human settlement", "country", "state")
          else if (qst.includes(' profession')) type.push("position")
          else if (qst.includes(' album')) type.push("album")
          else if (qst.includes(' film')) type.push("audiovisual work", "visual artwork", "moving image", "series")
          else if (qst.includes(' city')) type.push("seat", "city", "human settlement")
          else if (qst.includes(' country')) type.push("political territorial entity", "country", "state", "nation")
          else if (qst.includes(' label')) type.push("brand", "trade name", "business", "record label", "record company")
          else if (qst.includes(' single-player') || qst.includes(' video game')) type.push("application", "electronic game", "audiovisual work", "creative work")
          else if (qst.includes(' company')) type.push("company", "organization", "business")
          else if (qst.includes(' artist')) type.push("natural person", "omnivore", "person")
          else if (qst.includes(' religion')) type.push("ideology", "tradition", "world view", "belief system", "religion")
          else if (qst.includes(' language')) type.push("human language", "languoid")
          else if (qst.includes(' song ') || qst.includes(' lyrics')) type.push("musical composition", "musical work", "literary work", "vocal music")
          else if (qst.includes(' son ') || qst.includes(' songwriter') || qst.includes(' child')) type.push("person", "business")
          else if (qst.includes(' family name')) type.push("anthroponym", "family name")
          else if (qst.includes(' bridge')) type.push("bridge")
          else if (qst.includes(' railway')) type.push("rail infrastructure", "transport infrastructure", "railway line", "architectural structure", "tunnel")
          else if (qst.includes(' dam')) type.push("water reservoir", "artificial lake")
          else;
      } else if (qst.startsWith('what war ') || qst.includes('whose commander')) {
          type = ["war", "time interval", "era"]
      } else if (qst.includes('what body of water')) {
          type = ["water reservoir"]
          if (qst.includes(' river')) type.push("river")
          if (qst.includes(' lake')) type.push("lake")
      } else if (qst.startsWith('which')) {
          if (qst.includes(' is the name of')) type = ["person"]
          else if (qst.includes(' song ') || qst.includes(' lyrics ') || qst.includes(' single')) type = ["musical composition", "musical work", "literary work", "vocal music"]
          else if (qst.includes(' label')) type.push("brand", "trade name", "business", "record label", "record company")
          else if (qst.includes(' company')) type.push("company", "organization", "enterprise", "business")
          else if (qst.includes(' band') || qst.includes(' group')) type = ["musical ensemble"]
          else if (qst.includes(' music')) type.push("musical composition", "musical work", "literary work", "vocal music")
      } else if (qst.startsWith('where ')) {
          type = ["seat"]
          if (qst.includes(' born') || qst.includes(' located') || qst.includes(' live') || qst.includes(' birth place') || qst.includes(' death place')) type.push("human settlement")
          else if (qst.includes(' nationality')) type.push("state","country","political territorial entity","state","nation")
          else if (qst.includes(' architect')) type.push("architectural structure")
          else if (qst.includes(' river')) type.push("water reservoir")
          else;
      }
  }
  let types = type.filter(function (item, pos) {
      return type.indexOf(item) == pos;
  })
  return types
}
//Typing AT Main Process 
async function typer_AT(input,output,kg){
  let input_file = getJSON_file(input)  
  let pattern = "", category = "", finTab=[]
  for(let i=0; i< input_file.length; i++){
      //category = "resource"
      let question = String(input_file[i].question).replaceAll('?','').toLowerCase()       
      category = input_file[i].category
      if(input_file[i].type.length==0){ input_file[i].type = _include_wikidata_type(category, question)}
      //if(kg=="dbpedia") input_file[i].type = _include_dbpedia_type(category, question)    
      //if(kg=="wikidata") input_file[i].type = _include_wikidata_type(category, question)    
      if(question.startsWith("what is in the category of")){ 
        input_file[i].category = "literal"
        input_file[i].type = ["string"]   
      }else if(question.startsWith("when did ") || question.startsWith("what year ") || question.startsWith("when is ") || question.startsWith("when was ")){
        input_file[i].category = "literal"
        input_file[i].type = ["date"]    
      }else if(question.startsWith("does ") || question.startsWith("was ") || question.startsWith("did ") || question.startsWith("do ") || question.startsWith("is ")){
        input_file[i].category = "boolean"
        input_file[i].type = ["boolean"]    
      }else if(question.startsWith("how often ") || question.startsWith("how much ") || question.startsWith("how many ") || question.startsWith("give me a count") || question.startsWith("did ") || question.startsWith("do ")){
        input_file[i].category = "literal"
        input_file[i].type = ["number"]    
      }
      finTab.push(input_file[i])
  }  
  saveJsonFile(finTab,output)
  console.log("Fin Typage statique")
  return 1;
}
//Naives Bayes Classification AT Core process
function NBayes_AT(input,output,cls,type){
  console.log("resultat type :"+type)
  let input_file = getJSON_file(input)  
  let pattern = "", category = "", finTab=[]
  for(let i=0; i< input_file.length; i++){
    let question = String(input_file[i].question).replaceAll('?','').toLowerCase()
    let qst = String(input_file[i].question).replaceAll('?','').toLowerCase()    
    if(type==2) qst = extract_words(qst, Interrogate_words)
    else if(type==3) qst = extract_words(qst, rwords)
    else if(type==4) qst = extract_words(qst, Interrogate_words2)
    //console.log(qst)
    category = cls.classify(qst)
    input_file[i].category = category
    input_file[i].type = _include_dbpedia_type(category, question)   
    //input_file[i].type = _include_wikidata_type(category, question)    
    if(question.startsWith("What is in the category of")){ 
      input_file[i].category = "literal"
      input_file[i].type = ["string"]   
    }else if(question.startsWith("when did ") || question.startsWith("when is ") || question.startsWith("when was ")){
      input_file[i].category = "literal"
      input_file[i].type = ["date"]    
    }else if(question.startsWith("does ") || question.startsWith("did ") || question.startsWith("do ") || question.startsWith("is ")){
      input_file[i].category = "boolean"
      input_file[i].type = ["boolean"]    
    }else if(question.startsWith("how often ") || question.startsWith("how much ") || question.startsWith("how many ") || question.startsWith("give me a count") || question.startsWith("did ") || question.startsWith("do ")){
      input_file[i].category = "literal"
      input_file[i].type = ["number"]    
    }
    finTab.push(input_file[i])
  }  
  saveJsonFile(finTab,output)
  console.log("Fin resultat type :"+type)
  //let raw = JSON.stringify(nbc);
  //_fcts.saveJsonFile(raw,output)
}
//Naives Bayes Classification RL train
async function NBayes_RL_1step(input, type){
  console.log("Entrainement RL type :"+type)
  let nbc2 = new natural.BayesClassifier();
  let input_file = getJSON_file(input)  
  let pattern = ""
  for(let i=0; i< input_file.length; i++){
    let relations = []
    if(type==1) pattern = input_file[i].question.replaceAll('?','').toLowerCase()
    else if(type==2) pattern = remove_words(input_file[i].question.replaceAll('?',''), RL_rwords).toLowerCase()
    else if(type==3) pattern = remove_words(input_file[i].question.replaceAll('?',''), rwords).toLowerCase()
    else pattern = extract_words(input_file[i].question.replaceAll('?',''), RLTokens_toExtract).toLowerCase()
    let kg="wikidata"
    if(kg=="wikidata"){
      relations = input_file[i].relations
    }else{
      for(let j=0;j<input_file[i].relations.length;j++){
        relations = input_file[i].relations[j]
        //console.log(relations)
      }
    } 
    nbc2.addDocument(String(pattern), relations);
  }
  console.log("Fin passage paramètres RL type :"+type)
  return nbc2;
} 
//Naives Bayes Classification RL Test
async function NBayes_RL(input,output,cls,type){
  console.log("resultat RL type :"+type)
  let input_file = getJSON_file(input)  
  let label_wikidata_file = getJSON_file("SMART2022-RL-wikidata-relation-vocabulary.json")  
  let pattern = "", category = "", finTab=[], relations=[]
  for(let i=0; i< input_file.length; i++){ 
    let question = String(input_file[i].question).replaceAll('?','').toLowerCase()
    let qst = String(input_file[i].question).replaceAll('?','').toLowerCase()    
    if(type==2) qst = remove_words(qst, RL_rwords)
    else if(type==3) qst = remove_words(qst, rwords)
    else if(type==4) qst = extract_words(qst, RLTokens_toExtrac)
    //console.log(qst)
    let kg="wikidata"
    if(kg=="wikidata"){
      let res = cls.classify(qst)
      let relations = res.split(",")
      let relation_labels = [], find=false
      //console.log(relations)
      input_file[i].relations = relations 
      for(r in relations){
        find=false
        for (const property in label_wikidata_file) {
          if(label_wikidata_file[property].id == relations[r]){
            relation_labels.push(label_wikidata_file[property].label)
            find=true
            //console.log(`${label_wikidata_file[property].label}`);
            break;
          }            
        }
        if(find==false){
          let url_label = "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&languages=en&props=labels|datatype&ids="+relations[r]
          let er = await fetch(url_label, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
          let er2 = safeParseJSON(er)
          let prop_label = Object.values(er2.entities)[0].labels.en.value
          relation_labels.push(prop_label)
          //console.log(Object.values(er2.entities)[0].labels.en.value);       
        }
      }
      input_file[i].relation_labels = relation_labels
      input_file[i].num_of_rels = relation_labels.length 
    }else{
      let res = cls.classify(qst)
      let relation = res.split(",")
      relations = [[...relation]]
      input_file[i].num_of_rels = 1  
      input_file[i].relations = relations 
    }
    finTab.push(input_file[i])
  }  
  saveJsonFile(finTab,output)
  console.log("Fin RL resultat type :"+type)
}
//Build an Embedding vector for EL
function buildV_EL(question){
  let word = ""
  let Vector = []
  let ELT_prohibed = ELTokens_probited;
  ELT_prohibed = ELT_prohibed.filter(element => !["ne","of","the",].includes(element));
  qst_tokens = question.toLowerCase()
    .replaceAll('?','')
    .replaceAll('{','')
    .replaceAll('}','')
    .replaceAll('!','')
    .split(' ')
  qst_tokens.push("END_EL")
  //console.log("question: "+question)
  //console.log(qst_tokens) 
  for(let i=0; i<qst_tokens.length; i++){
    if(!ELT_prohibed.includes(qst_tokens[i])){
      word = word+" "+qst_tokens[i]
    }else{
      word = word.trim()
      if(word!=""){        
        Vector.push(word)
      }
      word = ""
    }
  }
  Vectors = Vector.filter(function(item, pos) {
    if(El_lastFilter.includes(item)) return false;
    return true;    
  })
  for(let i=0;i<Vectors.length;i++){
    let v = Vectors[i].split(' ')
    //console.log("v("+i+") : "+v)
    if((v[0]=="of" || v[0]=="the") && (v[v.length-1]=="of" || v[v.length-1]=="the")){
      Vectors[i] = ""
    }
    if(!isNaN(v)){
      Vectors[i] = ""
    }
  }
  Vectors = Vectors.filter(element => !["ne","of","the"," ",""].includes(element));  
  return Vectors;
}
//Research an Entity over KG(wikidata and dbpedia)
async function searchEntity(v){
  let rslt={"dbpedia":"", "wikidata":""}, wkres=[]
  //console.log(sen) 
  wkres = await wikipediaSearch(v)
  //sleep(1000)
  //console.log(wkres.length) 
  if(wkres.length>0){ 
    let ID = gQID(wkres[0].link)   
    let dbpedia_entity = "http://dbpedia.org/resource/"+ID
    rslt = {"dbpedia":dbpedia_entity}
    /*let wpToWdUrl = url_wpd+""+ID; 
    //console.log("url_wikibase_item:"+wpToWdUrl)  
    let gFetchWpWd = await fetch(wpToWdUrl, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
    sleep(1000)
    wpToWd = safeParseJSON(gFetchWpWd)
    let wikidata_entity = null
    if(wpToWd!={}) wikidata_entity = ""+Object.values(wpToWd.query.pages)[0].pageprops.wikibase_item;   
    rslt = {"dbpedia":dbpedia_entity, "wikidata":wikidata_entity}*/
  }  
  return rslt
}
//Entities Linking function
async function _EL(step,input_dbpedia,output_dbpedia,input_wikidata,output_wikidata){ 
  let input_file_dbpedia = getJSON_file(input_dbpedia) 
  //let input_file_wikidata = getJSON_file(input_wikidata) 
  for(let i=step;i<input_file_dbpedia.length;i++){     
    console.log("question id("+input_file_dbpedia[i].id+")/step("+i+"): "+ input_file_dbpedia[i].question)
    let question = input_file_dbpedia[i].question.replaceAll("?","").toLowerCase()
    let V = buildV_EL(question)     
    console.log(V)
    let entities_dbpedia =[], entities_wikidata =[]
    let e_res = []
    for(let j=0;j<V.length;j++){
      e_res = await searchEntity(V[j])
      console.log(e_res)
      //sleep(4000)
      entities_dbpedia.push(e_res.dbpedia)
      //entities_wikidata.push(e_res.wikidata)
    }
    //save in dbpedia
    let output_file__dbpedia = getJSON_file(output_dbpedia) 
    input_file_dbpedia[i].entities = entities_dbpedia
    output_file__dbpedia.push(input_file_dbpedia[i])
    saveJsonFile(output_file__dbpedia,output_dbpedia)    
    //save in wikidata
    /*let output_file_wikidata = getJSON_file(output_wikidata)
    input_file_wikidata[i].entities = entities_wikidata
    output_file_wikidata.push(input_file_wikidata[i])
    saveJsonFile(output_file_wikidata,output_wikidata)*/
  }
}
//Entities Linking function wikidata
async function _ELwd(step,input_dbpedia,input_wikidata,output){ 
  let input_file_dbpedia = getJSON_file(input_dbpedia)  
  let input_file_wikidata = getJSON_file(input_wikidata)  
  for(let i=step;i<input_file_dbpedia.length;i++){     
    console.log("question id("+input_file_dbpedia[i].id+")/step("+i+"): "+ input_file_dbpedia[i].question) 
    console.log(input_file_dbpedia[i].entities)
    let entities_dbpedia =[], entities_wikidata =[]
    let e_res = []
    for(let j=0;j<input_file_dbpedia[i].entities.length;j++){
      let el = input_file_dbpedia[i].entities[j]
      if(el!="NIL"){ 
        let ID = gQID(el)    
        let wpToWdUrl = url_wpd+""+ID; 
        //console.log("url_wikibase_item:"+wpToWdUrl)  
        let gFetchWpWd = await fetch(wpToWdUrl, {headers: {"Accept":"application/sparql-results+json", 'Api-User-Agent': 'SMARTASK/3.0', 'Content-Type':'application/json'}})
        sleep(1000)
        wpToWd = safeParseJSON(gFetchWpWd)
        let wikidata_entity = null
        if(wpToWd!={}) wikidata_entity = ""+Object.values(wpToWd.query.pages)[0].pageprops.wikibase_item;
        entities_wikidata.push(String(wikidata_entity))

      } 
    }
    //save in wikidata
    let output_file__wikidata = getJSON_file(output) 
    input_file_wikidata[i].entities = entities_wikidata
    output_file__wikidata.push(input_file_wikidata[i])
    saveJsonFile(output_file__wikidata,output)    
  }
}

module.exports = { 
  remove_words,
  extract_words,
  pre_process, 
  extract_ressource_QA,
  extract_boolean_QA,
  extract_literal_QA,
  gQID,
  gTID,
  wQID,
  wikipediaSearch,
  _AT,  
  _AT_typed,
  _EL,
  searchType,
  params_gctawd,
  params_gcta,
  getJSON_file,
  saveJsonFile,
  NBayes_ATCat,  
  NBayes_AT,
  safeParseJSON,
  NBayes_RL,
  NaivesBayesClsfctRL,
  sleep,
  buildV_EL,
  searchEntity,
  typer_AT,
  NBayes_RL_1step,
  _ELwd,

  stopwords_1,
  stopwords_2,
  stopwords_3,
  stopwords_4,
  stopwords_5,
  rwords,
  RL_rwords,
  RLTokens_toExtract,
  verbs,
  cities,
  nouns,
  nouns2,
  adjectives,
  Interrogate_words,
  URL_wd,
};