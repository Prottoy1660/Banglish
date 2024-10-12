"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Copy, Check, RefreshCw, Search, Mic, CloudSun } from 'lucide-react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const Page = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioFile = new Audio('/music/Sleepwalker.mp3');
    setAudio(audioFile);
  }, []);

  const handlePlayAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <div>
      <button onClick={handlePlayAudio}>Play Audio</button>
    </div>
  );
};



// Existing dictionaries (keep these as they are in the original code)
const banglaTobanglishMap = {
  'অ': ['o', 'ô'], 'আ': ['a', 'aa'], 'ই': ['i', 'ee'], 'ঈ': ['i', 'ee'], 'উ': ['u', 'oo'], 'ঊ': ['u', 'oo'],
  'ঋ': ['ri', 're'], 'এ': ['e', 'ay'], 'ঐ': ['oi', 'oy'], 'ও': ['o', 'oh'], 'ঔ': ['ou', 'ow'],
  'ক': ['k', 'ko'], 'খ': ['kh', 'kho'], 'গ': ['g', 'go'], 'ঘ': ['gh', 'gho'], 'ঙ': ['ng', 'ngo'],
  'চ': ['ch', 'cho'], 'ছ': ['chh', 'chho'], 'জ': ['j', 'jo'], 'ঝ': ['jh', 'jho'], 'ঞ': ['n', 'nio'],
  'ট': ['t', 'to'], 'ঠ': ['th', 'tho'], 'ড': ['d', 'do'], 'ঢ': ['dh', 'dho'], 'ণ': ['n', 'no'],
  'ত': ['t', 'to'], 'থ': ['th', 'tho'], 'দ': ['d', 'do'], 'ধ': ['dh', 'dho'], 'ন': ['n', 'no'],
  'প': ['p', 'po'], 'ফ': ['f', 'pho'], 'ব': ['b', 'bo'], 'ভ': ['bh', 'bho'], 'ম': ['m', 'mo'],
  'য': ['j', 'jo'], 'র': ['r', 'ro'], 'ল': ['l', 'lo'], 'শ': ['sh', 'sho'], 'ষ': ['sh', 'sho'],
  'স': ['s', 'so'], 'হ': ['h', 'ho'], 'ড়': ['r', 'ro'], 'ঢ়': ['rh', 'rho'],
  'ৎ': ['t', 'to'], 'া': ['a', 'aa'], 'ি': ['i', 'ee'], 'ী': ['i', 'ee'], 'ু': ['u', 'oo'], 'ূ': ['u', 'oo'],
  'ৃ': ['ri', 're'], 'ে': ['e', 'ay'], 'ৈ': ['oi', 'oy'], 'ো': ['o', 'oh'], 'ৌ': ['ou', 'ow'],
  '্': ['', ''], 'ং': ['ng', 'ong'], 'ঃ': ['h', 'ho'], 'ঁ': ['n', ''],
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
  '।': '.', '়': ''
}

const conjuncts = {
  'ক্ক': ['kk', 'kko'], 'ক্ট': ['kT', 'kTo'], 'ক্ত': ['kt', 'kto'], 'ক্ব': ['kw', 'kwo'],
  'ক্ম': ['km', 'kmo'], 'ক্য': ['ky', 'kyo'], 'ক্র': ['kr', 'kro'], 'ক্ল': ['kl', 'klo'],
  'ক্ষ': ['kkh', 'kkhyo'], 'ক্ষ্ণ': ['kkhn', 'kkhno'], 'ক্ষ্ম': ['kkhm', 'kkhmo'],
  'খ্য': ['khy', 'khyo'], 'গ্ণ': ['gn', 'gno'], 'গ্ধ': ['gdh', 'gdho'], 'গ্ন': ['gn', 'gno'],
  'গ্ম': ['gm', 'gmo'], 'গ্য': ['gy', 'gyo'], 'গ্র': ['gr', 'gro'], 'গ্ল': ['gl', 'glo'],
  'ঘ্ন': ['ghn', 'ghno'], 'ঘ্য': ['ghy', 'ghyo'], 'ঙ্ক': ['nk', 'nko'], 'ঙ্গ': ['ng', 'ngo'],
  'চ্চ': ['cch', 'ccho'], 'চ্ছ': ['cch', 'ccho'], 'চ্ঞ': ['cn', 'cno'], 'চ্য': ['cy', 'cyo'],
  'জ্জ': ['jj', 'jjo'], 'জ্ঝ': ['jjh', 'jjho'], 'জ্ঞ': ['gg', 'ggo'], 'জ্য': ['jy', 'jyo'],
  'ঞ্চ': ['nch', 'ncho'], 'ঞ্ছ': ['nch', 'ncho'], 'ঞ্জ': ['nj', 'njo'], 'ট্ট': ['TT', 'TTo'],
  'ড্ড': ['DD', 'DDo'], 'ণ্ট': ['nT', 'nTo'], 'ণ্ঠ': ['nTh', 'nTho'], 'ণ্ড': ['nD', 'nDo'],
  'ত্ত': ['tt', 'tto'], 'ত্থ': ['tth', 'ttho'], 'ত্ন': ['tn', 'tno'], 'ত্ম': ['tm', 'tmo'],
  'ত্য': ['ty', 'tyo'], 'ত্র': ['tr', 'tro'], 'থ্য': ['thy', 'thyo'], 'দ্দ': ['dd', 'ddo'],
  'দ্ধ': ['ddh', 'ddho'], 'দ্ব': ['dw', 'dwo'], 'দ্ম': ['dm', 'dmo'], 'দ্য': ['dy', 'dyo'],
  'ধ্ন': ['dhn', 'dhno'], 'ধ্ম': ['dhm', 'dhmo'], 'ধ্য': ['dhy', 'dhyo'], 'ন্ট': ['nT', 'nTo'],
  'ন্ঠ': ['nTh', 'nTho'], 'ন্ড': ['nD', 'nDo'], 'ন্ত': ['nt', 'nto'], 'ন্থ': ['nth', 'ntho'],
  'ন্দ': ['nd', 'ndo'], 'ন্ধ': ['ndh', 'ndho'], 'ন্ন': ['nn', 'nno'], 'ন্ম': ['nm', 'nmo'],
  'ন্য': ['ny', 'nyo'], 'প্ট': ['pT', 'pTo'], 'প্ত': ['pt', 'pto'], 'প্ন': ['pn', 'pno'],
  'প্প': ['pp', 'ppo'], 'প্য': ['py', 'pyo'], 'প্র': ['pr', 'pro'], 'প্ল': ['pl', 'plo'],
  'ফ্য': ['fy', 'fyo'], 'ব্জ': ['bj', 'bjo'], 'ব্দ': ['bd', 'bdo'], 'ব্ধ': ['bdh', 'bdho'],
  'ব্ব': ['bb', 'bbo'], 'ব্য': ['by', 'byo'], 'ব্র': ['br', 'bro'], 'ব্ল': ['bl', 'blo'],
  'ভ্য': ['bhy', 'bhyo'], 'ভ্র': ['bhr', 'bhro'], 'ম্ন': ['mn', 'mno'], 'ম্প': ['mp', 'mpo'],
  'ম্ফ': ['mf', 'mfo'], 'ম্ব': ['mb', 'mbo'], 'ম্ভ': ['mbh', 'mbho'], 'ম্ম': ['mm', 'mmo'],
  'ম্য': ['my', 'myo'], 'য্য': ['yy', 'yyo'], 'র্ক': ['rk', 'rko'], 'র্গ': ['rg', 'rgo'],
  'র্ঘ': ['rgh', 'rgho'], 'র্চ': ['rch', 'rcho'], 'র্জ': ['rj', 'rjo'], 'র্ণ': ['rn', 'rno'],
  'র্ত': ['rt', 'rto'], 'র্থ': ['rth', 'rtho'], 'র্দ': ['rd', 'rdo'], 'র্ধ': ['rdh', 'rdho'],
  'র্ন': ['rn', 'rno'], 'র্প': ['rp', 'rpo'], 'র্ফ': ['rf', 'rfo'], 'র্ব': ['rb', 'rbo'],
  'র্ভ': ['rbh', 'rbho'], 'র্ম': ['rm', 'rmo'], 'র্য': ['ry', 'ryo'], 'র্ল': ['rl', 'rlo'],
  'র্শ': ['rsh', 'rsho'], 'র্ষ': ['rsh', 'rsho'], 'র্স': ['rs', 'rso'], 'র্হ': ['rh', 'rho'],
  'ল্ক': ['lk', 'lko'], 'ল্গ': ['lg', 'lgo'], 'ল্ট': ['lT', 'lTo'], 'ল্ড': ['lD', 'lDo'],
  'ল্প': ['lp', 'lpo'], 'ল্ফ': ['lf', 'lfo'], 'ল্ব': ['lb', 'lbo'], 'ল্ম': ['lm', 'lmo'],
  'ল্য': ['ly', 'lyo'], 'শ্চ': ['shch', 'shcho'], 'শ্ন': ['shn', 'shno'], 'শ্ব': ['shw', 'shwo'],
  'শ্ম': ['shm', 'shmo'], 'শ্য': ['shy', 'shyo'], 'শ্র': ['shr', 'shro'], 'শ্ল': ['shl', 'shlo'],
  'ষ্ক': ['shk', 'shko'], 'ষ্ট': ['shT', 'shTo'], 'ষ্ঠ': ['shTh', 'shTho'], 'ষ্ণ': ['shn', 'shno'],
  'ষ্প': ['shp', 'shpo'], 'ষ্ফ': ['shf', 'shfo'], 'ষ্ম': ['shm', 'shmo'], 'ষ্য': ['shy', 'shyo'],
  'স্ক': ['sk', 'sko'], 'স্খ': ['skh', 'skho'], 'স্ট': ['sT', 'sTo'], 'স্ত': ['st', 'sto'],
  'স্থ': ['sth', 'stho'], 'স্ন': ['sn', 'sno'], 'স্প': ['sp', 'spo'], 'স্ফ': ['sf', 'sfo'],
  'স্ব': ['sw', 'swo'], 'স্ম': ['sm', 'smo'], 'স্য': ['sy', 'syo'], 'স্র': ['sr', 'sro'],
  'স্ল': ['sl', 'slo'], 'হ্ণ': ['hn', 'hno'], 'হ্ন': ['hn', 'hno'], 'হ্ব': ['hw', 'hwo'],
  'হ্ম': ['hm', 'hmo'], 'হ্য': ['hy', 'hyo'], 'হ্র': ['hr', 'hro'], 'হ্ল': ['hl', 'hlo']
}

