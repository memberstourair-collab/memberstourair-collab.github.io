/* 킹한자 — 한국어문회 배정한자 8급·7급·6급 (300자) + 낱말·사자성어
 * 급수와 대표 훈음은 한국어문회 배정한자 기준입니다. (8급 50자 · 7급Ⅱ 50자 · 7급 50자 · 6급Ⅱ 75자 · 6급 75자)
 * 한자 · 훈과 음 · 부수 · 총획 · 예시 낱말 · 급수 단계
 */
(function (global) {
  "use strict";

  var LEVELS = [
    {"id":"g8","label":"8급","stage":"8급","emoji":"🌱","count":50,"note":"한국어문회 8급 배정한자 50자 · 한자 공부의 첫걸음","exam":"8급 읽기 50자","units":10},
    {"id":"g7","label":"7급","stage":"7급Ⅱ ~ 7급","emoji":"🌿","count":100,"note":"7급Ⅱ 신출 50자 + 7급 신출 50자 · 8급까지 합쳐 150자","exam":"7급 읽기 150자","units":20},
    {"id":"g6","label":"6급","stage":"6급Ⅱ ~ 6급","emoji":"🌳","count":150,"note":"6급Ⅱ 신출 75자 + 6급 신출 75자 · 8·7급까지 합쳐 300자","exam":"6급 읽기 300자","units":30},
    {"id":"words","label":"낱말","stage":"보너스","emoji":"📜","count":15,"note":"두 글자 낱말과 사자성어 15개","exam":"보너스","units":3}
  ];

  var UNITS = [
    {
      id: "g8-u1", no: 1, levelId: "g8", levelNo: 1, stage: "8급",
      label: "8급", emoji: "🌱", title: "학교 교 외 4자", goal: "校 敎 九 國 軍",
      items: [
        {"id":"g8-1-1","text":"校","read":"학교 교","hun":"학교","eum":"교","ko":"학교","radical":"木","strokes":10,"stage":"8급","ex":["학교","교실","교장"],"tip":"나무(木)로 지은 학교 건물에서 왔어요. 부수 木 · 같은 부수 글자: 東 林 植"},
        {"id":"g8-1-2","text":"敎","read":"가르칠 교","hun":"가르칠","eum":"교","ko":"가르칠","radical":"攴","strokes":11,"stage":"8급","ex":[],"tip":"부수 攴 · 같은 부수 글자: 數 放"},
        {"id":"g8-1-3","text":"九","read":"아홉 구","hun":"아홉","eum":"구","ko":"아홉","radical":"乙","strokes":2,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-1-4","text":"國","read":"나라 국","hun":"나라","eum":"국","ko":"나라","radical":"囗","strokes":11,"stage":"8급","ex":[],"tip":"부수 囗 · 같은 부수 글자: 四 圖 園"},
        {"id":"g8-1-5","text":"軍","read":"군사 군","hun":"군사","eum":"군","ko":"군사","radical":"車","strokes":9,"stage":"8급","ex":[],"tip":""}
      ]
    },
    {
      id: "g8-u2", no: 2, levelId: "g8", levelNo: 2, stage: "8급",
      label: "8급", emoji: "🌱", title: "쇠 금 외 4자", goal: "金 南 女 年 大",
      items: [
        {"id":"g8-2-1","text":"金","read":"쇠 금","hun":"쇠","eum":"금","ko":"쇠","radical":"金","strokes":8,"stage":"8급","ex":[],"tip":"음이 여럿이에요: 금(쇠), 김(성) 부수 金 · 같은 부수 글자: 銀"},
        {"id":"g8-2-2","text":"南","read":"남녘 남","hun":"남녘","eum":"남","ko":"남녘","radical":"十","strokes":9,"stage":"8급","ex":[],"tip":"부수 十 · 같은 부수 글자: 午 千 半"},
        {"id":"g8-2-3","text":"女","read":"계집 녀","hun":"계집","eum":"녀","ko":"계집","radical":"女","strokes":3,"stage":"8급","ex":["여자","여성","소녀"],"tip":"여자가 앉아 있는 모양에서 왔어요. 부수 女 · 같은 부수 글자: 姓 始"},
        {"id":"g8-2-4","text":"年","read":"해 년","hun":"해","eum":"년","ko":"해","radical":"干","strokes":6,"stage":"8급","ex":["작년","내년","매년"],"tip":"곡식이 익는 한 해를 나타내요. 부수 干 · 같은 부수 글자: 平 幸"},
        {"id":"g8-2-5","text":"大","read":"큰 대","hun":"큰","eum":"대","ko":"큰","radical":"大","strokes":3,"stage":"8급","ex":["대문","대학","대형"],"tip":"팔을 벌린 사람 모양. '크다'를 뜻해요. 부수 大 · 같은 부수 글자: 夫 天 失"}
      ]
    },
    {
      id: "g8-u3", no: 3, levelId: "g8", levelNo: 3, stage: "8급",
      label: "8급", emoji: "🌱", title: "동녘 동 외 4자", goal: "東 六 萬 母 木",
      items: [
        {"id":"g8-3-1","text":"東","read":"동녘 동","hun":"동녘","eum":"동","ko":"동녘","radical":"木","strokes":8,"stage":"8급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 林 植"},
        {"id":"g8-3-2","text":"六","read":"여섯 륙","hun":"여섯","eum":"륙","ko":"여섯","radical":"八","strokes":4,"stage":"8급","ex":[],"tip":"부수 八 · 같은 부수 글자: 公 共"},
        {"id":"g8-3-3","text":"萬","read":"일만 만","hun":"일만","eum":"만","ko":"일만","radical":"艸","strokes":13,"stage":"8급","ex":[],"tip":"부수 艸 · 같은 부수 글자: 草 花 藥"},
        {"id":"g8-3-4","text":"母","read":"어미 모","hun":"어미","eum":"모","ko":"어미","radical":"毋","strokes":5,"stage":"8급","ex":["모친","부모","모성"],"tip":"아이를 품은 어머니 모양이에요. 부수 毋 · 같은 부수 글자: 每"},
        {"id":"g8-3-5","text":"木","read":"나무 목","hun":"나무","eum":"목","ko":"나무","radical":"木","strokes":4,"stage":"8급","ex":["목재","수목","목공"],"tip":"가지와 뿌리가 있는 나무 모양이에요. 부수 木 · 같은 부수 글자: 校 東 林"}
      ]
    },
    {
      id: "g8-u4", no: 4, levelId: "g8", levelNo: 4, stage: "8급",
      label: "8급", emoji: "🌱", title: "문 문 외 4자", goal: "門 民 白 父 北",
      items: [
        {"id":"g8-4-1","text":"門","read":"문 문","hun":"문","eum":"문","ko":"문","radical":"門","strokes":8,"stage":"8급","ex":[],"tip":"부수 門 · 같은 부수 글자: 間 開"},
        {"id":"g8-4-2","text":"民","read":"백성 민","hun":"백성","eum":"민","ko":"백성","radical":"氏","strokes":5,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-4-3","text":"白","read":"흰 백","hun":"흰","eum":"백","ko":"흰","radical":"白","strokes":5,"stage":"8급","ex":[],"tip":"부수 白 · 같은 부수 글자: 百"},
        {"id":"g8-4-4","text":"父","read":"아비 부","hun":"아비","eum":"부","ko":"아비","radical":"父","strokes":4,"stage":"8급","ex":["부모","부친","조부"],"tip":"아버지가 지팡이를 짚은 모양에서 왔어요."},
        {"id":"g8-4-5","text":"北","read":"북녘 북","hun":"북녘","eum":"북","ko":"북녘","radical":"匕","strokes":5,"stage":"8급","ex":[],"tip":"음이 여럿이에요: 북(북녘), 배(달아날)"}
      ]
    },
    {
      id: "g8-u5", no: 5, levelId: "g8", levelNo: 5, stage: "8급",
      label: "8급", emoji: "🌱", title: "넉 사 외 4자", goal: "四 山 三 生 西",
      items: [
        {"id":"g8-5-1","text":"四","read":"넉 사","hun":"넉","eum":"사","ko":"넉","radical":"囗","strokes":5,"stage":"8급","ex":[],"tip":"부수 囗 · 같은 부수 글자: 國 圖 園"},
        {"id":"g8-5-2","text":"山","read":"메 산","hun":"메","eum":"산","ko":"메","radical":"山","strokes":3,"stage":"8급","ex":["등산","산속","산맥"],"tip":"산봉우리 세 개가 솟은 모양에서 왔어요."},
        {"id":"g8-5-3","text":"三","read":"석 삼","hun":"석","eum":"삼","ko":"석","radical":"一","strokes":3,"stage":"8급","ex":["삼각형","삼일절","삼겹살"],"tip":"가로획 세 개. 一二三 순서로 익혀요. 부수 一 · 같은 부수 글자: 七 不 上"},
        {"id":"g8-5-4","text":"生","read":"날 생","hun":"날","eum":"생","ko":"날","radical":"生","strokes":5,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-5-5","text":"西","read":"서녘 서","hun":"서녘","eum":"서","ko":"서녘","radical":"襾","strokes":6,"stage":"8급","ex":[],"tip":""}
      ]
    },
    {
      id: "g8-u6", no: 6, levelId: "g8", levelNo: 6, stage: "8급",
      label: "8급", emoji: "🌱", title: "먼저 선 외 4자", goal: "先 小 水 室 十",
      items: [
        {"id":"g8-6-1","text":"先","read":"먼저 선","hun":"먼저","eum":"선","ko":"먼저","radical":"儿","strokes":6,"stage":"8급","ex":[],"tip":"부수 儿 · 같은 부수 글자: 兄 光"},
        {"id":"g8-6-2","text":"小","read":"작을 소","hun":"작을","eum":"소","ko":"작을","radical":"小","strokes":3,"stage":"8급","ex":["소년","소형","축소"],"tip":"작은 점 세 개 모양. '작다'를 뜻해요. 부수 小 · 같은 부수 글자: 少"},
        {"id":"g8-6-3","text":"水","read":"물 수","hun":"물","eum":"수","ko":"물","radical":"水","strokes":4,"stage":"8급","ex":["수영","홍수","수도"],"tip":"물이 흐르는 모양. 왼쪽에 오면 氵로 줄어요. 부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g8-6-4","text":"室","read":"집 실","hun":"집","eum":"실","ko":"집","radical":"宀","strokes":9,"stage":"8급","ex":[],"tip":"부수 宀 · 같은 부수 글자: 家 安 定"},
        {"id":"g8-6-5","text":"十","read":"열 십","hun":"열","eum":"십","ko":"열","radical":"十","strokes":2,"stage":"8급","ex":["십분","십이월","수십"],"tip":"가로와 세로가 만나는 모양. 10을 뜻해요. 부수 十 · 같은 부수 글자: 南 午 千"}
      ]
    },
    {
      id: "g8-u7", no: 7, levelId: "g8", levelNo: 7, stage: "8급",
      label: "8급", emoji: "🌱", title: "다섯 오 외 4자", goal: "五 王 外 月 二",
      items: [
        {"id":"g8-7-1","text":"五","read":"다섯 오","hun":"다섯","eum":"오","ko":"다섯","radical":"二","strokes":4,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-7-2","text":"王","read":"임금 왕","hun":"임금","eum":"왕","ko":"임금","radical":"玉","strokes":4,"stage":"8급","ex":[],"tip":"부수 玉 · 같은 부수 글자: 球 理 班"},
        {"id":"g8-7-3","text":"外","read":"바깥 외","hun":"바깥","eum":"외","ko":"바깥","radical":"夕","strokes":5,"stage":"8급","ex":[],"tip":"부수 夕 · 같은 부수 글자: 多 夜"},
        {"id":"g8-7-4","text":"月","read":"달 월","hun":"달","eum":"월","ko":"달","radical":"月","strokes":4,"stage":"8급","ex":["월요일","정월","월급"],"tip":"초승달 모양에서 왔어요. 달과 월을 뜻해요. 부수 月 · 같은 부수 글자: 有 服 朝"},
        {"id":"g8-7-5","text":"二","read":"두 이","hun":"두","eum":"이","ko":"두","radical":"二","strokes":2,"stage":"8급","ex":["이층","이중","십이"],"tip":"가로획 두 개. 一 위에 하나를 더 그어요. 부수 二 · 같은 부수 글자: 五"}
      ]
    },
    {
      id: "g8-u8", no: 8, levelId: "g8", levelNo: 8, stage: "8급",
      label: "8급", emoji: "🌱", title: "사람 인 외 4자", goal: "人 一 日 長 弟",
      items: [
        {"id":"g8-8-1","text":"人","read":"사람 인","hun":"사람","eum":"인","ko":"사람","radical":"人","strokes":2,"stage":"8급","ex":["인구","인기","한국인"],"tip":"사람이 서 있는 옆모습. 왼쪽에 오면 亻가 돼요. 부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g8-8-2","text":"一","read":"한 일","hun":"한","eum":"일","ko":"한","radical":"一","strokes":1,"stage":"8급","ex":["일등","일주일","통일"],"tip":"가로획 하나. '하나'를 뜻하고 부수도 一이에요. 부수 一 · 같은 부수 글자: 三 七 不"},
        {"id":"g8-8-3","text":"日","read":"날 일","hun":"날","eum":"일","ko":"날","radical":"日","strokes":4,"stage":"8급","ex":["일요일","매일","일기"],"tip":"해가 둥글게 빛나는 모양. '날'이라는 뜻도 있어요. 부수 日 · 같은 부수 글자: 時 春 明"},
        {"id":"g8-8-4","text":"長","read":"긴 장","hun":"긴","eum":"장","ko":"긴","radical":"長","strokes":8,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-8-5","text":"弟","read":"아우 제","hun":"아우","eum":"제","ko":"아우","radical":"弓","strokes":7,"stage":"8급","ex":["형제","제자","매제"],"tip":"형을 따라가는 아우의 모양에서 왔어요. 부수 弓 · 같은 부수 글자: 弱 強"}
      ]
    },
    {
      id: "g8-u9", no: 9, levelId: "g8", levelNo: 9, stage: "8급",
      label: "8급", emoji: "🌱", title: "가운데 중 외 4자", goal: "中 靑 寸 七 土",
      items: [
        {"id":"g8-9-1","text":"中","read":"가운데 중","hun":"가운데","eum":"중","ko":"가운데","radical":"丨","strokes":4,"stage":"8급","ex":["중심","중간","중학교"],"tip":"네모 가운데를 세로로 뚫은 모양이에요."},
        {"id":"g8-9-2","text":"靑","read":"푸를 청","hun":"푸를","eum":"청","ko":"푸를","radical":"靑","strokes":8,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-9-3","text":"寸","read":"마디 촌","hun":"마디","eum":"촌","ko":"마디","radical":"寸","strokes":3,"stage":"8급","ex":[],"tip":"부수 寸 · 같은 부수 글자: 對"},
        {"id":"g8-9-4","text":"七","read":"일곱 칠","hun":"일곱","eum":"칠","ko":"일곱","radical":"一","strokes":2,"stage":"8급","ex":[],"tip":"부수 一 · 같은 부수 글자: 三 不 上"},
        {"id":"g8-9-5","text":"土","read":"흙 토","hun":"흙","eum":"토","ko":"흙","radical":"土","strokes":3,"stage":"8급","ex":["토양","국토","토기"],"tip":"땅 위에 흙이 쌓인 모양. 흙을 뜻해요. 부수 土 · 같은 부수 글자: 場 地 堂"}
      ]
    },
    {
      id: "g8-u10", no: 10, levelId: "g8", levelNo: 10, stage: "8급",
      label: "8급", emoji: "🌱", title: "여덟 팔 외 4자", goal: "八 學 韓 兄 火",
      items: [
        {"id":"g8-10-1","text":"八","read":"여덟 팔","hun":"여덟","eum":"팔","ko":"여덟","radical":"八","strokes":2,"stage":"8급","ex":[],"tip":"부수 八 · 같은 부수 글자: 六 公 共"},
        {"id":"g8-10-2","text":"學","read":"배울 학","hun":"배울","eum":"학","ko":"배울","radical":"子","strokes":16,"stage":"8급","ex":["학교","학생","유학"],"tip":"아이(子)가 집에서 배우는 모양이에요. 부수 子 · 같은 부수 글자: 孝 字 孫"},
        {"id":"g8-10-3","text":"韓","read":"한국 한","hun":"한국","eum":"한","ko":"한국","radical":"韋","strokes":17,"stage":"8급","ex":[],"tip":""},
        {"id":"g8-10-4","text":"兄","read":"형 형","hun":"형","eum":"형","ko":"형","radical":"儿","strokes":5,"stage":"8급","ex":["형제","형님","의형제"],"tip":"입(口)과 다리(儿)로 된 형의 모양이에요. 부수 儿 · 같은 부수 글자: 先 光"},
        {"id":"g8-10-5","text":"火","read":"불 화","hun":"불","eum":"화","ko":"불","radical":"火","strokes":4,"stage":"8급","ex":["화산","화재","소화"],"tip":"불꽃이 타오르는 모양. 아래에 오면 灬가 돼요. 부수 火 · 같은 부수 글자: 然"}
      ]
    },
    {
      id: "g7-u1", no: 1, levelId: "g7", levelNo: 1, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "집 가 외 4자", goal: "家 間 江 車 工",
      items: [
        {"id":"g7-1-1","text":"家","read":"집 가","hun":"집","eum":"가","ko":"집","radical":"宀","strokes":10,"stage":"7급Ⅱ","ex":["가족","국가","가정"],"tip":"지붕(宀) 아래에 돼지(豕)가 있는 집이에요. 부수 宀 · 같은 부수 글자: 室 安 定"},
        {"id":"g7-1-2","text":"間","read":"사이 간","hun":"사이","eum":"간","ko":"사이","radical":"門","strokes":12,"stage":"7급Ⅱ","ex":[],"tip":"부수 門 · 같은 부수 글자: 開"},
        {"id":"g7-1-3","text":"江","read":"강 강","hun":"강","eum":"강","ko":"강","radical":"水","strokes":6,"stage":"7급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 漢 海 活"},
        {"id":"g7-1-4","text":"車","read":"수레 차","hun":"수레","eum":"차","ko":"수레","radical":"車","strokes":7,"stage":"7급Ⅱ","ex":["자동차","주차","기차"],"tip":"음이 '차'와 '거' 두 가지예요. 수레·자동차에서는 '차'로 읽어요. 바퀴가 달린 수레를 위에서 본 모양이에요. 부수 車 · 같은 부수 글자: 軍"},
        {"id":"g7-1-5","text":"工","read":"장인 공","hun":"장인","eum":"공","ko":"장인","radical":"工","strokes":3,"stage":"7급Ⅱ","ex":[],"tip":"부수 工 · 같은 부수 글자: 左"}
      ]
    },
    {
      id: "g7-u2", no: 2, levelId: "g7", levelNo: 2, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "빌 공 외 4자", goal: "空 氣 記 男 內",
      items: [
        {"id":"g7-2-1","text":"空","read":"빌 공","hun":"빌","eum":"공","ko":"빌","radical":"穴","strokes":8,"stage":"7급Ⅱ","ex":[],"tip":"부수 穴 · 같은 부수 글자: 窓"},
        {"id":"g7-2-2","text":"氣","read":"기운 기","hun":"기운","eum":"기","ko":"기운","radical":"气","strokes":10,"stage":"7급Ⅱ","ex":[],"tip":""},
        {"id":"g7-2-3","text":"記","read":"기록할 기","hun":"기록할","eum":"기","ko":"기록할","radical":"言","strokes":10,"stage":"7급Ⅱ","ex":[],"tip":"부수 言 · 같은 부수 글자: 話 語 計"},
        {"id":"g7-2-4","text":"男","read":"사내 남","hun":"사내","eum":"남","ko":"사내","radical":"田","strokes":7,"stage":"7급Ⅱ","ex":[],"tip":"부수 田 · 같은 부수 글자: 界 番 由"},
        {"id":"g7-2-5","text":"內","read":"안 내","hun":"안","eum":"내","ko":"안","radical":"入","strokes":4,"stage":"7급Ⅱ","ex":[],"tip":"부수 入 · 같은 부수 글자: 全"}
      ]
    },
    {
      id: "g7-u3", no: 3, levelId: "g7", levelNo: 3, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "농사 농 외 4자", goal: "農 答 道 動 力",
      items: [
        {"id":"g7-3-1","text":"農","read":"농사 농","hun":"농사","eum":"농","ko":"농사","radical":"辰","strokes":13,"stage":"7급Ⅱ","ex":[],"tip":""},
        {"id":"g7-3-2","text":"答","read":"대답 답","hun":"대답","eum":"답","ko":"대답","radical":"竹","strokes":12,"stage":"7급Ⅱ","ex":[],"tip":"부수 竹 · 같은 부수 글자: 算 等 第"},
        {"id":"g7-3-3","text":"道","read":"길 도","hun":"길","eum":"도","ko":"길","radical":"辵","strokes":13,"stage":"7급Ⅱ","ex":[],"tip":"부수 辵 · 같은 부수 글자: 運 近 速"},
        {"id":"g7-3-4","text":"動","read":"움직일 동","hun":"움직일","eum":"동","ko":"움직일","radical":"力","strokes":11,"stage":"7급Ⅱ","ex":[],"tip":"부수 力 · 같은 부수 글자: 功 勇 勝"},
        {"id":"g7-3-5","text":"力","read":"힘 력","hun":"힘","eum":"력","ko":"힘","radical":"力","strokes":2,"stage":"7급Ⅱ","ex":[],"tip":"부수 力 · 같은 부수 글자: 動 功 勇"}
      ]
    },
    {
      id: "g7-u4", no: 4, levelId: "g7", levelNo: 4, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "설 립 외 4자", goal: "立 每 名 物 方",
      items: [
        {"id":"g7-4-1","text":"立","read":"설 립","hun":"설","eum":"립","ko":"설","radical":"立","strokes":5,"stage":"7급Ⅱ","ex":[],"tip":"부수 立 · 같은 부수 글자: 童 章"},
        {"id":"g7-4-2","text":"每","read":"매양 매","hun":"매양","eum":"매","ko":"매양","radical":"毋","strokes":7,"stage":"7급Ⅱ","ex":[],"tip":"부수 毋 · 같은 부수 글자: 母"},
        {"id":"g7-4-3","text":"名","read":"이름 명","hun":"이름","eum":"명","ko":"이름","radical":"口","strokes":6,"stage":"7급Ⅱ","ex":[],"tip":"부수 口 · 같은 부수 글자: 右 同 命"},
        {"id":"g7-4-4","text":"物","read":"물건 물","hun":"물건","eum":"물","ko":"물건","radical":"牛","strokes":8,"stage":"7급Ⅱ","ex":[],"tip":"부수 牛 · 같은 부수 글자: 特"},
        {"id":"g7-4-5","text":"方","read":"모 방","hun":"모","eum":"방","ko":"모","radical":"方","strokes":4,"stage":"7급Ⅱ","ex":[],"tip":"부수 方 · 같은 부수 글자: 旗 族"}
      ]
    },
    {
      id: "g7-u5", no: 5, levelId: "g7", levelNo: 5, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "아닐 불 외 4자", goal: "不 事 上 姓 世",
      items: [
        {"id":"g7-5-1","text":"不","read":"아닐 불","hun":"아닐","eum":"불","ko":"아닐","radical":"一","strokes":4,"stage":"7급Ⅱ","ex":[],"tip":"부수 一 · 같은 부수 글자: 三 七 上"},
        {"id":"g7-5-2","text":"事","read":"일 사","hun":"일","eum":"사","ko":"일","radical":"亅","strokes":8,"stage":"7급Ⅱ","ex":[],"tip":""},
        {"id":"g7-5-3","text":"上","read":"윗 상","hun":"윗","eum":"상","ko":"윗","radical":"一","strokes":3,"stage":"7급Ⅱ","ex":["상하","지상","상승"],"tip":"기준선 위에 표시를 한 모양. '위'를 뜻해요. 부수 一 · 같은 부수 글자: 三 七 不"},
        {"id":"g7-5-4","text":"姓","read":"성 성","hun":"성","eum":"성","ko":"성","radical":"女","strokes":8,"stage":"7급Ⅱ","ex":[],"tip":"부수 女 · 같은 부수 글자: 始"},
        {"id":"g7-5-5","text":"世","read":"인간 세","hun":"인간","eum":"세","ko":"인간","radical":"一","strokes":5,"stage":"7급Ⅱ","ex":[],"tip":"부수 一 · 같은 부수 글자: 三 七 不"}
      ]
    },
    {
      id: "g7-u6", no: 6, levelId: "g7", levelNo: 6, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "손 수 외 4자", goal: "手 時 市 食 安",
      items: [
        {"id":"g7-6-1","text":"手","read":"손 수","hun":"손","eum":"수","ko":"손","radical":"手","strokes":4,"stage":"7급Ⅱ","ex":["박수","수첩","악수"],"tip":"손가락 다섯 개를 편 모양. 왼쪽에 오면 扌가 돼요. 부수 手 · 같은 부수 글자: 才"},
        {"id":"g7-6-2","text":"時","read":"때 시","hun":"때","eum":"시","ko":"때","radical":"日","strokes":10,"stage":"7급Ⅱ","ex":["시간","시계","동시"],"tip":"해(日)와 절구(寺)로 된 글자, 때를 뜻해요. 부수 日 · 같은 부수 글자: 春 明 昨"},
        {"id":"g7-6-3","text":"市","read":"저자 시","hun":"저자","eum":"시","ko":"저자","radical":"巾","strokes":5,"stage":"7급Ⅱ","ex":[],"tip":"부수 巾 · 같은 부수 글자: 席"},
        {"id":"g7-6-4","text":"食","read":"밥 식","hun":"밥","eum":"식","ko":"밥","radical":"食","strokes":9,"stage":"7급Ⅱ","ex":["음식","식당","식사"],"tip":"음식이 담긴 그릇 모양에서 왔어요. 부수 食 · 같은 부수 글자: 飮"},
        {"id":"g7-6-5","text":"安","read":"편안 안","hun":"편안","eum":"안","ko":"편안","radical":"宀","strokes":6,"stage":"7급Ⅱ","ex":[],"tip":"부수 宀 · 같은 부수 글자: 室 家 定"}
      ]
    },
    {
      id: "g7-u7", no: 7, levelId: "g7", levelNo: 7, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "낮 오 외 4자", goal: "午 右 子 自 場",
      items: [
        {"id":"g7-7-1","text":"午","read":"낮 오","hun":"낮","eum":"오","ko":"낮","radical":"十","strokes":4,"stage":"7급Ⅱ","ex":[],"tip":"부수 十 · 같은 부수 글자: 南 千 半"},
        {"id":"g7-7-2","text":"右","read":"오를 우","hun":"오를","eum":"우","ko":"오를","radical":"口","strokes":5,"stage":"7급Ⅱ","ex":["우회전","우측","좌우"],"tip":"오른손으로 입에 음식을 가져가는 모양이에요. 부수 口 · 같은 부수 글자: 名 同 命"},
        {"id":"g7-7-3","text":"子","read":"아들 자","hun":"아들","eum":"자","ko":"아들","radical":"子","strokes":3,"stage":"7급Ⅱ","ex":["자녀","남자","여자"],"tip":"팔을 벌린 아기 모양. 아이를 뜻해요. 부수 子 · 같은 부수 글자: 學 孝 字"},
        {"id":"g7-7-4","text":"自","read":"스스로 자","hun":"스스로","eum":"자","ko":"스스로","radical":"自","strokes":6,"stage":"7급Ⅱ","ex":[],"tip":""},
        {"id":"g7-7-5","text":"場","read":"마당 장","hun":"마당","eum":"장","ko":"마당","radical":"土","strokes":12,"stage":"7급Ⅱ","ex":[],"tip":"부수 土 · 같은 부수 글자: 地 堂 在"}
      ]
    },
    {
      id: "g7-u8", no: 8, levelId: "g7", levelNo: 8, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "번개 전 외 4자", goal: "電 前 全 正 足",
      items: [
        {"id":"g7-8-1","text":"電","read":"번개 전","hun":"번개","eum":"전","ko":"번개","radical":"雨","strokes":13,"stage":"7급Ⅱ","ex":[],"tip":"부수 雨 · 같은 부수 글자: 雪"},
        {"id":"g7-8-2","text":"前","read":"앞 전","hun":"앞","eum":"전","ko":"앞","radical":"刀","strokes":9,"stage":"7급Ⅱ","ex":[],"tip":"부수 刀 · 같은 부수 글자: 利 分 別"},
        {"id":"g7-8-3","text":"全","read":"온전 전","hun":"온전","eum":"전","ko":"온전","radical":"入","strokes":6,"stage":"7급Ⅱ","ex":[],"tip":"부수 入 · 같은 부수 글자: 內"},
        {"id":"g7-8-4","text":"正","read":"바를 정","hun":"바를","eum":"정","ko":"바를","radical":"止","strokes":5,"stage":"7급Ⅱ","ex":[],"tip":""},
        {"id":"g7-8-5","text":"足","read":"발 족","hun":"발","eum":"족","ko":"발","radical":"足","strokes":7,"stage":"7급Ⅱ","ex":["족구","부족","만족"],"tip":"발과 다리 모양. '충분하다'는 뜻도 있어요. 부수 足 · 같은 부수 글자: 路"}
      ]
    },
    {
      id: "g7-u9", no: 9, levelId: "g7", levelNo: 9, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "왼 좌 외 4자", goal: "左 直 平 下 漢",
      items: [
        {"id":"g7-9-1","text":"左","read":"왼 좌","hun":"왼","eum":"좌","ko":"왼","radical":"工","strokes":5,"stage":"7급Ⅱ","ex":["좌우","좌회전","좌측"],"tip":"왼손으로 도구(工)를 잡은 모양이에요."},
        {"id":"g7-9-2","text":"直","read":"곧을 직","hun":"곧을","eum":"직","ko":"곧을","radical":"目","strokes":8,"stage":"7급Ⅱ","ex":[],"tip":"부수 目 · 같은 부수 글자: 省"},
        {"id":"g7-9-3","text":"平","read":"평평할 평","hun":"평평할","eum":"평","ko":"평평할","radical":"干","strokes":5,"stage":"7급Ⅱ","ex":[],"tip":"부수 干 · 같은 부수 글자: 年 幸"},
        {"id":"g7-9-4","text":"下","read":"아래 하","hun":"아래","eum":"하","ko":"아래","radical":"一","strokes":3,"stage":"7급Ⅱ","ex":["지하","하강","하반기"],"tip":"기준선 아래에 표시를 한 모양. '아래'를 뜻해요. 부수 一 · 같은 부수 글자: 三 七 不"},
        {"id":"g7-9-5","text":"漢","read":"한수 한","hun":"한수","eum":"한","ko":"한수","radical":"水","strokes":14,"stage":"7급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 海 活"}
      ]
    },
    {
      id: "g7-u10", no: 10, levelId: "g7", levelNo: 10, stage: "7급Ⅱ",
      label: "7급", emoji: "🌿", title: "바다 해 외 4자", goal: "海 話 活 孝 後",
      items: [
        {"id":"g7-10-1","text":"海","read":"바다 해","hun":"바다","eum":"해","ko":"바다","radical":"水","strokes":10,"stage":"7급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 活"},
        {"id":"g7-10-2","text":"話","read":"말씀 화","hun":"말씀","eum":"화","ko":"말씀","radical":"言","strokes":13,"stage":"7급Ⅱ","ex":[],"tip":"부수 言 · 같은 부수 글자: 記 語 計"},
        {"id":"g7-10-3","text":"活","read":"살 활","hun":"살","eum":"활","ko":"살","radical":"水","strokes":9,"stage":"7급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g7-10-4","text":"孝","read":"효도 효","hun":"효도","eum":"효","ko":"효도","radical":"子","strokes":7,"stage":"7급Ⅱ","ex":[],"tip":"부수 子 · 같은 부수 글자: 學 字 孫"},
        {"id":"g7-10-5","text":"後","read":"뒤 후","hun":"뒤","eum":"후","ko":"뒤","radical":"彳","strokes":9,"stage":"7급Ⅱ","ex":[],"tip":"부수 彳 · 같은 부수 글자: 待"}
      ]
    },
    {
      id: "g7-u11", no: 11, levelId: "g7", levelNo: 11, stage: "7급",
      label: "7급", emoji: "🌿", title: "노래 가 외 4자", goal: "歌 口 旗 同 洞",
      items: [
        {"id":"g7-11-1","text":"歌","read":"노래 가","hun":"노래","eum":"가","ko":"노래","radical":"欠","strokes":14,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-11-2","text":"口","read":"입 구","hun":"입","eum":"구","ko":"입","radical":"口","strokes":3,"stage":"7급","ex":["입구","인구","식구"],"tip":"입을 벌린 네모 모양. 말하는 것과도 이어져요. 부수 口 · 같은 부수 글자: 名 右 同"},
        {"id":"g7-11-3","text":"旗","read":"기 기","hun":"기","eum":"기","ko":"기","radical":"方","strokes":14,"stage":"7급","ex":[],"tip":"부수 方 · 같은 부수 글자: 族"},
        {"id":"g7-11-4","text":"同","read":"한가지 동","hun":"한가지","eum":"동","ko":"한가지","radical":"口","strokes":6,"stage":"7급","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 命"},
        {"id":"g7-11-5","text":"洞","read":"골 동","hun":"골","eum":"동","ko":"골","radical":"水","strokes":9,"stage":"7급","ex":[],"tip":"음이 여럿이에요: 동(골), 통(밝을) 부수 水 · 같은 부수 글자: 江 漢 海"}
      ]
    },
    {
      id: "g7-u12", no: 12, levelId: "g7", levelNo: 12, stage: "7급",
      label: "7급", emoji: "🌿", title: "겨울 동 외 4자", goal: "冬 登 來 老 里",
      items: [
        {"id":"g7-12-1","text":"冬","read":"겨울 동","hun":"겨울","eum":"동","ko":"겨울","radical":"冫","strokes":5,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-12-2","text":"登","read":"오를 등","hun":"오를","eum":"등","ko":"오를","radical":"癶","strokes":12,"stage":"7급","ex":[],"tip":"부수 癶 · 같은 부수 글자: 發"},
        {"id":"g7-12-3","text":"來","read":"올 래","hun":"올","eum":"래","ko":"올","radical":"人","strokes":8,"stage":"7급","ex":[],"tip":"부수 人 · 같은 부수 글자: 住 便 休"},
        {"id":"g7-12-4","text":"老","read":"늙을 로","hun":"늙을","eum":"로","ko":"늙을","radical":"老","strokes":6,"stage":"7급","ex":[],"tip":"부수 老 · 같은 부수 글자: 者"},
        {"id":"g7-12-5","text":"里","read":"마을 리","hun":"마을","eum":"리","ko":"마을","radical":"里","strokes":7,"stage":"7급","ex":[],"tip":"부수 里 · 같은 부수 글자: 重 野"}
      ]
    },
    {
      id: "g7-u13", no: 13, levelId: "g7", levelNo: 13, stage: "7급",
      label: "7급", emoji: "🌿", title: "수풀 림 외 4자", goal: "林 面 命 文 問",
      items: [
        {"id":"g7-13-1","text":"林","read":"수풀 림","hun":"수풀","eum":"림","ko":"수풀","radical":"木","strokes":8,"stage":"7급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 植"},
        {"id":"g7-13-2","text":"面","read":"낯 면","hun":"낯","eum":"면","ko":"낯","radical":"面","strokes":9,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-13-3","text":"命","read":"목숨 명","hun":"목숨","eum":"명","ko":"목숨","radical":"口","strokes":8,"stage":"7급","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 同"},
        {"id":"g7-13-4","text":"文","read":"글월 문","hun":"글월","eum":"문","ko":"글월","radical":"文","strokes":4,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-13-5","text":"問","read":"물을 문","hun":"물을","eum":"문","ko":"물을","radical":"口","strokes":11,"stage":"7급","ex":["질문","문제","문답"],"tip":"문(門) 안에서 입(口)으로 묻는 모양이에요. 부수 口 · 같은 부수 글자: 名 右 同"}
      ]
    },
    {
      id: "g7-u14", no: 14, levelId: "g7", levelNo: 14, stage: "7급",
      label: "7급", emoji: "🌿", title: "일백 백 외 4자", goal: "百 夫 算 色 夕",
      items: [
        {"id":"g7-14-1","text":"百","read":"일백 백","hun":"일백","eum":"백","ko":"일백","radical":"白","strokes":6,"stage":"7급","ex":["백원","백점","오백"],"tip":"一 + 白(흰 백). 100을 뜻해요."},
        {"id":"g7-14-2","text":"夫","read":"지아비 부","hun":"지아비","eum":"부","ko":"지아비","radical":"大","strokes":4,"stage":"7급","ex":[],"tip":"부수 大 · 같은 부수 글자: 天 失 太"},
        {"id":"g7-14-3","text":"算","read":"셈 산","hun":"셈","eum":"산","ko":"셈","radical":"竹","strokes":14,"stage":"7급","ex":[],"tip":"부수 竹 · 같은 부수 글자: 答 等 第"},
        {"id":"g7-14-4","text":"色","read":"빛 색","hun":"빛","eum":"색","ko":"빛","radical":"色","strokes":6,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-14-5","text":"夕","read":"저녁 석","hun":"저녁","eum":"석","ko":"저녁","radical":"夕","strokes":3,"stage":"7급","ex":[],"tip":"부수 夕 · 같은 부수 글자: 外 多 夜"}
      ]
    },
    {
      id: "g7-u15", no: 15, levelId: "g7", levelNo: 15, stage: "7급",
      label: "7급", emoji: "🌿", title: "적을 소 외 4자", goal: "少 所 數 植 心",
      items: [
        {"id":"g7-15-1","text":"少","read":"적을 소","hun":"적을","eum":"소","ko":"적을","radical":"小","strokes":4,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-15-2","text":"所","read":"바 소","hun":"바","eum":"소","ko":"바","radical":"戶","strokes":8,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-15-3","text":"數","read":"셈 수","hun":"셈","eum":"수","ko":"셈","radical":"攴","strokes":15,"stage":"7급","ex":[],"tip":"부수 攴 · 같은 부수 글자: 敎 放"},
        {"id":"g7-15-4","text":"植","read":"심을 식","hun":"심을","eum":"식","ko":"심을","radical":"木","strokes":12,"stage":"7급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"},
        {"id":"g7-15-5","text":"心","read":"마음 심","hun":"마음","eum":"심","ko":"마음","radical":"心","strokes":4,"stage":"7급","ex":["중심","관심","안심"],"tip":"심장 모양에서 왔어요. 아래에 오면 忄가 돼요. 부수 心 · 같은 부수 글자: 急 意 感"}
      ]
    },
    {
      id: "g7-u16", no: 16, levelId: "g7", levelNo: 16, stage: "7급",
      label: "7급", emoji: "🌿", title: "말씀 어 외 4자", goal: "語 然 有 育 邑",
      items: [
        {"id":"g7-16-1","text":"語","read":"말씀 어","hun":"말씀","eum":"어","ko":"말씀","radical":"言","strokes":14,"stage":"7급","ex":[],"tip":"부수 言 · 같은 부수 글자: 記 話 計"},
        {"id":"g7-16-2","text":"然","read":"그럴 연","hun":"그럴","eum":"연","ko":"그럴","radical":"火","strokes":12,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-16-3","text":"有","read":"있을 유","hun":"있을","eum":"유","ko":"있을","radical":"月","strokes":6,"stage":"7급","ex":[],"tip":"부수 月 · 같은 부수 글자: 服 朝"},
        {"id":"g7-16-4","text":"育","read":"기를 육","hun":"기를","eum":"육","ko":"기를","radical":"肉","strokes":8,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-16-5","text":"邑","read":"고을 읍","hun":"고을","eum":"읍","ko":"고을","radical":"邑","strokes":7,"stage":"7급","ex":[],"tip":"부수 邑 · 같은 부수 글자: 部 郡"}
      ]
    },
    {
      id: "g7-u17", no: 17, levelId: "g7", levelNo: 17, stage: "7급",
      label: "7급", emoji: "🌿", title: "들 입 외 4자", goal: "入 字 祖 住 主",
      items: [
        {"id":"g7-17-1","text":"入","read":"들 입","hun":"들","eum":"입","ko":"들","radical":"入","strokes":2,"stage":"7급","ex":[],"tip":"부수 入 · 같은 부수 글자: 內 全"},
        {"id":"g7-17-2","text":"字","read":"글자 자","hun":"글자","eum":"자","ko":"글자","radical":"子","strokes":6,"stage":"7급","ex":[],"tip":"부수 子 · 같은 부수 글자: 學 孝 孫"},
        {"id":"g7-17-3","text":"祖","read":"할아비 조","hun":"할아비","eum":"조","ko":"할아비","radical":"示","strokes":10,"stage":"7급","ex":[],"tip":"부수 示 · 같은 부수 글자: 社 神 禮"},
        {"id":"g7-17-4","text":"住","read":"살 주","hun":"살","eum":"주","ko":"살","radical":"人","strokes":7,"stage":"7급","ex":["주소","거주","주거"],"tip":"사람(亻)이 머무는(主) 곳, 사는 것을 뜻해요. 부수 人 · 같은 부수 글자: 來 便 休"},
        {"id":"g7-17-5","text":"主","read":"임금 주","hun":"임금","eum":"주","ko":"임금","radical":"丶","strokes":5,"stage":"7급","ex":[],"tip":""}
      ]
    },
    {
      id: "g7-u18", no: 18, levelId: "g7", levelNo: 18, stage: "7급",
      label: "7급", emoji: "🌿", title: "무거울 중 외 4자", goal: "重 紙 地 千 天",
      items: [
        {"id":"g7-18-1","text":"重","read":"무거울 중","hun":"무거울","eum":"중","ko":"무거울","radical":"里","strokes":9,"stage":"7급","ex":[],"tip":"부수 里 · 같은 부수 글자: 野"},
        {"id":"g7-18-2","text":"紙","read":"종이 지","hun":"종이","eum":"지","ko":"종이","radical":"糸","strokes":10,"stage":"7급","ex":[],"tip":"부수 糸 · 같은 부수 글자: 線 級 綠"},
        {"id":"g7-18-3","text":"地","read":"땅 지","hun":"땅","eum":"지","ko":"땅","radical":"土","strokes":6,"stage":"7급","ex":[],"tip":"어문회 대표훈음은 '따 지'예요. 뜻이 같은 '땅 지'로 익혀도 좋아요. 부수 土 · 같은 부수 글자: 場 堂 在"},
        {"id":"g7-18-4","text":"千","read":"일천 천","hun":"일천","eum":"천","ko":"일천","radical":"十","strokes":3,"stage":"7급","ex":[],"tip":"부수 十 · 같은 부수 글자: 南 午 半"},
        {"id":"g7-18-5","text":"天","read":"하늘 천","hun":"하늘","eum":"천","ko":"하늘","radical":"大","strokes":4,"stage":"7급","ex":["천국","천재","천지"],"tip":"사람(大) 위에 하늘이 있다는 모양이에요. 부수 大 · 같은 부수 글자: 夫 失 太"}
      ]
    },
    {
      id: "g7-u19", no: 19, levelId: "g7", levelNo: 19, stage: "7급",
      label: "7급", emoji: "🌿", title: "내 천 외 4자", goal: "川 草 村 秋 春",
      items: [
        {"id":"g7-19-1","text":"川","read":"내 천","hun":"내","eum":"천","ko":"내","radical":"巛","strokes":3,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-19-2","text":"草","read":"풀 초","hun":"풀","eum":"초","ko":"풀","radical":"艸","strokes":10,"stage":"7급","ex":[],"tip":"부수 艸 · 같은 부수 글자: 萬 花 藥"},
        {"id":"g7-19-3","text":"村","read":"마을 촌","hun":"마을","eum":"촌","ko":"마을","radical":"木","strokes":7,"stage":"7급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"},
        {"id":"g7-19-4","text":"秋","read":"가을 추","hun":"가을","eum":"추","ko":"가을","radical":"禾","strokes":9,"stage":"7급","ex":[],"tip":"부수 禾 · 같은 부수 글자: 科"},
        {"id":"g7-19-5","text":"春","read":"봄 춘","hun":"봄","eum":"춘","ko":"봄","radical":"日","strokes":9,"stage":"7급","ex":[],"tip":"부수 日 · 같은 부수 글자: 時 明 昨"}
      ]
    },
    {
      id: "g7-u20", no: 20, levelId: "g7", levelNo: 20, stage: "7급",
      label: "7급", emoji: "🌿", title: "날 출 외 4자", goal: "出 便 夏 花 休",
      items: [
        {"id":"g7-20-1","text":"出","read":"날 출","hun":"날","eum":"출","ko":"날","radical":"凵","strokes":5,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-20-2","text":"便","read":"편할 편","hun":"편할","eum":"편","ko":"편할","radical":"人","strokes":9,"stage":"7급","ex":["편리","편지","식후변"],"tip":"사람(亻)이 편하게 바뀐 모양. '똥오줌 변'으로도 읽어요. 음이 여럿이에요: 편(편할), 변(똥오줌) 부수 人 · 같은 부수 글자: 來 住 休"},
        {"id":"g7-20-3","text":"夏","read":"여름 하","hun":"여름","eum":"하","ko":"여름","radical":"夊","strokes":10,"stage":"7급","ex":[],"tip":""},
        {"id":"g7-20-4","text":"花","read":"꽃 화","hun":"꽃","eum":"화","ko":"꽃","radical":"艸","strokes":8,"stage":"7급","ex":[],"tip":"부수 艸 · 같은 부수 글자: 萬 草 藥"},
        {"id":"g7-20-5","text":"休","read":"쉴 휴","hun":"쉴","eum":"휴","ko":"쉴","radical":"人","strokes":6,"stage":"7급","ex":[],"tip":"부수 人 · 같은 부수 글자: 來 住 便"}
      ]
    },
    {
      id: "g6-u1", no: 1, levelId: "g6", levelNo: 1, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "각각 각 외 4자", goal: "各 角 界 計 高",
      items: [
        {"id":"g6-1-1","text":"各","read":"각각 각","hun":"각각","eum":"각","ko":"각각","radical":"口","strokes":6,"stage":"6급Ⅱ","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 同"},
        {"id":"g6-1-2","text":"角","read":"뿔 각","hun":"뿔","eum":"각","ko":"뿔","radical":"角","strokes":7,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-1-3","text":"界","read":"지경 계","hun":"지경","eum":"계","ko":"지경","radical":"田","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 田 · 같은 부수 글자: 男 番 由"},
        {"id":"g6-1-4","text":"計","read":"셀 계","hun":"셀","eum":"계","ko":"셀","radical":"言","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 言 · 같은 부수 글자: 記 話 語"},
        {"id":"g6-1-5","text":"高","read":"높을 고","hun":"높을","eum":"고","ko":"높을","radical":"高","strokes":10,"stage":"6급Ⅱ","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u2", no: 2, levelId: "g6", levelNo: 2, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "공평할 공 외 4자", goal: "公 共 功 果 科",
      items: [
        {"id":"g6-2-1","text":"公","read":"공평할 공","hun":"공평할","eum":"공","ko":"공평할","radical":"八","strokes":4,"stage":"6급Ⅱ","ex":[],"tip":"부수 八 · 같은 부수 글자: 六 共"},
        {"id":"g6-2-2","text":"共","read":"한가지 공","hun":"한가지","eum":"공","ko":"한가지","radical":"八","strokes":6,"stage":"6급Ⅱ","ex":[],"tip":"부수 八 · 같은 부수 글자: 六 公"},
        {"id":"g6-2-3","text":"功","read":"공 공","hun":"공","eum":"공","ko":"공","radical":"力","strokes":5,"stage":"6급Ⅱ","ex":[],"tip":"부수 力 · 같은 부수 글자: 動 勇 勝"},
        {"id":"g6-2-4","text":"果","read":"실과 과","hun":"실과","eum":"과","ko":"실과","radical":"木","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"},
        {"id":"g6-2-5","text":"科","read":"과목 과","hun":"과목","eum":"과","ko":"과목","radical":"禾","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 禾 · 같은 부수 글자: 秋"}
      ]
    },
    {
      id: "g6-u3", no: 3, levelId: "g6", levelNo: 3, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "빛 광 외 4자", goal: "光 球 今 急 短",
      items: [
        {"id":"g6-3-1","text":"光","read":"빛 광","hun":"빛","eum":"광","ko":"빛","radical":"儿","strokes":6,"stage":"6급Ⅱ","ex":[],"tip":"부수 儿 · 같은 부수 글자: 先 兄"},
        {"id":"g6-3-2","text":"球","read":"공 구","hun":"공","eum":"구","ko":"공","radical":"玉","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 玉 · 같은 부수 글자: 王 理 班"},
        {"id":"g6-3-3","text":"今","read":"이제 금","hun":"이제","eum":"금","ko":"이제","radical":"人","strokes":4,"stage":"6급Ⅱ","ex":["오늘","지금","금년"],"tip":"지금 이 순간을 뜻해요. 오늘(今日)에 쓰여요. 부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g6-3-4","text":"急","read":"급할 급","hun":"급할","eum":"급","ko":"급할","radical":"心","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 心 · 같은 부수 글자: 意 感 愛"},
        {"id":"g6-3-5","text":"短","read":"짧을 단","hun":"짧을","eum":"단","ko":"짧을","radical":"矢","strokes":12,"stage":"6급Ⅱ","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u4", no: 4, levelId: "g6", levelNo: 4, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "집 당 외 4자", goal: "堂 代 對 圖 讀",
      items: [
        {"id":"g6-4-1","text":"堂","read":"집 당","hun":"집","eum":"당","ko":"집","radical":"土","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 土 · 같은 부수 글자: 場 地 在"},
        {"id":"g6-4-2","text":"代","read":"대신할 대","hun":"대신할","eum":"대","ko":"대신할","radical":"人","strokes":5,"stage":"6급Ⅱ","ex":[],"tip":"부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g6-4-3","text":"對","read":"대할 대","hun":"대할","eum":"대","ko":"대할","radical":"寸","strokes":14,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-4-4","text":"圖","read":"그림 도","hun":"그림","eum":"도","ko":"그림","radical":"囗","strokes":14,"stage":"6급Ⅱ","ex":[],"tip":"부수 囗 · 같은 부수 글자: 國 四 園"},
        {"id":"g6-4-5","text":"讀","read":"읽을 독","hun":"읽을","eum":"독","ko":"읽을","radical":"言","strokes":22,"stage":"6급Ⅱ","ex":["독서","구독","독해"],"tip":"말(言)을 소리 내어 읽는 모양이에요. 음이 여럿이에요: 독(읽을), 두(구절) 부수 言 · 같은 부수 글자: 記 話 語"}
      ]
    },
    {
      id: "g6-u5", no: 5, levelId: "g6", levelNo: 5, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "아이 동 외 4자", goal: "童 等 樂 利 理",
      items: [
        {"id":"g6-5-1","text":"童","read":"아이 동","hun":"아이","eum":"동","ko":"아이","radical":"立","strokes":12,"stage":"6급Ⅱ","ex":[],"tip":"부수 立 · 같은 부수 글자: 章"},
        {"id":"g6-5-2","text":"等","read":"무리 등","hun":"무리","eum":"등","ko":"무리","radical":"竹","strokes":12,"stage":"6급Ⅱ","ex":[],"tip":"부수 竹 · 같은 부수 글자: 答 算 第"},
        {"id":"g6-5-3","text":"樂","read":"즐길 락","hun":"즐길","eum":"락","ko":"즐길","radical":"木","strokes":15,"stage":"6급Ⅱ","ex":["음악","쾌락","오락"],"tip":"나무(木)에 북을 매단 즐거움. 음악(音樂)에서는 '악'으로 읽어요. 음이 여럿이에요: 락(즐길), 악(노래), 요(좋아할) 부수 木 · 같은 부수 글자: 校 東 林"},
        {"id":"g6-5-4","text":"利","read":"이할 리","hun":"이할","eum":"리","ko":"이할","radical":"刀","strokes":7,"stage":"6급Ⅱ","ex":[],"tip":"부수 刀 · 같은 부수 글자: 前 分 別"},
        {"id":"g6-5-5","text":"理","read":"다스릴 리","hun":"다스릴","eum":"리","ko":"다스릴","radical":"玉","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 玉 · 같은 부수 글자: 王 球 班"}
      ]
    },
    {
      id: "g6-u6", no: 6, levelId: "g6", levelNo: 6, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "밝을 명 외 4자", goal: "明 聞 半 反 班",
      items: [
        {"id":"g6-6-1","text":"明","read":"밝을 명","hun":"밝을","eum":"명","ko":"밝을","radical":"日","strokes":8,"stage":"6급Ⅱ","ex":["명랑","설명","조명"],"tip":"해(日)와 달(月)이 함께 빛나는 밝음이에요. 부수 日 · 같은 부수 글자: 時 春 昨"},
        {"id":"g6-6-2","text":"聞","read":"들을 문","hun":"들을","eum":"문","ko":"들을","radical":"耳","strokes":14,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-6-3","text":"半","read":"반 반","hun":"반","eum":"반","ko":"반","radical":"十","strokes":5,"stage":"6급Ⅱ","ex":[],"tip":"부수 十 · 같은 부수 글자: 南 午 千"},
        {"id":"g6-6-4","text":"反","read":"돌이킬 반","hun":"돌이킬","eum":"반","ko":"돌이킬","radical":"又","strokes":4,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-6-5","text":"班","read":"나눌 반","hun":"나눌","eum":"반","ko":"나눌","radical":"玉","strokes":10,"stage":"6급Ⅱ","ex":[],"tip":"부수 玉 · 같은 부수 글자: 王 球 理"}
      ]
    },
    {
      id: "g6-u7", no: 7, levelId: "g6", levelNo: 7, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "필 발 외 4자", goal: "發 放 部 分 社",
      items: [
        {"id":"g6-7-1","text":"發","read":"필 발","hun":"필","eum":"발","ko":"필","radical":"癶","strokes":12,"stage":"6급Ⅱ","ex":[],"tip":"부수 癶 · 같은 부수 글자: 登"},
        {"id":"g6-7-2","text":"放","read":"놓을 방","hun":"놓을","eum":"방","ko":"놓을","radical":"攴","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 攴 · 같은 부수 글자: 敎 數"},
        {"id":"g6-7-3","text":"部","read":"떼 부","hun":"떼","eum":"부","ko":"떼","radical":"邑","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 邑 · 같은 부수 글자: 郡"},
        {"id":"g6-7-4","text":"分","read":"나눌 분","hun":"나눌","eum":"분","ko":"나눌","radical":"刀","strokes":4,"stage":"6급Ⅱ","ex":["삼분","분단","충분"],"tip":"칼(刀)로 나눈다는 뜻에서 시간의 '분'이 됐어요. 부수 刀 · 같은 부수 글자: 前 利 別"},
        {"id":"g6-7-5","text":"社","read":"모일 사","hun":"모일","eum":"사","ko":"모일","radical":"示","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 示 · 같은 부수 글자: 祖 神 禮"}
      ]
    },
    {
      id: "g6-u8", no: 8, levelId: "g6", levelNo: 8, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "글 서 외 4자", goal: "書 線 雪 成 省",
      items: [
        {"id":"g6-8-1","text":"書","read":"글 서","hun":"글","eum":"서","ko":"글","radical":"曰","strokes":10,"stage":"6급Ⅱ","ex":["서점","도서관","서류"],"tip":"붓으로 글을 쓰는 모양. 책을 뜻해요. 부수 曰 · 같은 부수 글자: 會"},
        {"id":"g6-8-2","text":"線","read":"줄 선","hun":"줄","eum":"선","ko":"줄","radical":"糸","strokes":15,"stage":"6급Ⅱ","ex":[],"tip":"부수 糸 · 같은 부수 글자: 紙 級 綠"},
        {"id":"g6-8-3","text":"雪","read":"눈 설","hun":"눈","eum":"설","ko":"눈","radical":"雨","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 雨 · 같은 부수 글자: 電"},
        {"id":"g6-8-4","text":"成","read":"이룰 성","hun":"이룰","eum":"성","ko":"이룰","radical":"戈","strokes":7,"stage":"6급Ⅱ","ex":[],"tip":"부수 戈 · 같은 부수 글자: 戰"},
        {"id":"g6-8-5","text":"省","read":"살필 성","hun":"살필","eum":"성","ko":"살필","radical":"目","strokes":9,"stage":"6급Ⅱ","ex":["반성","생략","생신"],"tip":"눈(目)으로 살펴 덜어 낸다는 뜻이에요. 음이 여럿이에요: 성(살필), 생(덜) 부수 目 · 같은 부수 글자: 直"}
      ]
    },
    {
      id: "g6-u9", no: 9, levelId: "g6", levelNo: 9, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "사라질 소 외 4자", goal: "消 術 始 身 神",
      items: [
        {"id":"g6-9-1","text":"消","read":"사라질 소","hun":"사라질","eum":"소","ko":"사라질","radical":"水","strokes":10,"stage":"6급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g6-9-2","text":"術","read":"재주 술","hun":"재주","eum":"술","ko":"재주","radical":"行","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-9-3","text":"始","read":"비로소 시","hun":"비로소","eum":"시","ko":"비로소","radical":"女","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 女 · 같은 부수 글자: 姓"},
        {"id":"g6-9-4","text":"身","read":"몸 신","hun":"몸","eum":"신","ko":"몸","radical":"身","strokes":7,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-9-5","text":"神","read":"귀신 신","hun":"귀신","eum":"신","ko":"귀신","radical":"示","strokes":10,"stage":"6급Ⅱ","ex":[],"tip":"부수 示 · 같은 부수 글자: 祖 社 禮"}
      ]
    },
    {
      id: "g6-u10", no: 10, levelId: "g6", levelNo: 10, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "믿을 신 외 4자", goal: "信 新 弱 藥 業",
      items: [
        {"id":"g6-10-1","text":"信","read":"믿을 신","hun":"믿을","eum":"신","ko":"믿을","radical":"人","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g6-10-2","text":"新","read":"새 신","hun":"새","eum":"신","ko":"새","radical":"斤","strokes":13,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-10-3","text":"弱","read":"약할 약","hun":"약할","eum":"약","ko":"약할","radical":"弓","strokes":10,"stage":"6급Ⅱ","ex":[],"tip":"부수 弓 · 같은 부수 글자: 弟 強"},
        {"id":"g6-10-4","text":"藥","read":"약 약","hun":"약","eum":"약","ko":"약","radical":"艸","strokes":19,"stage":"6급Ⅱ","ex":[],"tip":"부수 艸 · 같은 부수 글자: 萬 草 花"},
        {"id":"g6-10-5","text":"業","read":"업 업","hun":"업","eum":"업","ko":"업","radical":"木","strokes":13,"stage":"6급Ⅱ","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"}
      ]
    },
    {
      id: "g6-u11", no: 11, levelId: "g6", levelNo: 11, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "날랠 용 외 4자", goal: "勇 用 運 音 飮",
      items: [
        {"id":"g6-11-1","text":"勇","read":"날랠 용","hun":"날랠","eum":"용","ko":"날랠","radical":"力","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 力 · 같은 부수 글자: 動 功 勝"},
        {"id":"g6-11-2","text":"用","read":"쓸 용","hun":"쓸","eum":"용","ko":"쓸","radical":"用","strokes":5,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-11-3","text":"運","read":"옮길 운","hun":"옮길","eum":"운","ko":"옮길","radical":"辵","strokes":13,"stage":"6급Ⅱ","ex":[],"tip":"부수 辵 · 같은 부수 글자: 道 近 速"},
        {"id":"g6-11-4","text":"音","read":"소리 음","hun":"소리","eum":"음","ko":"소리","radical":"音","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-11-5","text":"飮","read":"마실 음","hun":"마실","eum":"음","ko":"마실","radical":"食","strokes":13,"stage":"6급Ⅱ","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u12", no: 12, levelId: "g6", levelNo: 12, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "뜻 의 외 4자", goal: "意 作 昨 才 戰",
      items: [
        {"id":"g6-12-1","text":"意","read":"뜻 의","hun":"뜻","eum":"의","ko":"뜻","radical":"心","strokes":13,"stage":"6급Ⅱ","ex":[],"tip":"부수 心 · 같은 부수 글자: 急 感 愛"},
        {"id":"g6-12-2","text":"作","read":"지을 작","hun":"지을","eum":"작","ko":"지을","radical":"人","strokes":7,"stage":"6급Ⅱ","ex":[],"tip":"부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g6-12-3","text":"昨","read":"어제 작","hun":"어제","eum":"작","ko":"어제","radical":"日","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":"부수 日 · 같은 부수 글자: 時 春 明"},
        {"id":"g6-12-4","text":"才","read":"재주 재","hun":"재주","eum":"재","ko":"재주","radical":"手","strokes":3,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-12-5","text":"戰","read":"싸움 전","hun":"싸움","eum":"전","ko":"싸움","radical":"戈","strokes":16,"stage":"6급Ⅱ","ex":[],"tip":"부수 戈 · 같은 부수 글자: 成"}
      ]
    },
    {
      id: "g6-u13", no: 13, levelId: "g6", levelNo: 13, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "뜰 정 외 4자", goal: "庭 第 題 注 集",
      items: [
        {"id":"g6-13-1","text":"庭","read":"뜰 정","hun":"뜰","eum":"정","ko":"뜰","radical":"广","strokes":10,"stage":"6급Ⅱ","ex":[],"tip":"부수 广 · 같은 부수 글자: 度"},
        {"id":"g6-13-2","text":"第","read":"차례 제","hun":"차례","eum":"제","ko":"차례","radical":"竹","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 竹 · 같은 부수 글자: 答 算 等"},
        {"id":"g6-13-3","text":"題","read":"제목 제","hun":"제목","eum":"제","ko":"제목","radical":"頁","strokes":18,"stage":"6급Ⅱ","ex":[],"tip":"부수 頁 · 같은 부수 글자: 頭"},
        {"id":"g6-13-4","text":"注","read":"부을 주","hun":"부을","eum":"주","ko":"부을","radical":"水","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g6-13-5","text":"集","read":"모을 집","hun":"모을","eum":"집","ko":"모을","radical":"隹","strokes":12,"stage":"6급Ⅱ","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u14", no: 14, levelId: "g6", levelNo: 14, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "창 창 외 4자", goal: "窓 淸 體 表 風",
      items: [
        {"id":"g6-14-1","text":"窓","read":"창 창","hun":"창","eum":"창","ko":"창","radical":"穴","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 穴 · 같은 부수 글자: 空"},
        {"id":"g6-14-2","text":"淸","read":"맑을 청","hun":"맑을","eum":"청","ko":"맑을","radical":"水","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g6-14-3","text":"體","read":"몸 체","hun":"몸","eum":"체","ko":"몸","radical":"骨","strokes":23,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-14-4","text":"表","read":"겉 표","hun":"겉","eum":"표","ko":"겉","radical":"衣","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-14-5","text":"風","read":"바람 풍","hun":"바람","eum":"풍","ko":"바람","radical":"風","strokes":9,"stage":"6급Ⅱ","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u15", no: 15, levelId: "g6", levelNo: 15, stage: "6급Ⅱ",
      label: "6급", emoji: "🌳", title: "다행 행 외 4자", goal: "幸 現 形 和 會",
      items: [
        {"id":"g6-15-1","text":"幸","read":"다행 행","hun":"다행","eum":"행","ko":"다행","radical":"干","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 干 · 같은 부수 글자: 年 平"},
        {"id":"g6-15-2","text":"現","read":"나타날 현","hun":"나타날","eum":"현","ko":"나타날","radical":"玉","strokes":11,"stage":"6급Ⅱ","ex":[],"tip":"부수 玉 · 같은 부수 글자: 王 球 理"},
        {"id":"g6-15-3","text":"形","read":"모양 형","hun":"모양","eum":"형","ko":"모양","radical":"彡","strokes":7,"stage":"6급Ⅱ","ex":[],"tip":""},
        {"id":"g6-15-4","text":"和","read":"화할 화","hun":"화할","eum":"화","ko":"화할","radical":"口","strokes":8,"stage":"6급Ⅱ","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 同"},
        {"id":"g6-15-5","text":"會","read":"모일 회","hun":"모일","eum":"회","ko":"모일","radical":"曰","strokes":13,"stage":"6급Ⅱ","ex":[],"tip":"부수 曰 · 같은 부수 글자: 書"}
      ]
    },
    {
      id: "g6-u16", no: 16, levelId: "g6", levelNo: 16, stage: "6급",
      label: "6급", emoji: "🌳", title: "느낄 감 외 4자", goal: "感 強 開 京 古",
      items: [
        {"id":"g6-16-1","text":"感","read":"느낄 감","hun":"느낄","eum":"감","ko":"느낄","radical":"心","strokes":13,"stage":"6급","ex":[],"tip":"부수 心 · 같은 부수 글자: 急 意 愛"},
        {"id":"g6-16-2","text":"強","read":"강할 강","hun":"강할","eum":"강","ko":"강할","radical":"弓","strokes":11,"stage":"6급","ex":["강하다","강국","보강"],"tip":"활(弓)을 힘껏 당기는 강한 모양이에요. 부수 弓 · 같은 부수 글자: 弟 弱"},
        {"id":"g6-16-3","text":"開","read":"열 개","hun":"열","eum":"개","ko":"열","radical":"門","strokes":12,"stage":"6급","ex":[],"tip":"부수 門 · 같은 부수 글자: 間"},
        {"id":"g6-16-4","text":"京","read":"서울 경","hun":"서울","eum":"경","ko":"서울","radical":"亠","strokes":8,"stage":"6급","ex":[],"tip":"부수 亠 · 같은 부수 글자: 交"},
        {"id":"g6-16-5","text":"古","read":"예 고","hun":"예","eum":"고","ko":"예","radical":"口","strokes":5,"stage":"6급","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 同"}
      ]
    },
    {
      id: "g6-u17", no: 17, levelId: "g6", levelNo: 17, stage: "6급",
      label: "6급", emoji: "🌳", title: "쓸 고 외 4자", goal: "苦 交 區 郡 根",
      items: [
        {"id":"g6-17-1","text":"苦","read":"쓸 고","hun":"쓸","eum":"고","ko":"쓸","radical":"艸","strokes":9,"stage":"6급","ex":[],"tip":"부수 艸 · 같은 부수 글자: 萬 草 花"},
        {"id":"g6-17-2","text":"交","read":"사귈 교","hun":"사귈","eum":"교","ko":"사귈","radical":"亠","strokes":6,"stage":"6급","ex":[],"tip":"부수 亠 · 같은 부수 글자: 京"},
        {"id":"g6-17-3","text":"區","read":"구분할 구","hun":"구분할","eum":"구","ko":"구분할","radical":"匸","strokes":11,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-17-4","text":"郡","read":"고을 군","hun":"고을","eum":"군","ko":"고을","radical":"邑","strokes":10,"stage":"6급","ex":[],"tip":"부수 邑 · 같은 부수 글자: 部"},
        {"id":"g6-17-5","text":"根","read":"뿌리 근","hun":"뿌리","eum":"근","ko":"뿌리","radical":"木","strokes":10,"stage":"6급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"}
      ]
    },
    {
      id: "g6-u18", no: 18, levelId: "g6", levelNo: 18, stage: "6급",
      label: "6급", emoji: "🌳", title: "가까울 근 외 4자", goal: "近 級 多 待 度",
      items: [
        {"id":"g6-18-1","text":"近","read":"가까울 근","hun":"가까울","eum":"근","ko":"가까울","radical":"辵","strokes":8,"stage":"6급","ex":[],"tip":"부수 辵 · 같은 부수 글자: 道 運 速"},
        {"id":"g6-18-2","text":"級","read":"등급 급","hun":"등급","eum":"급","ko":"등급","radical":"糸","strokes":10,"stage":"6급","ex":[],"tip":"부수 糸 · 같은 부수 글자: 紙 線 綠"},
        {"id":"g6-18-3","text":"多","read":"많을 다","hun":"많을","eum":"다","ko":"많을","radical":"夕","strokes":6,"stage":"6급","ex":[],"tip":"부수 夕 · 같은 부수 글자: 外 夜"},
        {"id":"g6-18-4","text":"待","read":"기다릴 대","hun":"기다릴","eum":"대","ko":"기다릴","radical":"彳","strokes":9,"stage":"6급","ex":[],"tip":"부수 彳 · 같은 부수 글자: 後"},
        {"id":"g6-18-5","text":"度","read":"법도 도","hun":"법도","eum":"도","ko":"법도","radical":"广","strokes":9,"stage":"6급","ex":["온도","제도","정도"],"tip":"법도(度)를 헤아린다는 뜻이에요. 음이 여럿이에요: 도(법도), 탁(헤아릴) 부수 广 · 같은 부수 글자: 庭"}
      ]
    },
    {
      id: "g6-u19", no: 19, levelId: "g6", levelNo: 19, stage: "6급",
      label: "6급", emoji: "🌳", title: "머리 두 외 4자", goal: "頭 例 禮 路 綠",
      items: [
        {"id":"g6-19-1","text":"頭","read":"머리 두","hun":"머리","eum":"두","ko":"머리","radical":"頁","strokes":16,"stage":"6급","ex":[],"tip":"부수 頁 · 같은 부수 글자: 題"},
        {"id":"g6-19-2","text":"例","read":"법식 례","hun":"법식","eum":"례","ko":"법식","radical":"人","strokes":8,"stage":"6급","ex":[],"tip":"부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g6-19-3","text":"禮","read":"예도 례","hun":"예도","eum":"례","ko":"예도","radical":"示","strokes":18,"stage":"6급","ex":[],"tip":"부수 示 · 같은 부수 글자: 祖 社 神"},
        {"id":"g6-19-4","text":"路","read":"길 로","hun":"길","eum":"로","ko":"길","radical":"足","strokes":13,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-19-5","text":"綠","read":"푸를 록","hun":"푸를","eum":"록","ko":"푸를","radical":"糸","strokes":14,"stage":"6급","ex":[],"tip":"부수 糸 · 같은 부수 글자: 紙 線 級"}
      ]
    },
    {
      id: "g6-u20", no: 20, levelId: "g6", levelNo: 20, stage: "6급",
      label: "6급", emoji: "🌳", title: "오얏 리 외 4자", goal: "李 目 美 米 朴",
      items: [
        {"id":"g6-20-1","text":"李","read":"오얏 리","hun":"오얏","eum":"리","ko":"오얏","radical":"木","strokes":7,"stage":"6급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"},
        {"id":"g6-20-2","text":"目","read":"눈 목","hun":"눈","eum":"목","ko":"눈","radical":"目","strokes":5,"stage":"6급","ex":["목표","주목","목록"],"tip":"눈을 옆으로 세운 모양. 부수로 쓰여요. 부수 目 · 같은 부수 글자: 直 省"},
        {"id":"g6-20-3","text":"美","read":"아름다울 미","hun":"아름다울","eum":"미","ko":"아름다울","radical":"羊","strokes":9,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-20-4","text":"米","read":"쌀 미","hun":"쌀","eum":"미","ko":"쌀","radical":"米","strokes":6,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-20-5","text":"朴","read":"성 박","hun":"성","eum":"박","ko":"성","radical":"木","strokes":6,"stage":"6급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"}
      ]
    },
    {
      id: "g6-u21", no: 21, levelId: "g6", levelNo: 21, stage: "6급",
      label: "6급", emoji: "🌳", title: "차례 번 외 4자", goal: "番 別 病 服 本",
      items: [
        {"id":"g6-21-1","text":"番","read":"차례 번","hun":"차례","eum":"번","ko":"차례","radical":"田","strokes":12,"stage":"6급","ex":[],"tip":"부수 田 · 같은 부수 글자: 男 界 由"},
        {"id":"g6-21-2","text":"別","read":"다를 별","hun":"다를","eum":"별","ko":"다를","radical":"刀","strokes":7,"stage":"6급","ex":[],"tip":"부수 刀 · 같은 부수 글자: 前 利 分"},
        {"id":"g6-21-3","text":"病","read":"병 병","hun":"병","eum":"병","ko":"병","radical":"疒","strokes":10,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-21-4","text":"服","read":"옷 복","hun":"옷","eum":"복","ko":"옷","radical":"月","strokes":8,"stage":"6급","ex":[],"tip":"부수 月 · 같은 부수 글자: 有 朝"},
        {"id":"g6-21-5","text":"本","read":"근본 본","hun":"근본","eum":"본","ko":"근본","radical":"木","strokes":5,"stage":"6급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"}
      ]
    },
    {
      id: "g6-u22", no: 22, levelId: "g6", levelNo: 22, stage: "6급",
      label: "6급", emoji: "🌳", title: "하여금 사 외 4자", goal: "使 死 席 石 速",
      items: [
        {"id":"g6-22-1","text":"使","read":"하여금 사","hun":"하여금","eum":"사","ko":"하여금","radical":"人","strokes":8,"stage":"6급","ex":[],"tip":"부수 人 · 같은 부수 글자: 來 住 便"},
        {"id":"g6-22-2","text":"死","read":"죽을 사","hun":"죽을","eum":"사","ko":"죽을","radical":"歹","strokes":6,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-22-3","text":"席","read":"자리 석","hun":"자리","eum":"석","ko":"자리","radical":"巾","strokes":10,"stage":"6급","ex":[],"tip":"부수 巾 · 같은 부수 글자: 市"},
        {"id":"g6-22-4","text":"石","read":"돌 석","hun":"돌","eum":"석","ko":"돌","radical":"石","strokes":5,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-22-5","text":"速","read":"빠를 속","hun":"빠를","eum":"속","ko":"빠를","radical":"辵","strokes":11,"stage":"6급","ex":[],"tip":"부수 辵 · 같은 부수 글자: 道 運 近"}
      ]
    },
    {
      id: "g6-u23", no: 23, levelId: "g6", levelNo: 23, stage: "6급",
      label: "6급", emoji: "🌳", title: "손자 손 외 4자", goal: "孫 樹 習 勝 式",
      items: [
        {"id":"g6-23-1","text":"孫","read":"손자 손","hun":"손자","eum":"손","ko":"손자","radical":"子","strokes":10,"stage":"6급","ex":[],"tip":"부수 子 · 같은 부수 글자: 學 孝 字"},
        {"id":"g6-23-2","text":"樹","read":"나무 수","hun":"나무","eum":"수","ko":"나무","radical":"木","strokes":16,"stage":"6급","ex":[],"tip":"부수 木 · 같은 부수 글자: 校 東 林"},
        {"id":"g6-23-3","text":"習","read":"익힐 습","hun":"익힐","eum":"습","ko":"익힐","radical":"羽","strokes":11,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-23-4","text":"勝","read":"이길 승","hun":"이길","eum":"승","ko":"이길","radical":"力","strokes":12,"stage":"6급","ex":[],"tip":"부수 力 · 같은 부수 글자: 動 功 勇"},
        {"id":"g6-23-5","text":"式","read":"법 식","hun":"법","eum":"식","ko":"법","radical":"弋","strokes":6,"stage":"6급","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u24", no: 24, levelId: "g6", levelNo: 24, stage: "6급",
      label: "6급", emoji: "🌳", title: "잃을 실 외 4자", goal: "失 愛 夜 野 陽",
      items: [
        {"id":"g6-24-1","text":"失","read":"잃을 실","hun":"잃을","eum":"실","ko":"잃을","radical":"大","strokes":5,"stage":"6급","ex":[],"tip":"부수 大 · 같은 부수 글자: 夫 天 太"},
        {"id":"g6-24-2","text":"愛","read":"사랑 애","hun":"사랑","eum":"애","ko":"사랑","radical":"心","strokes":13,"stage":"6급","ex":[],"tip":"부수 心 · 같은 부수 글자: 急 意 感"},
        {"id":"g6-24-3","text":"夜","read":"밤 야","hun":"밤","eum":"야","ko":"밤","radical":"夕","strokes":8,"stage":"6급","ex":[],"tip":"부수 夕 · 같은 부수 글자: 外 多"},
        {"id":"g6-24-4","text":"野","read":"들 야","hun":"들","eum":"야","ko":"들","radical":"里","strokes":11,"stage":"6급","ex":[],"tip":"부수 里 · 같은 부수 글자: 重"},
        {"id":"g6-24-5","text":"陽","read":"볕 양","hun":"볕","eum":"양","ko":"볕","radical":"阜","strokes":12,"stage":"6급","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u25", no: 25, levelId: "g6", levelNo: 25, stage: "6급",
      label: "6급", emoji: "🌳", title: "큰바다 양 외 4자", goal: "洋 言 英 永 溫",
      items: [
        {"id":"g6-25-1","text":"洋","read":"큰바다 양","hun":"큰바다","eum":"양","ko":"큰바다","radical":"水","strokes":9,"stage":"6급","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g6-25-2","text":"言","read":"말씀 언","hun":"말씀","eum":"언","ko":"말씀","radical":"言","strokes":7,"stage":"6급","ex":[],"tip":"부수 言 · 같은 부수 글자: 記 話 語"},
        {"id":"g6-25-3","text":"英","read":"꽃부리 영","hun":"꽃부리","eum":"영","ko":"꽃부리","radical":"艸","strokes":9,"stage":"6급","ex":[],"tip":"부수 艸 · 같은 부수 글자: 萬 草 花"},
        {"id":"g6-25-4","text":"永","read":"길 영","hun":"길","eum":"영","ko":"길","radical":"水","strokes":5,"stage":"6급","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g6-25-5","text":"溫","read":"따뜻할 온","hun":"따뜻할","eum":"온","ko":"따뜻할","radical":"水","strokes":13,"stage":"6급","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"}
      ]
    },
    {
      id: "g6-u26", no: 26, levelId: "g6", levelNo: 26, stage: "6급",
      label: "6급", emoji: "🌳", title: "동산 원 외 4자", goal: "園 遠 由 油 銀",
      items: [
        {"id":"g6-26-1","text":"園","read":"동산 원","hun":"동산","eum":"원","ko":"동산","radical":"囗","strokes":13,"stage":"6급","ex":[],"tip":"부수 囗 · 같은 부수 글자: 國 四 圖"},
        {"id":"g6-26-2","text":"遠","read":"멀 원","hun":"멀","eum":"원","ko":"멀","radical":"辵","strokes":14,"stage":"6급","ex":[],"tip":"부수 辵 · 같은 부수 글자: 道 運 近"},
        {"id":"g6-26-3","text":"由","read":"말미암을 유","hun":"말미암을","eum":"유","ko":"말미암을","radical":"田","strokes":5,"stage":"6급","ex":[],"tip":"부수 田 · 같은 부수 글자: 男 界 番"},
        {"id":"g6-26-4","text":"油","read":"기름 유","hun":"기름","eum":"유","ko":"기름","radical":"水","strokes":8,"stage":"6급","ex":[],"tip":"부수 水 · 같은 부수 글자: 江 漢 海"},
        {"id":"g6-26-5","text":"銀","read":"은 은","hun":"은","eum":"은","ko":"은","radical":"金","strokes":14,"stage":"6급","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u27", no: 27, levelId: "g6", levelNo: 27, stage: "6급",
      label: "6급", emoji: "🌳", title: "의원 의 외 4자", goal: "醫 衣 者 章 在",
      items: [
        {"id":"g6-27-1","text":"醫","read":"의원 의","hun":"의원","eum":"의","ko":"의원","radical":"酉","strokes":18,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-27-2","text":"衣","read":"옷 의","hun":"옷","eum":"의","ko":"옷","radical":"衣","strokes":6,"stage":"6급","ex":["의복","의류","의상"],"tip":"옷깃이 여며진 웃옷 모양이에요. 부수 衣 · 같은 부수 글자: 表"},
        {"id":"g6-27-3","text":"者","read":"놈 자","hun":"놈","eum":"자","ko":"놈","radical":"老","strokes":9,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-27-4","text":"章","read":"글 장","hun":"글","eum":"장","ko":"글","radical":"立","strokes":11,"stage":"6급","ex":[],"tip":"부수 立 · 같은 부수 글자: 童"},
        {"id":"g6-27-5","text":"在","read":"있을 재","hun":"있을","eum":"재","ko":"있을","radical":"土","strokes":6,"stage":"6급","ex":[],"tip":"부수 土 · 같은 부수 글자: 場 地 堂"}
      ]
    },
    {
      id: "g6-u28", no: 28, levelId: "g6", levelNo: 28, stage: "6급",
      label: "6급", emoji: "🌳", title: "정할 정 외 4자", goal: "定 朝 族 晝 親",
      items: [
        {"id":"g6-28-1","text":"定","read":"정할 정","hun":"정할","eum":"정","ko":"정할","radical":"宀","strokes":8,"stage":"6급","ex":[],"tip":"부수 宀 · 같은 부수 글자: 室 家 安"},
        {"id":"g6-28-2","text":"朝","read":"아침 조","hun":"아침","eum":"조","ko":"아침","radical":"月","strokes":12,"stage":"6급","ex":[],"tip":"부수 月 · 같은 부수 글자: 有 服"},
        {"id":"g6-28-3","text":"族","read":"겨레 족","hun":"겨레","eum":"족","ko":"겨레","radical":"方","strokes":11,"stage":"6급","ex":[],"tip":"부수 方 · 같은 부수 글자: 旗"},
        {"id":"g6-28-4","text":"晝","read":"낮 주","hun":"낮","eum":"주","ko":"낮","radical":"日","strokes":11,"stage":"6급","ex":[],"tip":"부수 日 · 같은 부수 글자: 時 春 明"},
        {"id":"g6-28-5","text":"親","read":"친할 친","hun":"친할","eum":"친","ko":"친할","radical":"見","strokes":16,"stage":"6급","ex":[],"tip":""}
      ]
    },
    {
      id: "g6-u29", no: 29, levelId: "g6", levelNo: 29, stage: "6급",
      label: "6급", emoji: "🌳", title: "클 태 외 4자", goal: "太 通 特 合 行",
      items: [
        {"id":"g6-29-1","text":"太","read":"클 태","hun":"클","eum":"태","ko":"클","radical":"大","strokes":4,"stage":"6급","ex":[],"tip":"부수 大 · 같은 부수 글자: 夫 天 失"},
        {"id":"g6-29-2","text":"通","read":"통할 통","hun":"통할","eum":"통","ko":"통할","radical":"辵","strokes":11,"stage":"6급","ex":[],"tip":"부수 辵 · 같은 부수 글자: 道 運 近"},
        {"id":"g6-29-3","text":"特","read":"특별할 특","hun":"특별할","eum":"특","ko":"특별할","radical":"牛","strokes":10,"stage":"6급","ex":[],"tip":"부수 牛 · 같은 부수 글자: 物"},
        {"id":"g6-29-4","text":"合","read":"합할 합","hun":"합할","eum":"합","ko":"합할","radical":"口","strokes":6,"stage":"6급","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 同"},
        {"id":"g6-29-5","text":"行","read":"다닐 행","hun":"다닐","eum":"행","ko":"다닐","radical":"行","strokes":6,"stage":"6급","ex":["여행","은행","행진"],"tip":"네거리에서 사람이 다니는 모양이에요. 음이 여럿이에요: 행(다닐), 항(항렬) 부수 行 · 같은 부수 글자: 術"}
      ]
    },
    {
      id: "g6-u30", no: 30, levelId: "g6", levelNo: 30, stage: "6급",
      label: "6급", emoji: "🌳", title: "향할 향 외 4자", goal: "向 號 畫 黃 訓",
      items: [
        {"id":"g6-30-1","text":"向","read":"향할 향","hun":"향할","eum":"향","ko":"향할","radical":"口","strokes":6,"stage":"6급","ex":[],"tip":"부수 口 · 같은 부수 글자: 名 右 同"},
        {"id":"g6-30-2","text":"號","read":"이름 호","hun":"이름","eum":"호","ko":"이름","radical":"虍","strokes":13,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-30-3","text":"畫","read":"그림 화","hun":"그림","eum":"화","ko":"그림","radical":"田","strokes":12,"stage":"6급","ex":[],"tip":"음이 여럿이에요: 화(그림), 획(그을) 부수 田 · 같은 부수 글자: 男 界 番"},
        {"id":"g6-30-4","text":"黃","read":"누를 황","hun":"누를","eum":"황","ko":"누를","radical":"黃","strokes":12,"stage":"6급","ex":[],"tip":""},
        {"id":"g6-30-5","text":"訓","read":"가르칠 훈","hun":"가르칠","eum":"훈","ko":"가르칠","radical":"言","strokes":10,"stage":"6급","ex":[],"tip":"부수 言 · 같은 부수 글자: 記 話 語"}
      ]
    },
    {
      id: "words-u1", no: 1, levelId: "words", levelNo: 1, stage: "보너스",
      label: "낱말", emoji: "🔤", title: "두 글자 낱말 1", goal: "두 글자로 된 한자어를 익혀요",
      items: [
        {"id":"words-1-1","text":"學校","read":"학교","hun":"배움터","eum":"학교","ko":"배우는 곳","radical":"學","strokes":26,"stage":"보너스","ex":["학교","초등학교","학교생활"],"tip":"學(배울 학) + 校(학교 교). 배우는 집이에요."},
        {"id":"words-1-2","text":"工夫","read":"공부","hun":"배움을 익힘","eum":"공부","ko":"배우고 익힘","radical":"工","strokes":7,"stage":"보너스","ex":["공부","공부방","한자공부"],"tip":"工(장인 공) + 夫(사내 부). 애써 익힌다는 뜻이에요."},
        {"id":"words-1-3","text":"父母","read":"부모","hun":"아버지와 어머니","eum":"부모","ko":"아버지와 어머니","radical":"父","strokes":9,"stage":"보너스","ex":["부모","부모님","부모사랑"],"tip":"父(아비 부) + 母(어미 모)."},
        {"id":"words-1-4","text":"兄弟","read":"형제","hun":"형과 아우","eum":"형제","ko":"형과 아우","radical":"兄","strokes":12,"stage":"보너스","ex":["형제","형제자매","삼형제"],"tip":"兄(형 형) + 弟(아우 제)."},
        {"id":"words-1-5","text":"山川","read":"산천","hun":"산과 내","eum":"산천","ko":"산과 내","radical":"山","strokes":6,"stage":"보너스","ex":["산천","산천어","명산대천"],"tip":"山(뫼 산) + 川(내 천). 자연을 뜻해요."}
      ]
    },
    {
      id: "words-u2", no: 2, levelId: "words", levelNo: 2, stage: "보너스",
      label: "낱말", emoji: "✏️", title: "두 글자 낱말 2", goal: "생활에서 자주 쓰는 한자어를 익혀요",
      items: [
        {"id":"words-2-1","text":"韓國","read":"한국","hun":"우리나라","eum":"한국","ko":"우리나라","radical":"韓","strokes":28,"stage":"보너스","ex":["한국","한국어","대한민국"],"tip":"韓(나라 한) + 國(나라 국)."},
        {"id":"words-2-2","text":"人生","read":"인생","hun":"사람이 사는 삶","eum":"인생","ko":"삶","radical":"人","strokes":7,"stage":"보너스","ex":["인생","인생길","인생의"],"tip":"人(사람 인) + 生(날 생). 사람이 사는 동안이에요."},
        {"id":"words-2-3","text":"時間","read":"시간","hun":"때와 사이","eum":"시간","ko":"때","radical":"時","strokes":22,"stage":"보너스","ex":["시간","시간표","약속시간"],"tip":"時(때 시) + 間(사이 간)."},
        {"id":"words-2-4","text":"世上","read":"세상","hun":"사람이 사는 곳","eum":"세상","ko":"세상","radical":"世","strokes":8,"stage":"보너스","ex":["세상","세상사","온세상"],"tip":"世(인간 세) + 上(위 상). 사람이 사는 곳이에요."},
        {"id":"words-2-5","text":"人口","read":"인구","hun":"사람 수","eum":"인구","ko":"사람 수","radical":"人","strokes":5,"stage":"보너스","ex":["인구","인구수","총인구"],"tip":"人(사람 인) + 口(입 구). 사람의 수를 뜻해요."}
      ]
    },
    {
      id: "words-u3", no: 3, levelId: "words", levelNo: 3, stage: "보너스",
      label: "낱말", emoji: "📜", title: "사자성어", goal: "뜻이 깊은 사자성어를 익혀요",
      items: [
        {"id":"words-3-1","text":"一石二鳥","read":"일석이조","hun":"돌 하나로 새 두 마리","eum":"일석이조","ko":"한 번에 두 가지 이득","radical":"一","strokes":19,"stage":"보너스","ex":["일석이조","일석이조로","일석이조의 지혜"],"tip":"一(한 일) 石(돌 석) 二(두 이) 鳥(새 조)."},
        {"id":"words-3-2","text":"七顚八起","read":"칠전팔기","hun":"일곱 번 넘어져도 여덟 번 일어남","eum":"칠전팔기","ko":"거듭 실패해도 다시 일어남","radical":"七","strokes":33,"stage":"보너스","ex":["칠전팔기","칠전팔기 정신"],"tip":"七(일곱 칠) 顚(넘어질 전) 八(여덟 팔) 起(일어날 기)."},
        {"id":"words-3-3","text":"大器晩成","read":"대기만성","hun":"큰 그릇은 늦게 이뤄짐","eum":"대기만성","ko":"큰 인물은 늦게 완성됨","radical":"大","strokes":37,"stage":"보너스","ex":["대기만성","대기만성형"],"tip":"大(큰 대) 器(그릇 기) 晩(늦을 만) 成(이룰 성)."},
        {"id":"words-3-4","text":"畫龍點睛","read":"화룡점정","hun":"용을 그리고 눈동자를 찍음","eum":"화룡정정","ko":"가장 중요한 마무리","radical":"畫","strokes":58,"stage":"보너스","ex":["화룡점정","화룡점정이다"],"tip":"畫(그림 화) 龍(용 룡) 點(점 점) 睛(눈동자 정)."},
        {"id":"words-3-5","text":"堂堂正正","read":"당당정정","hun":"당당하고 바름","eum":"당당정정","ko":"떳떳하고 바른 모습","radical":"堂","strokes":32,"stage":"보너스","ex":["당당정정","당당정정하게"],"tip":"堂(집 당) 堂(집 당) 正(바를 정) 正(바를 정)."}
      ]
    }
  ];

  global.APP_DATA = {
    mode: "hanja",
    name: "킹한자",
    mark: "漢",
    storageKey: "kinglingo.hanja.v2",
    defaultGoal: "g6",
    levels: LEVELS,
    tabs: [
      { id: "today", label: "오늘", icon: "home" },
      { id: "levels", label: "급수", icon: "steps" },
      { id: "write", label: "따라 쓰기", icon: "pen" },
      { id: "cards", label: "카드", icon: "cards" },
      { id: "quiz", label: "퀴즈", icon: "quiz" }
    ],
    courses: [
      {
        code: "hanja", name: "한자", native: "漢字", locale: "ko-KR", flag: "漢",
        rate: { normal: 0.8, slow: 0.55 },
        writingGoal: "한자를 손으로 따라 쓰며 획과 모양을 익혀요",
        units: UNITS
      }
    ],
    otherApps: [
      { name: "킹링고", desc: "영어 · 중국어 · 일본어", href: "../" },
      { name: "킹링고 입문", desc: "러시아어 · 스페인어 · 베트남어", href: "../beginner/" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