const specialWords = {
  'এবং': ['ebong', 'ebong'],
  'অথবা': ['othoba', 'athaba'],
  'কিন্তু': ['kintu', 'kinto'],
  'তথাপি': ['tothapi', 'tathapi'],
  'যদি': ['jodi', 'jadi'],
  'তবে': ['tobe', 'tabe'],
  
  'কারণ': ['karon', 'kaaron'],
  'জন্য': ['jonno', 'jonne'],
  'থেকে': ['theke', 'thekay'],
  'পর্যন্ত': ['porjonto', 'porjnto'],
  'মধ্যে': ['moddhe', 'moddhay'],
  'সাথে': ['sathe', 'sathay'],
  'দ্বারা': ['dwara', 'dara'],
  'বিষয়ে': ['bishoe', 'bishoya'],
  'প্রতি': ['proti', 'proti'],
  'জন্মদিন': ['jonmodin', 'jnmodin'],
  'শুভেচ্ছা': ['shubhecha', 'shubheccha'],
  'ধন্যবাদ': ['dhonnobad', 'dhanyabad'],
  'নোয়াখালী': ['noakhali', 'noakhali'],
  'জুলফিকার': ['zulfikar', 'zulfikar']
}

const commonErrors = {
  'ami': ['ami', 'aami'],
  'krbo': ['krbo', 'korbo'],
  'noakhali': ['noয়akhali', 'noakhali'],
  'hello': ['hyalo', 'hello'],
  'zulfikar': ['julfikar', 'zulfikar'],
  'tumi': ['tumi', 'tomi'],
  'apni': ['apni', 'aapni'],
  'bhalobasa': ['bhalobasa', 'bhalobasha'],
  'khub': ['khub', 'khoop'],
}

const englishWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'])

const banglaToBanglishAlternatives = {
  'আমি': ['ami', 'aami'],
  'নোয়াখালী': ['noয়akhali', 'noakhali'],
  'জুলফিকার': ['julfikar', 'zulfikar'],
  'হ্যালো': ['hyalo', 'hello'],
  'করবো': ['krbo', 'korbo'],
  'তুমি': ['tumi', 'tomi'],
  'আপনি': ['apni', 'aapni'],
  'ভালোবাসা': ['bhalobasa', 'bhalobasha'],
  'খুব': ['khub', 'khoop'],
  'আকাশ': ['akash', 'aakash'],
  'মাটি': ['mati', 'matir'],
'নদী': ['nodi', 'nodii'],
'সাগর': ['sagor', 'shagor'],
'সূর্য': ['shurjo', 'surjo'],
'চাঁদ': ['chand', 'chaand'],
'তারা': ['tara', 'taara'],
'বৃষ্টি': ['brishti', 'bristi'],
'রাত': ['rat', 'raat'],
'দিন': ['din', 'deen'],
'ঘর': ['ghor', 'ghar'],
'গাছ': ['gach', 'gachh'],
'পাখি': ['pakhi', 'paakhi'],
'মানুষ': ['manush', 'maanush'],
'জীবন': ['jibon', 'jeevan'],
'মরণ': ['moron', 'maran'],
'হাসি': ['hashi', 'hasi'],
'কান্না': ['kanna', 'kaanla'],
'খুশি': ['khushi', 'khusii'],
'দুঃখ': ['dukkho', 'dukkha'],
'ভয়': ['bhoy', 'vhoy'],
'আশা': ['asha', 'aasha'],
'স্বপ্ন': ['shopno', 'svapno'],
'কাজ': ['kaj', 'kaaj'],
'খেলা': ['khela', 'khelaa'],
'গান': ['gaan', 'gan'],
'কবিতা': ['kobita', 'kovita'],
'ছবি': ['chobi', 'chhobi'],
'বই': ['boi', 'boy'],
'লেখা': ['lekha', 'likha'],
'পড়া': ['pora', 'porha'],
'শোনা': ['shona', 'shuna'],
'দেখা': ['dekha', 'dekhte'],
'বলা': ['bola', 'balte'],
'করা': ['kora', 'korar'],
'যাওয়া': ['jaowa', 'jaoya'],
'আসা': ['asha', 'ashte'],
'থাকা': ['thaka', 'theka'],
'খাওয়া': ['khaowa', 'khaoa'],
'পান করা': ['paan kora', 'paan korte'],
'আম': ['am', 'aam'],
'জাম': ['jam', 'jaam'],
'কাঁঠাল': ['kathal', 'kaathal'],
'লিচু': ['lichu', 'lichoo'],
'কলা': ['kola', 'kalaa'],
'আলু': ['alu', 'aloo'],
'পেঁয়াজ': ['peyaj', 'peyaj'],
'রসুন': ['roshun', 'roshune'],
'আদা': ['ada', 'aadaa'],
'মরিচ': ['morich', 'morichh'],
'ধান': ['dhan', 'dhaan'],
'চাল': ['chal', 'chaal'],
'গম': ['gom', 'gome'],
'আটা': ['ata', 'aata'],
'ময়দা': ['moida', 'moyda'],
'তেল': ['tel', 'tele'],
'ঘি': ['ghi', 'ghee'],
'মাছ': ['mach', 'machh'],
'মাংস': ['mangsho', 'mangso'],
'ডিম': ['dim', 'deem'],
'দুধ': ['dudh', 'doodh'],
'চিনি': ['chini', 'chine'],
'লবণ': ['lobon', 'laban'],
'জল': ['jol', 'jal'],
'পানি': ['pani', 'paani'],
'আগুন': ['agun', 'aagun'],
'বাতাস': ['batas', 'baataash'],
'মা': ['ma', 'maa'],
'বাবা': ['baba', 'baaba'],
'ভাই': ['bhai', 'vai'],
'বোন': ['bon', 'bone'],
'বন্ধু': ['bondhu', 'bondhuu'],
'শত্রু': ['shatru', 'shotroo'],
'রাজা': ['raja', 'raaja'],
'রানী': ['rani', 'raani'],
'দেশ': ['desh', 'desh'],
'বিদেশ': ['bidesh', 'bidesh'],
'গ্রাম': ['gram', 'graam'],
'শহর': ['shohor', 'shahar'],
'গাড়ি': ['gari', 'gaari'],
'রাস্তা': ['rasta', 'raasta'],
'স্কুল': ['skul', 'school'],
'কলেজ': ['kolej', 'college'],
'হাসপাতাল': ['haspatal', 'hospital'],
'বাজার': ['bajar', 'baajaar'],
'দোকান': ['dokan', 'dookaan'],
'মন্দির': ['mondir', 'mandir'],
'মসজিদ': ['mosjid', 'mosjid'],
'গির্জা': ['girja', 'girjaa'],
'ঘুমানো': ['ghumano', 'ghumano'],
'জাগা': ['jaga', 'jaaga'],
'হাঁটা': ['hata', 'hataa'],
'দৌড়ানো': ['dourano', 'dourano'],
'কাজ করা': ['kaj kora', 'kaaj koraa'],
'গান গাওয়া': ['gaan gaoya', 'gaan gaowa'],
'নাচা': ['nacha', 'nachte'],
'খেলা করা': ['khela kora', 'khela koraa'],
'ভালো': ['bhalo', 'bhalo'],
'মন্দ': ['mondo', 'mondo'],
'বড়': ['boro', 'boro'],
'ছোট': ['choto', 'choto'],
'নতুন': ['notun', 'notune'],
'পুরাতন': ['puraton', 'puraton'],
'গরম': ['gorom', 'garom'],
'ঠান্ডা': ['thanda', 'thandaa'],
'উঁচু': ['unchu', 'unchu'],
'নীচু': ['nichu', 'nichu'],
'শক্ত': ['shokto', 'shokto'],
'নরম': ['norom', 'norom'],
'আজ': ['aj', 'aaj'],
'কাল': ['kal', 'kaal'],
'পরশু': ['porshu', 'parshu'],
'তারপর': ['tarpor', 'taarpor'],
'এখন': ['ekhon', 'ekhon'],
'পরে': ['pore', 'porer'],
'আগে': ['age', 'aage'],
'সকাল': ['shokal', 'sokal'],
'দুপুর': ['dupur', 'dupur'],
'বিকেল': ['bikel', 'bikal'],
'সন্ধ্যা': ['shondha', 'sondhya'],
'এখানে': ['ekhane', 'ekhane'],
'সেখানে': ['shekhane', 'sekhane'],
'ওখানে': ['okhane', 'okhane'],
'কোথায়': ['kothay', 'kothaye'],
'কেন': ['keno', 'ken'],
'কিভাবে': ['kivabe', 'kibhabe'],
'কি': ['ki', 'kii'],
'কে': ['ke', 'ke'],
'কার': ['kar', 'kaar'],
'কাকে': ['kake', 'kaake'],
'কিসের': ['kisher', 'kiser'],
'কোন': ['kon', 'kon'],
'কত': ['koto', 'koto'],
'যদি': ['jodi', 'jodi'],
'তবে': ['tobe', 'tabe'],
'কারণ': ['karon', 'kaarone'],
'যেমন': ['jemon', 'jemoni'],
'অনেক': ['onek', 'oneek'],
'কিছু': ['kichu', 'kichhu'],
'সব': ['shob', 'sob'],
'কোনো': ['kono', 'kono'],
'একটা': ['ekta', 'ektaa'],
'দুটো': ['duto', 'dutoo'],
'তিনটে': ['tinte', 'tinte'],
'চারটে': ['charte', 'chaarte'],
'পাঁচটা': ['pachta', 'paachta'],
'প্রথম': ['prothom', 'prathom'],
'দ্বিতীয়': ['dwitiyo', 'ditiyo'],
'তৃতীয়': ['tritio', 'tritiyo'],
'চতুর্থ': ['chaturtho', 'chaturtho'],
'পঞ্চম': ['ponchom', 'ponchom'],
'খারাপ': ['kharap', 'kharap'],
'সুন্দর': ['shundor', 'sundor'],
'কুৎসিত': ['kutshit', 'kutsit'],
'লম্বা': ['lomba', 'lombaa'],
'বেঁটে': ['bete', 'bente'],
'মোটা': ['mota', 'motaa'],
'চিকন': ['chikon', 'chikon'],
'গরিব': ['gorib', 'garib'],
'ধনী': ['dhoni', 'dhoni'],
'শক্তিশালী': ['shoktishali', 'shoktishali'],
'দুর্বল': ['durbol', 'durbol'],
'চোখ': ['chokh', 'chok'],
'নাক': ['nak', 'naak'],
'কান': ['kan', 'kaan'],
'মুখ': ['mukh', 'mukhe'],
'হাত': ['hat', 'haat'],
'পা': ['pa', 'paa'],
'মাথা': ['matha', 'mathaa'],
'পেট': ['pet', 'pete'],
'হৃদয়': ['hriday', 'hridoi'],
'মন': ['mon', 'mone'],
'দেহ': ['deh', 'deho'],
'প্রাণ': ['pran', 'praan'],
'আত্মা': ['atma', 'aatma'],
'রক্ত': ['rokto', 'rokt'],
'হাড়': ['har', 'haar'],
'চামড়া': ['chamra', 'chamaraa'],
'চুল': ['chul', 'chule'],
'দাঁত': ['dat', 'daant'],
'জিহ্বা': ['jihba', 'jibhaa'],
'গলা': ['gola', 'galaa'],
'বুক': ['buk', 'buke'],
'পিঠ': ['pith', 'pithe'],
'কোমর': ['komor', 'komore'],
'হাঁটু': ['hatu', 'haatu'],
'পায়ের পাতা': ['payer pata', 'paer pataa'],
'আঙুল': ['angul', 'aangul'],
'নখ': ['nokh', 'noke'],
'বোঝা': ['boja', 'bojha'],
'জানা': ['jana', 'jaana'],
'চিন্তা করা': ['chinta kora', 'chintaa kora'],
'ভাবা': ['bhaba', 'vhaba'],
'মনে করা': ['mone kora', 'mone koraa'],
'বিশ্বাস করা': ['bishwas kora', 'bishwash kora'],
'স্মরণ করা': ['smoron kora', 'smoron koraa'],
'ভুলে যাওয়া': ['bhule jaowa', 'bhule jaoya'],
'হাসা': ['hasa', 'haste'],
'কান্না করা': ['kanna kora', 'kannaa kora'],
'রাগ করা': ['rag kora', 'raag kora'],
'ভয় পাওয়া': ['bhoy paowa', 'vhoy paoya'],
'আনন্দ করা': ['anondo kora', 'anondito hoy'],
'দুঃখ পাওয়া': ['dukkho paowa', 'dukkhito hoy'],
'ঘৃণা করা': ['ghrina kora', 'ghrinaa kora'],
'কৃতজ্ঞতা': ['kritognota', 'kritognataa'],
'ক্ষমা': ['khoma', 'khomaa'],
'যাওয়া': ['jaowa', 'jaoya'],
'খাওয়া': ['khaowa', 'khaoa'],
'পড়া': ['pora', 'porha'],
'গান গাওয়া': ['gaan gaoya', 'gaan gaowa'],
'ভয় পাওয়া': ['bhoy paowa', 'vhoy paoya'],
'কথা বলা': ['kotha bola', 'kotha balaa'],
'দৌড়ানো': ['dourano', 'dourano'],
'ঝগড়া করা': ['jhogra kora', 'jhograa kora'],
'মারামারি করা': ['maramari kora', 'maramari kor,aa'],
'নাচ': ['nach', 'naach'],
'কথা': ['kotha', 'kothaa'],
'ঝগড়া': ['jhogra', 'jhograa'],
'মারামারি': ['maramari', 'maramarii'],
'বড়': ['boro', 'boro'],
'ভারী': ['bhari', 'bhaari'],
'হালকা': ['halka', 'haalka'],
'তেজ': ['tej', 'teje'],
'মন্থর': ['monthor', 'monthore'],
'নক্ষত্র': ['nokkhotro', 'nokkhotro'],
'গ্রহ': ['groho', 'graho'],
'মেঘ': ['megh', 'megh'],
'ঝড়': ['jhor', 'jhor'],
'বন্যা': ['bonna', 'bonyaa'],
'ভূমিকম্প': ['bhumikompo', 'bhumikompo'],
'ফুল': ['ful', 'phool'],
'পাতা': ['pata', 'paata'],
'পাহাড়': ['pahar', 'pahaar'],
'মাঠ': ['math', 'maath'],
'বাড়ি': ['bari', 'baari'],
'ট্রেন': ['train', 'train'],
'বিমান': ['biman', 'biman'],
'জাহাজ': ['jahaj', 'jahaaj'],
'ভ্রমণ করা': ['bhromon kora', 'bhramon koraa'],
'কেনাকাটা করা': ['kenakata kora', 'kenakataa kora'],
'চাকরি করা': ['chakri kora', 'chakri koraa'],
'ব্যবসা করা': ['byobsha kora', 'byobsaa kora'],
'পড়াশোনা করা': ['porashona kora', 'porashonaa kora'],
'গবেষণা করা': ['gobeshona kora', 'gobeshonaa kora'],
'আলো': ['alo', 'aaloo'],
'আঁধার': ['andhar', 'andhaar'],
'রং': ['rong', 'rong'],
'গন্ধ': ['gondho', 'gondho'],
'শব্দ': ['shobdo', 'shobdo'],
'স্বাদ': ['swad', 'shaad'],
'স্পর্শ': ['sporsho', 'sporsho'],
'আবেগ': ['abegg', 'abeg'],
'ভাবনা': ['vabna', 'bhaabnaa'],
'জ্ঞান': ['ggan', 'gyaan'],
'বিজ্ঞান': ['biggan', 'bijnaan'],
'প্রযুক্তি': ['projukti', 'projukti'],
'শিল্প': ['shilpo', 'shilpo'],
'সংস্কৃতি': ['songskriti', 'songskriti'],
'ইতিহাস': ['itihash', 'itihaash'],
'ভূগোল': ['bhugol', 'bhugool'],
'অর্থনীতি': ['orthoniti', 'orthoniti'],
'রাজনীতি': ['rajniti', 'rajniti'],
'সমাজ': ['shomaj', 'shomaj'],
'পরিবার': ['poribar', 'poribaar'],
'বন্ধুত্ব': ['bondhutto', 'bondhutto'],
'প্রেম': ['prem', 'prem'],
'বিবাহ': ['bibaho', 'bibaho'],
'শিক্ষা': ['shikkha', 'shikkhaa'],
'কর্ম': ['kormmo', 'kormmo'],
'ধর্ম': ['dhormo', 'dhormmo'],
'আধ্যাত্মিকতা': ['adhyatmikota', 'adhyaatmikotaa'],
'নীতি': ['niti', 'niti'],
'ন্যায়': ['nyay', 'nyaay'],
'সত্য': ['sotto', 'sottyo'],
'মিথ্যা': ['miththa', 'mithyaa'],
'সঠিক': ['sothik', 'sothik'],
'ভুল': ['bhul', 'bhul'],
'সহজ': ['shohoj', 'shohoj'],
'কঠিন': ['kothin', 'kothin'],
'সম্ভব': ['shombhob', 'shombhob'],
'অসম্ভব': ['oshombhob', 'oshombhob'],
'প্রয়োজনীয়': ['proyojonio', 'proyojoniyo'],
'অপ্রয়োজনীয়': ['oproyojonio', 'oproyojoniyo'],
'উপকারী': ['upkari', 'upkaari'],
'অপকারী': ['opkari', 'opkaari'],
'সুখ': ['sukh', 'sukh'],
'নিরাশা': ['nirasha', 'niraashaa'],
'সাহস': ['sahosh', 'shaahosh'],
'ক্রোধ': ['krodho', 'krodh'],
'প্রতিশোধ': ['protishodh', 'protishodh'],
'লোভ': ['lobh', 'lobh'],
'মোহ': ['moh', 'moh'],
'মায়া': ['maya', 'maayaa'],
'পৃথিবী': ['prithibi', 'prithibii'],
'জলবায়ু': ['jolbayu', 'jalbaayu'],
'পরিবেশ': ['poribesh', 'paribesh'],
'প্রকৃতি': ['prokriti', 'prokriti'],
'জীববৈচিত্র্য': ['jiboboichitro', 'jiboboichitryo,'],
'বাস্তুতন্ত্র': ['bastutontro', 'bastutantro'],
'খাদ্য': ['khaddo', 'khaaddo'],
'পুষ্টি': ['pushti', 'pushti'],
'স্বাস্থ্য': ['swasthyo', 'swasthyo'],
'রোগ': ['rogg', 'rogg'],
'চিকিৎসা': ['chikitsa', 'chikitsaa'],
'ঔষধ': ['oushodh', 'oushudh'],
'শরীর': ['shorir', 'shoriir'],
'চিন্তা': ['chinta', 'chintaa'],
'বুদ্ধি': ['buddhi', 'buddhi'],
'স্মৃতি': ['smriti', 'smriti'],
'কল্পনা': ['kolpona', 'kolponaa'],
'চেতনা': ['chetna', 'chetnaa'],
'অবচেতন': ['obochetton', 'obochetton'],
'ব্যক্তিত্ব': ['byoktitto', 'byoktitto'],
'আচরণ': ['achoron', 'aachoron'],
'অভ্যাস': ['obbhas', 'obhyaash'],
'সংস্কার': ['songskar', 'songskaar'],
'মূল্যবোধ': ['mullohodh', 'mullohodh'],
'আদর্শ': ['adorsho', 'aadorsho'],
'বিশ্বাস': ['bishshash', 'bishwaash'],
'দর্শন': ['dorshon', 'dorshon'],
'সাহিত্য': ['sahitto', 'saahityo'],
'সংগীত': ['shonggit', 'songgiit'],
'নৃত্য': ['nritto', 'nritto'],
'চলচ্চিত্র': ['cholcchitro', 'cholcchitro'],
'বিনোদন': ['binodon', 'binodon'],
'ভ্রমণ': ['bhromon', 'bhramon'],
'অভিজ্ঞতা': ['obhiggonta', 'obhiggontaa'],
'মৃত্যু': ['mrittu', 'mrittu'],
'সময়': ['shomoy', 'shomay'],
'অতীত': ['otito', 'atit'],
'বর্তমান': ['borttoman', 'borttoman'],
'ভবিষ্যৎ': ['vobisshot', 'vobishshot'],
'ক্ষণ': ['kkhon', 'kkhon'],
'ঘণ্টা': ['ghonta', 'ghontaa'],
'সপ্তাহ': ['shoptaho', 'soptaho'],
'মাস': ['mash', 'maash'],
'বছর': ['bochhor', 'bochhor'],
'যুগ': ['jug', 'jug'],
'শতাব্দী': ['shotobdi', 'shotobdi'],
'অনন্তকাল': ['onontokal', 'onontokaal'],
'জন্ম': ['jonmo', 'jonmo'],
'সংগ্রাম': ['songgram', 'songgraam'],
'সাফল্য': ['shafolno', 'shafolno'],
'ব্যর্থতা': ['byortho', 'byorthotaa'],
'আকাঙ্ক্ষা': ['akankha', 'akankhaa'],
'ইচ্ছা': ['iccha', 'ichchhaa'],
'কামনা': ['kamona', 'kaamonaa'],
'লক্ষ্য': ['lokkho', 'lokkhyo'],
'উদ্দেশ্য': ['uddesho', 'uddeshyo'],
'পরিকল্পনা': ['porikolpona', 'porikolponaa'],
'প্রচেষ্টা': ['procheshta', 'procheshtaa'],
'সাধনা': ['sadhona', 'saadhonaa'],
'অধ্যবসায়': ['odhoboshay', 'odhoboshaay'],
'ধৈর্য': ['dhoirjo', 'dhoirjo'],
'আত্মবিশ্বাস': ['attobishshash', 'aatmobishshaash'],
'প্রতিভা': ['protiba', 'protibhaa'],
'সৃজনশীলতা': ['srijonšilota', 'sriijonshilotaa'],
'উদ্ভাবন': ['udbhabbon', 'udbhaabon'],
'পরিবর্তন': ['poriborton', 'poriborton'],
'উন্নতি': ['unnoti', 'unnoti'],
'অগ্রগতি': ['ogroghoti', 'ogrogati'],
'সফলতা': ['shofolta', 'shofoltaa'],
'আনন্দ': ['anondo', 'anond'],
'উল্লাস': ['ullash', 'ullash'],
'হর্ষ': ['harshho', 'harsh'],
'তৃপ্তি': ['triptti', 'tripti'],
'সন্তুষ্টি': ['shontushti', 'sontushti'],
'প্রফুল্লতা': ['profullota', 'profullotaa'],
'উচ্ছ্বাস': ['ucchash', 'ucchwaash'],
'স্নেহ': ['sneh', 'sneh'],
'মমতা': ['momota', 'momotaa'],
'করুণা': ['koruna', 'korunaa'],
'দয়া': ['doya', 'doyaa'],
'শ্রদ্ধা': ['shraddha', 'shraddhaa'],
'ভক্তি': ['bhokti', 'bhakti'],
'আস্থা': ['astha', 'aasthaa'],
'গর্ব': ['gorbo', 'gorb'],
'অহংকার': ['ohongkar', 'ohongkaar'],
'মান': ['maan', 'maan'],
'সম্মান': ['shomman', 'somman'],
'প্রতিপত্তি': ['protipotti', 'protipatti'],
'খ্যাতি': ['khyati', 'khyaati'],
'যশ': ['josh', 'josh'],
'কীর্তি': ['kirti', 'kirti'],
'পরিচয়': ['porichoy', 'porichoy'],
'স্বাতন্ত্র্য': ['shatontro', 'shaatontro'],
'মর্যাদা': ['mordo', 'mordo'],
'অধিকার': ['odhikar', 'odhikaar'],
'ক্ষমতা': ['khomota', 'khomotaa'],
'প্রভাব': ['probhab', 'probhaab'],
'নিয়ন্ত্রণ': ['niyontro', 'niyontroN'],
'নেতৃত্ব': ['netritto', 'netritto'],
'আধিপত্য': ['adhipotto', 'aadhipotto'],
'সম্পদ': ['shompod', 'sompod'],
'ঐশ্বর্য': ['oishshorjo', 'aishshorjo'],
'বিত্ত': ['bitto', 'bitto'],
'সম্পত্তি': ['shompotti', 'sompotti'],
'ধন': ['dhon', 'dhon'],
'দৌলত': ['doulot', 'doulot'],
'অরণ্য': ['oronno', 'oronn'],
'জঙ্গল': ['jonggol', 'jonggol'],
'বন': ['bon', 'bon'],
'গাছপালা': ['gachpala', 'gachhpalaa'],
'ফল': ['fol', 'phol'],
'পশু': ['poshu', 'poshu'],
'কীটপতঙ্গ': ['kitpotonggo', 'kitpotonggo'],
'জলজ প্রাণী': ['joljo prani', 'joljo praani'],
'সরীসৃপ': ['sorisrip', 'sorishrip'],
'উভচর': ['ubochor', 'ubochor'],
'স্তন্যপায়ী': ['stonnopayi', 'stonnopaayii'],
'সে': ['she', 'se'],
'আমরা': ['amra', 'aamra'],
'তোমরা': ['tomra', 'tomraa'],
'এটা': ['eta', 'eitaa'],
'ওটা': ['ota', 'ootaa'],
'সেটা': ['sheta', 'shetaa'],
'এই': ['ei', 'eei'],
'ওই': ['oi', 'ooi'],
'সেই': ['shei', 'sheei'],
'কখন': ['kokhon', 'kokhon'],
'হ্যাঁ': ['ha', 'haan'],
'না': ['na', 'naa'],
'হয়তো': ['hoyto', 'hoytoo'],
'অবশ্যই': ['oboshshoi', 'oboshshoyi'],
'ঠিক আছে': ['thik ache', 'thik aache'],
'দয়া করে': ['doya kore', 'doyaa kore'],
'ধন্যবাদ': ['dhonnobad', 'dhonnobaad'],
'সবসময়': ['shobshomoy', 'shobshomoy'],
'কখনো': ['kokhono', 'kokhono'],
'আবার': ['abar', 'abaar'],
'কিন্তু': ['kintu', 'kintu'],
'তাই': ['tai', 'taai'],
'যে': ['je', 'je'],
'যার': ['jar', 'jaar'],
'যাকে': ['jake', 'jaake'],
'যারা': ['jara', 'jaaraa'],
'যাদের': ['jader', 'jaader'],
'যাদেরকে': ['jaderke', 'jaaderke'],
'এবং': ['ebong', 'ebong'],
'অথবা': ['othoba', 'othobaa'],
'নয়': ['noy', 'noy'],
'শুধু': ['shudhu', 'shudhu'],
'মাত্র': ['matro', 'matro'],
'বেশি': ['beshi', 'beshi'],
'কম': ['kom', 'kom'],
'উপরে': ['upore', 'upore'],
'নীচে': ['niche', 'niche'],
'সামনে': ['shamne', 'saamne'],
'পেছনে': ['pechone', 'pechone'],
'ডানে': ['dane', 'Daane'],
'বামে': ['bame', 'baame'],
'কাছে': ['kache', 'kaache'],
'দূরে': ['dure', 'dure'],
'ভেতরে': ['bhetore', 'bhetore'],
'বাইরে': ['baire', 'baire'],
'মাঝে': ['maje', 'maajhe'],
'শুরু': ['shuru', 'shuru'],
'শেষ': ['shesh', 'shesh'],
'তখন': ['tokhon', 'tokhon'],
'কখনও': ['kokhono', 'kokhonO'],
'আর': ['ar', 'aar'],
'ও': ['o', 'oo'],
'যদিও': ['jodiO', 'jodiyo'],
'তবুও': ['tobuO', 'tobuo'],
'অর্থাৎ': ['orthoT', 'orthat'],
'যখন': ['jokhon', 'jokhon'],
'যেখানে': ['jekhane', 'jekhane'],
'যতক্ষণ': ['jotokkhon', 'jotokkhon'],
'যত': ['joto', 'joto'],
'যেভাবে': ['jebhabe', 'jebhabe'],
'যেরকম': ['jerokom', 'jerokom'],
'যেহেতু': ['jehetu', 'jehetu'],
'যাইহোক': ['jaihok', 'jaihok'],
'তাহলে': ['tahole', 'tahole'],
'নাহলে': ['nahole', 'nahole'],
'মানে': ['mane', 'maane'],
'অন্য': ['onno', 'onno'],
'সকল': ['shokol', 'sokol'],
'প্রত্যেক': ['prottek', 'prottek'],
'কয়েক': ['koyek', 'koyek'],
'প্রায়': ['pray', 'praay'],
'সম্পূর্ণ': ['shompurno', 'sompurno'],
'আংশিক': ['angshik', 'aangshik'],
'একই': ['ekoi', 'ekoi'],
'আলাদা': ['alada', 'alaadaa'],
'একটি': ['ekti', 'ektii'],
'কোনও': ['kono', 'konO'],
'কিছুই': ['kichui', 'kichhui'],
'সবাই': ['shobai', 'sobai'],
'কেউ': ['keu', 'keu'],
'কারও': ['karor', 'kaaror'],
'কোনও কিছু': ['kono kichu', 'konO kichhu'],
'যে কোনও': ['je kono', 'je konO'],
'যে কেউ': ['je keu', 'je keu'],
'সে যাই হোক': ['she jai hok', 'se jai hok'],
'এমনকি': ['emonki', 'emonkii'],
'অন্তত': ['ontoto', 'ontoto'],
'মোটামুটি': ['motamoti', 'moTaamuti'],
'একরকম': ['ekrokom', 'ekrokom'],
'ভিন্ন': ['bhinno', 'bhinno'],
'বিশেষ': ['bishesh', 'bishesh'],
'সাধারণ': ['sadharon', 'saadhaaron'],
'উত্তম': ['uttom', 'uttom'],
'সেরা': ['shera', 'shera'],
'খারাপতম': ['kharaptomo', 'kharaptomo'],
'উচ্চ': ['uccho', 'uccho'],
'নীচ': ['nich', 'nich'],
'বৃহৎ': ['brihot', 'brihot'],
'ক্ষুদ্র': ['khudro', 'khudro'],
'দীর্ঘ': ['dirgho', 'dirgho'],
'হ্রস্ব': ['hrosho', 'hrosho'],
'প্রশস্ত': ['proshoshto', 'proshoshto'],
'সংকীর্ণ': ['shongkirno', 'songkirno'],
'গুরু': ['guru', 'guru'],
'লঘু': ['loghu', 'loghu'],
'ঘন': ['ghono', 'ghono'],
'পাতলা': ['patla', 'patlaa'],
'তীক্ষ্ণ': ['tikkhno', 'tikkhno'],
'স্থূল': ['sthulo', 'sthulo'],
'গতি': ['goti', 'goti'],
'স্থিতি': ['sthiti', 'sthiti'],
'আকৃতি': ['akriti', 'aakriti'],
'রূপ': ['rup', 'roop'],
'তাপ': ['tap', 'taap'],
'শীত': ['shit', 'sheet'],
'বায়ু': ['bayu', 'baayu'],
'স্থল': ['sthol', 'sthol'],
'পুরুষ': ['purush', 'purush'],
'মহিলা': ['mohila', 'mohilaa'],
'ছেলে': ['chele', 'chele'],
'মেয়ে': ['meye', 'meye'],
'শিশু': ['shishu', 'shishu'],
'বৃদ্ধ': ['briddho', 'briddho'],
'জাতি': ['jati', 'jaati'],
'বিদ্যা': ['bidda', 'bidyaa'],
'অধ্যয়ন': ['odhyoyon', 'odhyoyon'],
'পাঠ': ['path', 'paath'],
'গ্রন্থ': ['grohntho', 'grantho'],
'পুস্তক': ['pushtok', 'pustok'],
'মস্তিষ্ক': ['mostishko', 'mostishk'],
'ক্যামেরা': ['kyamera', 'camera'],
'ভিডিও': ['bhidio', 'video'],
'অডিও': ['odio', 'audio'],
'রেকর্ড': ['rekord', 'record'],
'ফাইল': ['fail', 'file'],
'ফোল্ডার': ['folder', 'folder'],
'স্টোরেজ': ['storej', 'storage'],
'মেমোরি': ['memori', 'memory'],
'প্রিন্ট': ['print', 'print'],
'স্ক্যান': ['skan', 'scan'],
'কপি': ['kopi', 'copy'],
'পেস্ট': ['pest', 'paste'],
'কাট': ['kat', 'cut'],
'ডিলিট': ['dilit', 'delete'],
'সেভ': ['shebh', 'save'],
'শেয়ার': ['sheyar', 'share'],
'বিশ্ব': ['bishsho', 'bishwo'],
'রাজ্য': ['rajjo', 'rajyo'],
'মরুভূমি': ['morubhumi', 'morubhumi'],
'আবহাওয়া': ['abhaoa', 'aabohaoaa'],
'বায়ুমণ্ডল': ['bayumondol', 'baayumondol'],
'জীব': ['jib', 'jiib'],
'প্রাণী': ['prani', 'praaNi'],
'উদ্ভিদ': ['udbhid', 'udbhid'],
'কীট': ['kit', 'kiiT'],
'শিকড়': ['shikor', 'shikor'],
'কান্ড': ['kando', 'kaNdo'],
'শিক্ষক': ['shikkhok', 'shikkhok'],
'বিদ্যালয়': ['biddaloy', 'bidyaloy'],
'বিশ্ববিদ্যালয়': ['bishshobiddaloy', 'bishwabiddaloy'],
'শ্রেণীকক্ষ': ['shreníkôkkho', 'shreniKakkho'],
'পাঠ্যপুস্তক': ['patthopustok', 'pathyoPustok'],
'পরীক্ষা': ['porikkha', 'porikkha'],
'ফলাফল': ['folfol', 'folfol'],
'উত্তীর্ণ': ['uttirrno', 'uttirno'],
'অনুত্তীর্ণ': ['onuttirrno', 'onuttirno'],
'শিক্ষাবর্ষ': ['shikkhaborsho', 'shikkhaborsho'],
'ডিগ্রি': ['digri', 'degree'],
'সার্টিফিকেট': ['shartiphiket', 'certificate'],
'খাবার': ['khabar', 'khaabaar'],
'পানীয়': ['paniyo', 'paaniiyo'],
'ভাত': ['bhat', 'bhaat'],
'রুটি': ['ruti', 'rutii'],
'তরকারি': ['torkari', 'torkari'],
'ডাল': ['dal', 'daal'],
'মিষ্টি': ['mishti', 'mishti'],
'চা': ['cha', 'chaa'],
'কফি': ['kofi', 'coffee'],
'রস': ['rosh', 'rosh'],
'অনুগ্রহ': ['onugroho', 'onugroho'],
'অনুমতি': ['onumoti', 'onumoti'],
'অনুশোচনা': ['onushóchona', 'onushóchonaa'],
'অনুষ্ঠান': ['onushthan', 'onushthaan'],
'অন্বেষণ': ['onbeshon', 'onbeshon'],
'অপরাধ': ['opradh', 'opraad'],
'অপমান': ['opman', 'opmaan'],
'অভিযোগ': ['obhijog', 'obhijog'],
'অভিমান': ['obhiman', 'obhimaan'],
'অভিনন্দন': ['obhinondon', 'obhinondon'],
'অভ্যর্থনা': ['obhyorthona', 'obhyorthonaa'],
'আকর্ষণ': ['akorshon', 'aakorshon'],
'আচার': ['achar', 'aachaar'],
'আদালত': ['adalot', 'aadalot'],
'আধুনিক': ['adhunik', 'aadhunik'],
'আন্দোলন': ['andolon', 'andolon'],
'আপত্তি': ['apotti', 'aapotti'],
'আবেদন': ['abedon', 'abedon'],
'আশঙ্কা': ['ashongka', 'aashongkaa'],
'আশ্রয়': ['ashroy', 'aashroy'],
'আয়': ['aay', 'aay'],
'ব্যয়': ['byoy', 'byoy'],
'আয়-ব্যয়': ['aay-byoy', 'aay-byoy'],
'জমা': ['joma', 'jomaa'],
'খরচ': ['khoroch', 'khoroch'],
'ঋণ': ['rin', 'riN'],
'মুনাফা': ['munafa', 'munafaa'],
'ক্ষতি': ['kkhoti', 'kkhoti'],
'বাজেট': ['bajet', 'bajet'],
'হিসাব': ['hishab', 'hishaab'],
'টাকা': ['taka', 'taka'],
'পয়সা': ['poysha', 'poysaa'],
'ব্যাংক': ['byangk', 'bank'],
'লেনদেন': ['lenden', 'lenden'],
'বিনিয়োগ': ['biniyog', 'biniyog'],
'অক্ষর': ['okkhor', 'okkhor'],
'বর্ণ': ['borno', 'borno'],
'বাক্য': ['bakko', 'bakkyo'],
'ভাষা': ['bhasha', 'bhaashaa'],
'ব্যাকরণ': ['byakoron', 'byaakoron'],
'লিখন': ['likhon', 'likhon'],
'পঠন': ['pothon', 'pothon'],
'গল্প': ['golpo', 'golpo'],
'উপন্যাস': ['uponnash', 'uponnyaash'],
'নাটক': ['natok', 'naatok'],
'প্রবন্ধ': ['probondho', 'probondho'],
'অনুভূতি': ['onubhuti', 'onubhuti'],
'মনের ভাব': ['moner bhab', 'moner bhaab'],
'ভালো লাগা': ['bhalo laga', 'bhalo laagaa'],
'মন্দ লাগা': ['mondo laga', 'mondo laagaa'],
'রাগ': ['rag', 'raag'],
'ঘৃণা': ['ghrina', 'ghrinaa'],
'অনুমোদন': ['onumodon', 'onumodon'],
'অনুরোধ': ['onurodh', 'onurodh'],
'অনুসন্ধান': ['onushondhan', 'onushondhaan'],
'অনুসরণ': ['onushoron', 'onushoron'],
'অনুষ্ঠিত': ['onushthito', 'onushthito'],
'অনুভব': ['onubhob', 'onubhob'],
'অনুমান': ['onuman', 'onumaan'],
'অনৈক্য': ['onoikko', 'onoikkyo'],
'অন্তর্ভুক্ত': ['ontorbhokto', 'ontorbhokto'],
'অন্তর্ধান': ['ontordhan', 'ontordhaan'],
'অন্তহীন': ['ontohin', 'ontohiin'],
'অপচয়': ['opochoy', 'opochoy'],
'অপরাধী': ['opradhi', 'opraadhii'],
'অপহরণ': ['opohoron', 'opohoron'],
'অবকাশ': ['obkash', 'obkaash'],
'অবক্ষয়': ['obokkhoy', 'obokkhoy'],
'অবগতি': ['obogoti', 'obogoti'],
'অবদান': ['obodan', 'obodan'],
'অবনতি': ['obonoti', 'obonoti'],
'অবরোধ': ['oborodh', 'oborodh'],
'অবলম্বন': ['obolombhon', 'obolombhon'],
'অবসাদ': ['oboshad', 'oboshad'],
'অবসর': ['obosor', 'obosor'],
'অবস্থান্তর': ['obosthantrô', 'obosthantrô'],
'অবাধ্য': ['abadhdho', 'abadhdho'],
'অবিশ্বাস': ['obisshash', 'obisshaash'],
'অবিশ্রান্ত': ['obishranto', 'obishraanto'],
'অবৈধ': ['oboedhdho', 'oboedhdho'],
'অভিযান': ['obhijan', 'obhijaan'],
'অভিলাষ': ['obhilash', 'obhilaash'],
'অভিশাপ': ['obhishap', 'obhishaap'],
'অচলাবস্থা': ['ochalabostha', 'ochalaabosthaa'],
'অচেতন': ['ochetôn', 'ochetôn'],
'অজ্ঞাত': ['oggato', 'oggyaato'],
'অজ্ঞান': ['oggan', 'oggyaan'],
'অট্টালিকা': ['ottálika', 'oTTaalikaa'],
'অদৃশ্য': ['odrissho', 'odrisshyo'],
'অধিকরণ': ['odhikoron', 'odhikoron'],
'অধিবেশন': ['odhibeshon', 'odhibeshon'],
'অধ্যাপক': ['odhdhapok', 'odhdhaapok'],
'অধ্যায়': ['odhdhay', 'odhdhaay'],
'অনন্য': ['ononno', 'ononnyo'],
'অনন্ত': ['ononto', 'ononto'],
'অনুকরণ': ['onukoron', 'onukoron'],
'অনুকূল': ['onukul', 'onukuul'],
'অভিবাদন': ['obhibadon', 'obhibadon'],
'অভিযুক্ত': ['obhijukto', 'obhijukto'],
'অভ্যন্তরীণ': ['obhyontorino', 'obhyontoriNo'],
'অভ্র': ['obhro', 'obhro'],
'আকাঙ্ক্ষিত': ['akankkhito', 'aakankkhito'],
'আক্রান্ত': ['akranto', 'aakraanto'],
'আক্রমণ': ['akromon', 'aakromon'],
'আগ্রহ': ['agroho', 'aagroho'],
'আঘাত': ['aghat', 'aaghaat'],
'আচার-ব্যবহার': ['achar-byobohar', 'aachaar-byobohar'],
'আদর্শবাদ': ['adorshobad', 'aadorshobaad'],
'আদেশ': ['adesh', 'aadesh'],
'আনুগত্য': ['anugotto', 'aanugotto'],
'আপত্তিকর': ['apottikor', 'aapottikor'],
'আপোষ': ['aposh', 'aaposh'],
'আবরণ': ['abôron', 'aabôron'],
'আবাসন': ['abashon', 'aabashon'],
'আবেদনকারী': ['abedonkarí', 'abedonkaarii'],
'আভিযোগ': ['abhijog', 'abhijog'],
'আমন্ত্রণ': ['amôntron', 'aamôntron'],
'আয়ত্ত': ['aayôtto', 'aayotto'],
'আরক্ষী': ['arôkkhi', 'aarôkkhi'],
'আশ্বাস': ['ashshash', 'aashshash'],
'ইচ্ছাকৃত': ['icchakrito', 'icchakrito'],
'ইঙ্গিত': ['ingit', 'ingit'],
'উৎকণ্ঠা': ['utkontha', 'utkonThaa'],
'উৎপাদন': ['utpadon', 'utpadon'],
'উৎস': ['utshô', 'utso'],
}

// Updated dictionaries for Banglish to Bengali conversion
const banglishToBanglaMap: { [key: string]: string } = {
  'o': 'অ', 'a': 'আ', 'i': 'ই', 'u': 'উ', 'e': 'এ', 'oi': 'ঐ', 'ou': 'ঔ',
  'k': 'ক', 'kh': 'খ', 'g': 'গ', 'gh': 'ঘ', 'ng': 'ঙ', 'ch': 'চ', 'chh': 'ছ',
  'j': 'জ', 'jh': 'ঝ', 'n': 'ন', 't': 'ত', 'th': 'থ', 'd': 'দ', 'dh': 'ধ',
  'p': 'প', 'f': 'ফ', 'b': 'ব', 'bh': 'ভ', 'm': 'ম', 'z': 'য', 'r': 'র',
  'l': 'ল', 'sh': 'শ', 's': 'স', 'h': 'হ', 'rr': 'ড়', 'rh': 'ঢ়', 'y': 'য়',
  'tt': 'ৎ', 'ng': 'ং', ':': 'ঃ', 'nng': 'ঁ', '0': '০', '1': '১', '2': '২',
  '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const banglishVowels: { [key: string]: string } = {
  'a': 'া', 'i': 'ি', 'ii': 'ী', 'u': 'ু', 'uu': 'ূ', 'e': 'ে', 'oi': 'ৈ',
  'o': 'ো', 'ou': 'ৌ', 'ri': 'ৃ'
};

const banglishConjuncts: { [key: string]: string } = {
  'kk': 'ক্ক', 'kT': 'ক্ট', 'kt': 'ক্ত', 'kw': 'ক্ব', 'km': 'ক্ম', 'ky': 'ক্য',
  'kr': 'ক্র', 'kl': 'ক্ল', 'kkh': 'ক্ষ', 'kkhn': 'ক্ষ্ণ', 'kkhm': 'ক্ষ্ম', 'khy': 'খ্য',
  'gn': 'গ্ণ', 'gdh': 'গ্ধ', 'gn': 'গ্ন', 'gm': 'গ্ম', 'gy': 'গ্য', 'gr': 'গ্র',
  'gl': 'গ্ল', 'ghn': 'ঘ্ন', 'ghy': 'ঘ্য', 'nk': 'ঙ্ক', 'ng': 'ঙ্গ', 'cch': 'চ্চ',
  'cch': 'চ্ছ', 'cn': 'চ্ঞ', 'cy': 'চ্য', 'jj': 'জ্জ', 'jjh': 'জ্ঝ', 'gg': 'জ্ঞ',
  'jy': 'জ্য', 'nch': 'ঞ্চ', 'nch': 'ঞ্ছ', 'nj': 'ঞ্জ', 'TT': 'ট্ট', 'DD': 'ড্ড',
  'nT': 'ণ্ট', 'nTh': 'ণ্ঠ', 'nD': 'ণ্ড', 'tt': 'ত্ত', 'tth': 'ত্থ', 'tn': 'ত্ন',
  'tm': 'ত্ম', 'ty': 'ত্য', 'tr': 'ত্র', 'thy': 'থ্য', 'dd': 'দ্দ', 'ddh': 'দ্ধ',
  'dw': 'দ্ব', 'dm': 'দ্ম', 'dy': 'দ্য', 'dhn': 'ধ্ন', 'dhm': 'ধ্ম', 'dhy': 'ধ্য',
  'nt': 'ন্ত', 'nth': 'ন্থ', 'nd': 'ন্দ', 'ndh': 'ন্ধ', 'nn': 'ন্ন', 'nm': 'ন্ম',
  'ny': 'ন্য', 'pT': 'প্ট', 'pt': 'প্ত', 'pn': 'প্ন', 'pp': 'প্প', 'py': 'প্য',
  'pr': 'প্র', 'pl': 'প্ল', 'fy': 'ফ্য', 'bj': 'ব্জ', 'bd': 'ব্দ', 'bdh': 'ব্ধ',
  'bb': 'ব্ব', 'by': 'ব্য', 'br': 'ব্র', 'bl': 'ব্ল', 'bhy': 'ভ্য', 'bhr': 'ভ্র',
  'mn': 'ম্ন', 'mp': 'ম্প', 'mf': 'ম্ফ', 'mb': 'ম্ব', 'mbh': 'ম্ভ', 'mm': 'ম্ম',
  'my': 'ম্য', 'yy': 'য্য', 'rk': 'র্ক', 'rg': 'র্গ', 'rgh': 'র্ঘ', 'rch': 'র্চ',
  'rj': 'র্জ', 'rn': 'র্ণ', 'rt': 'র্ত', 'rth': 'র্থ', 'rd': 'র্দ', 'rdh': 'র্ধ',
  'rn': 'র্ন', 'rp': 'র্প', 'rf': 'র্ফ', 'rb': 'র্ব', 'rbh': 'র্ভ', 'rm': 'র্ম',
  'ry': 'র্য', 'rl': 'র্ল', 'rsh': 'র্শ', 'rsh': 'র্ষ', 'rs': 'র্স', 'rh': 'র্হ',
  'lk': 'ল্ক', 'lg': 'ল্গ', 'lT': 'ল্ট', 'lD': 'ল্ড', 'lp': 'ল্প', 'lf': 'ল্ফ',
  'lb': 'ল্ব', 'lm': 'ল্ম', 'ly': 'ল্য', 'shch': 'শ্চ', 'shn': 'শ্ন', 'shw': 'শ্ব',
  'shm': 'শ্ম', 'shy': 'শ্য', 'shr': 'শ্র', 'shl': 'শ্ল', 'shk': 'ষ্ক', 'shT': 'ষ্ট',
  'shTh': 'ষ্ঠ', 'shn': 'ষ্ণ', 'shp': 'ষ্প', 'shf': 'ষ্ফ', 'shm': 'ষ্ম', 'shy': 'ষ্য',
  'sk': 'স্ক', 'skh': 'স্খ', 'sT': 'স্ট', 'st': 'স্ত', 'sth': 'স্থ', 'sn': 'স্ন',
  'sp': 'স্প', 'sf': 'স্ফ', 'sw': 'স্ব', 'sm': 'স্ম', 'sy': 'স্য', 'sr': 'স্র',
  'sl': 'স্ল', 'hn': 'হ্ণ', 'hn': 'হ্ন', 'hw': 'হ্ব', 'hm': 'হ্ম', 'hy': 'হ্য',
  'hr': 'হ্র', 'hl': 'হ্ল'
};

// New dictionary for common Banglish spelling mistakes
const banglishSpellingMistakes: { [key: string]: string } = {
  'aamake': 'amake',
  'ashche': 'asche',
  'ashbe': 'asbe',
  'kharap': 'kharab',
  'khub': 'khoop',
  'onek': 'onaek',
  'shundor': 'sundor',
  'shobai': 'sobai',
  'kokhono': 'kakhano',
  'ekhon': 'akhon'
};

// New dictionary for alternative Banglish words
const banglishAlternatives: { [key: string]: string[] } = {
  'bhalobasha': ['bhalobasa', 'valobasha'],
  'khabar': ['khawar', 'khaddo'],
  'shundor': ['sundor', 'shundar'],
  'boi': ['boi', 'pustak'],
  'mach': ['maach', 'matsho'],
  'bari': ['bari', 'ghor'],
  'pani': ['pani', 'jol'],
  'kharap': ['mondo', 'kharab'],
  'bhalo': ['bhalo', 'uttam'],
  'cholo': ['cholo', 'aso']
};

export default function Component() {
  const [banglaText, setBanglaText] = useState('')
  const [banglishText, setBanglishText] = useState('')
  const [alternativeBanglishTexts, setAlternativeBanglishTexts] = useState<string[]>([])
  const [explanation, setExplanation] = useState('')
  const [activeTab, setActiveTab] = useState('convert')
  const [copied, setCopied] = useState(false)
  const [useAlternateForm, setUseAlternateForm] = useState(false)
  const [suggestions, setSuggestions] = useState<{ [key: string]: string[] }>({})
  const [bangladeshTime, setBangladeshTime] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])
  const [isListening, setIsListening] = useState(false)
  const [weatherData, setWeatherData] = useState<{ temperature: number; condition: string } | null>(null)
  const [conversionMode, setConversionMode] = useState<'banglaToBanglish' | 'banglishToBangla'>('banglaToBanglish')
  const [spellingMistakes, setSpellingMistakes] = useState<{ [key: string]: string }>({})
  const [alternativeWords, setAlternativeWords] = useState<{ [key: string]: string[] }>({})

  const convertToBanglish = useCallback((text: string, useAlternate: boolean = false): { result: string, alternatives: string[], newSuggestions: { [key: string]: string[] } } => {
    let result = ''
    let alternatives: string[] = []
    const words = text.split(/\s+/)
    const newSuggestions: { [key: string]: string[] } = {}
    
    for (let word of words) {
      if (/^[a-zA-Z]+$/.test(word)) {
        result += word + ' '
        continue
      }

      if (specialWords[word as keyof typeof specialWords]) {
        const converted = specialWords[word as keyof typeof specialWords][useAlternate ? 1 : 0]
        result += converted + ' '
        if (commonErrors[converted as keyof typeof commonErrors]) {
          newSuggestions[converted] = commonErrors[converted as keyof typeof commonErrors]
        }
        continue
      }

      let convertedWord = ''
      let alternativeWord = ''
      let i = 0
      while (i < word.length) {
        if (word[i] === 'য়') {
          if (i === 0) {
            convertedWord += 'y'
            alternativeWord += 'y'
          } else {
            convertedWord += ''
            alternativeWord += ''
          }
          i++
          continue
        }

        let matched = false
        
        for (let j = 4; j > 1; j--) {
          const substr = word.substr(i, j)
          if (conjuncts[substr as keyof typeof conjuncts]) {
            const options = conjuncts[substr as keyof typeof conjuncts]
            const converted = Array.isArray(options) ? options[useAlternate ? 1 : 0] : options
            convertedWord += converted
            alternativeWord += Array.isArray(options) ? options[useAlternate ? 0 : 1] : options
            i += j
            matched = true
            break
          }
        }
        
        if (!matched) {
          if (banglaTobanglishMap[word[i] as keyof typeof banglaTobanglishMap]) {
            const options = banglaTobanglishMap[word[i] as keyof typeof banglaTobanglishMap]
            if (Array.isArray(options)) {
              convertedWord += options[useAlternate ? 1 : 0]
              alternativeWord += options[useAlternate ? 0 : 1]
            } else {
              convertedWord += options
              alternativeWord += options
            }
          } else {
            convertedWord += word[i]
            alternativeWord += word[i]
          }
          i++
        }
      }
      
      result += convertedWord + ' '
      if (alternativeWord !== convertedWord) {
        alternatives.push(alternativeWord)
      }

      if (banglaToBanglishAlternatives[word as keyof typeof banglaToBanglishAlternatives]) {
        newSuggestions[convertedWord.trim()] = banglaToBanglishAlternatives[word as keyof typeof banglaToBanglishAlternatives]
      }
    }
    
    return { result: result.trim(), alternatives, newSuggestions }
  }, [])

  const convertToBangla = useCallback((text: string): string => {
    let result = ''
    const words = text.split(/\s+/)
    const newSpellingMistakes: { [key: string]: string } = {}
    const newAlternativeWords: { [key: string]: string[] } = {}
    
    for (let word of words) {
      let convertedWord = ''
      let i = 0

      // Check for spelling mistakes
      if (banglishSpellingMistakes[word.toLowerCase()]) {
        newSpellingMistakes[word] = banglishSpellingMistakes[word.toLowerCase()]
      }

      // Check for alternative words
      if (banglishAlternatives[word.toLowerCase()]) {
        newAlternativeWords[word] = banglishAlternatives[word.toLowerCase()]
      }

      while (i < word.length) {
        let matched = false
        
        // Check for conjuncts
        for (let j = 4; j > 1; j--) {
          const substr = word.substr(i, j).toLowerCase()
          if (banglishConjuncts[substr]) {
            convertedWord += banglishConjuncts[substr]
            i += j
            matched = true
            break
          }
        }
        
        if (!matched) {
          // Check for vowels
          for (let j = 2; j > 0; j--) {
            const substr = word.substr(i, j).toLowerCase()
            if (banglishVowels[substr]) {
              if (convertedWord.length > 0) {
                convertedWord += banglishVowels[substr]
              } else {
                convertedWord += banglishToBanglaMap[substr] || substr
              }
              i += j
              matched = true
              break
            }
          }
        }
        
        if (!matched) {
          // Check for single characters
          const char = word[i].toLowerCase()
          if (banglishToBanglaMap[char]) {
            convertedWord += banglishToBanglaMap[char]
          } else {
            convertedWord += char
          }
          i++
        }
      }
      
      result += convertedWord + ' '
    }
    
    setSpellingMistakes(newSpellingMistakes)
    setAlternativeWords(newAlternativeWords)
    return result.trim()
  }, [])

  useEffect(() => {
    if (conversionMode === 'banglaToBanglish') {
      const { result, alternatives, newSuggestions } = convertToBanglish(banglaText, useAlternateForm)
      setBanglishText(result)
      setAlternativeBanglishTexts(alternatives)
      setSuggestions(newSuggestions)

      const generateExplanation = () => {
        if (banglaText.length === 0) {
          return 'Please enter Bengali text.'
        }
        const wordCount = banglaText.split(/\s+/).length
        const conjunctCount = banglaText.split(/\s+/).filter(word => {
          for (let conjunct in conjuncts) {
            if (word.includes(conjunct)) return true
          }
          return false
        }).length
        const specialWordCount = banglaText.split(/\s+/).filter(word => specialWords[word as keyof typeof specialWords]).length
        const suggestionCount = Object.keys(newSuggestions).length
        const alternativeCount = alternatives.length
        return `You have typed ${wordCount} words, including ${conjunctCount} conjuncts and ${specialWordCount} special words. We have converted them into Banglish, taking into account conjuncts, special words, and collocations. ${useAlternateForm ? 'Alternative' : 'Initial'} transformation used. ${suggestionCount} suggestions and ${alternativeCount} alternative conversions available.`
      }

      setExplanation(generateExplanation())
    } else {
      const result = convertToBangla(banglishText)
      setBanglaText(result)
      const mistakeCount = Object.keys(spellingMistakes).length
      const alternativeCount = Object.keys(alternativeWords).length
      setExplanation(`Converted Banglish text to Bengali. Found ${mistakeCount} potential spelling mistakes and ${alternativeCount} words with alternative forms.`)
    }
  }, [banglaText, banglishText, useAlternateForm, convertToBanglish, convertToBangla, conversionMode])

  useEffect(() => {
    const updateBangladeshTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      const time = new Date().toLocaleTimeString('en-US', options)
      setBangladeshTime(time)
    }

    updateBangladeshTime()
    const timer = setInterval(updateBangladeshTime, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(conversionMode === 'banglaToBanglish' ? banglishText : banglaText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [banglishText, banglaText, conversionMode])

  const handleSuggestionClick = useCallback((word: string, suggestion: string) => {
    if (conversionMode === 'banglaToBanglish') {
      setBanglishText(prev => prev.replace(new RegExp(`\\b${word}\\b`, 'g'), suggestion))
      setSuggestions(prev => {
        const newSuggestions = { ...prev }
        delete newSuggestions[word]
        return newSuggestions
      })
    } else {
      setBanglishText(prev => prev.replace(new RegExp(`\\b${word}\\b`, 'g'), suggestion))
      setSpellingMistakes(prev => {
        const newMistakes = { ...prev }
        delete newMistakes[word]
        return newMistakes
      })
    }
  }, [conversionMode])

  const handleAlternativeClick = useCallback(() => {
    if (conversionMode === 'banglaToBanglish') {
      const { result, alternatives, newSuggestions } = convertToBanglish(banglaText, !useAlternateForm)
      setBanglishText(result)
      setAlternativeBanglishTexts(alternatives)
      setSuggestions(newSuggestions)
      setUseAlternateForm(!useAlternateForm)
    } else {
      // For Banglish to Bangla, we don't have an alternate form, so we just re-convert
      const result = convertToBangla(banglishText)
      setBanglaText(result)
    }
  }, [banglaText, banglishText, useAlternateForm, convertToBanglish, convertToBangla, conversionMode])

  const handleSearch = useCallback(() => {
    // Simulated search results
    setSearchResults([
      `Result 1 for "${searchQuery}"`,
      `Result 2 for "${searchQuery}"`,
      `Result 3 for "${searchQuery}"`,
    ])
  }, [searchQuery])

  const handleVoiceAssistant = useCallback(() => {
    setIsListening(prev => !prev)
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = conversionMode === 'banglaToBanglish' ? 'bn-BD' : 'en-US'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        if (conversionMode === 'banglaToBanglish') {
          setBanglaText(transcript)
        } else {
          setBanglishText(transcript)
        }
        setIsListening(false)
      }
      recognition.start()
    } else {
      alert('Speech recognition is not supported in this browser.')
    }
  }, [conversionMode])

  useEffect(() => {
    // Simulated weather data fetch
    const fetchWeather = () => {
      setWeatherData({
        temperature: 32,
        condition: 'Sunny',
      })
    }
    fetchWeather()
  }, [])

  const handleConversionModeChange = useCallback(() => {
    setConversionMode(prev => prev === 'banglaToBanglish' ? 'banglishToBangla' : 'banglaToBanglish')
    setBanglaText('')
    setBanglishText('')
    setExplanation('')
    setSpellingMistakes({})
    setAlternativeWords({})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Intelligent Bangla-Banglish Converter
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Convert between Bangla and Banglish with ease
          </CardDescription>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Bangladesh Time: {bangladeshTime}
            </div>
            {weatherData && (
              <div className="flex items-center text-sm text-gray-600">
                <CloudSun className="w-4 h-4 mr-1" />
                {weatherData.temperature}°C, {weatherData.condition}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="convert">Conversion</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>
            <TabsContent value="convert">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="conversion-mode" className="text-sm font-medium text-gray-700">
                    Conversion Mode:
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Bangla to Banglish</span>
                    <Switch
                      id="conversion-mode"
                      checked={conversionMode === 'banglishToBangla'}
                      onCheckedChange={handleConversionModeChange}
                    />
                    <span className="text-sm text-gray-600">Banglish to Bangla</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
                    {conversionMode === 'banglaToBanglish' ? 'Bangla' : 'Banglish'}
                  </label>
                  <div className="flex items-center space-x-2">
                    <Textarea
                      id="inputText"
                      className="w-full p-2 border-2 border-purple-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
                      rows={4}
                      value={conversionMode === 'banglaToBanglish' ? banglaText : banglishText}
                      onChange={(e) => conversionMode === 'banglaToBanglish' ? setBanglaText(e.target.value) : setBanglishText(e.target.value)}
                      placeholder={`Enter ${conversionMode === 'banglaToBanglish' ? 'Bengali' : 'Banglish'} text here`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleVoiceAssistant}
                      className={`p-2 ${isListening ? 'bg-red-500 text-white' : ''}`}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <motion.div 
                  className="flex items-center justify-center my-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ArrowRight className="w-6 h-6 text-purple-500" />
                </motion.div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="outputText" className="block text-sm font-medium text-gray-700">
                      {conversionMode === 'banglaToBanglish' ? 'Banglish' : 'Bangla'}
                    </label>
                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0" onClick={handleAlternativeClick}>
                              <RefreshCw className="w-4 h-4 text-purple-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Show alternative conversion</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="p-0" onClick={handleCopy}>
                              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-purple-500" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copied ? 'Copied!' : 'Copy'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div
                    id="outputText"
                    className="w-full p-2 bg-purple-50 border-2 border-purple-200 rounded-md min-h-[100px] transition duration-300 ease-in-out"
                  >
                    <AnimatePresence>
                      {(conversionMode === 'banglaToBanglish' ? banglishText : banglaText).split(' ').map((word, index) => (
                        <motion.span
                          key={index}
                          className="inline-block mr-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                          {conversionMode === 'banglaToBanglish' && (suggestions[word] || alternativeBanglishTexts.includes(word)) ? (
                            <Popover>
                              <PopoverTrigger asChild>
                                <span className="cursor-pointer underline decoration-dotted">
                                  {word}
                                </span>
                              </PopoverTrigger>
                              <PopoverContent className="w-48">
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">Suggestions:</p>
                                  {suggestions[word] && suggestions[word].map((suggestion, i) => (
                                    <Button
                                      key={i}
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => handleSuggestionClick(word, suggestion)}
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                  {alternativeBanglishTexts.includes(word) && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => handleSuggestionClick(word, alternativeBanglishTexts[alternativeBanglishTexts.indexOf(word)])}
                                    >
                                      {alternativeBanglishTexts[alternativeBanglishTexts.indexOf(word)]}
                                    </Button>
                                  )}
                                </div>
                              </PopoverContent>
                            </Popover>
                          ) : conversionMode === 'banglishToBangla' && (spellingMistakes[word] || alternativeWords[word]) ? (
                            <Popover>
                              <PopoverTrigger asChild>
                                <span className="cursor-pointer underline decoration-dotted">
                                  {word}
                                </span>
                              </PopoverTrigger>
                              <PopoverContent className="w-48">
                                <div className="space-y-2">
                                  {spellingMistakes[word] && (
                                    <>
                                      <p className="text-sm font-medium">Spelling suggestion:</p>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="w-full justify-start"
                                        onClick={() => handleSuggestionClick(word, spellingMistakes[word])}
                                      >
                                        {spellingMistakes[word]}
                                      </Button>
                                    </>
                                  )}
                                  {alternativeWords[word] && (
                                    <>
                                      <p className="text-sm font-medium">Alternative words:</p>
                                      {alternativeWords[word].map((alternative, i) => (
                                        <Button
                                          key={i}
                                          variant="ghost"
                                          size="sm"
                                          className="w-full justify-start"
                                          onClick={() => handleSuggestionClick(word, alternative)}
                                        >
                                          {alternative}
                                        </Button>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </PopoverContent>
                            </Popover>
                          ) : (
                            word
                          )}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                
                <motion.div
                  className="mt-4 p-3 bg-purple-100 rounded-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-lg font-semibold text-purple-700 mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Explanation
                  </h2>
                  <p className="text-sm text-gray-600">{explanation}</p>
                </motion.div>

                {conversionMode === 'banglaToBanglish' && (
                  <div className="flex items-center space-x-2 mt-4">
                    <Switch
                      id="alternate-form"
                      checked={useAlternateForm}
                      onCheckedChange={setUseAlternateForm}
                    />
                    <Label htmlFor="alternate-form" className="text-sm text-gray-600">
                      Use variant transformations
                    </Label>
                  </div>
                )}

                {conversionMode === 'banglishToBangla' && (Object.keys(spellingMistakes).length > 0 || Object.keys(alternativeWords).length > 0) && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Suggestions:</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(spellingMistakes).map(([word, suggestion]) => (
                        <Badge key={word} variant="secondary" className="cursor-pointer" onClick={() => handleSuggestionClick(word, suggestion)}>
                          {word} → {suggestion}
                        </Badge>
                      ))}
                      {Object.entries(alternativeWords).map(([word, alternatives]) => (
                        <Popover key={word}>
                          <PopoverTrigger asChild>
                            <Badge variant="outline" className="cursor-pointer">
                              {word} (alternatives)
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-48">
                            <div className="space-y-2">
                              {alternatives.map((alternative, i) => (
                                <Button
                                  key={i}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start"
                                  onClick={() => handleSuggestionClick(word, alternative)}
                                >
                                  {alternative}
                                </Button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="search">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={handleSearch}>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                {searchResults.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                    <ul className="list-disc list-inside">
                      {searchResults.map((result, index) => (
                        <li key={index} className="text-sm text-gray-600">{result}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="about">
              <div className="space-y-4 text-gray-600">
                <p className="text-sm">
                  This intelligent converter transforms text between Bengali and Banglish. It provides proper conversion of letters, special words, and follows rules of Bengali grammar while offering suggestions for improvement.
                </p>
                <p className="text-sm font-semibold">
                  Special Features:
                </p>
                <ul className="list-disc list-inside text-sm">
                  <li>Support for all Bengali letters and alphabets</li>
                  <li>Correct conversion of more than 285 alphabets</li>
                  <li>Specific conversions for particular words</li>
                  <li>Variant conversions for each letter and hyphen</li>
                  <li>Intelligent suggestions for alternative spellings</li>
                  <li>Handling of English words within Bengali text</li>
                  <li>Automatic interpretation generation</li>
                  <li>Easy to use and attractive interface</li>
                  <li>Copy facility with one-click action</li>
                  <li>Alternative conversions for words with multiple representations</li>
                  <li>Voice input for both Bengali and Banglish text</li>
                  <li>Google search functionality</li>
                  <li>Weather information display</li>
                  <li>Bangladesh time display</li>
                  <li>Bidirectional conversion between Bangla and Banglish</li>
                  <li>Spelling mistake detection and suggestions for Banglish to Bangla conversion</li>
                  <li>Alternative word suggestions for Banglish to Bangla conversion</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">Developed by Prottoy</p>
        </CardFooter>
      </Card>
    </div>
  )
}
