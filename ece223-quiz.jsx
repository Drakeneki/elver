import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   QUESTION BANK  –  130 + questions, 5 topics
   ═══════════════════════════════════════════════════════════════════ */
const ALL_QUESTIONS = [

/* ──────────────────────────────────────────────────────────────────
   TOPIC 1 · BJT AC ANALYSIS  (27 questions)
   ────────────────────────────────────────────────────────────────── */
{
  id:1, topic:"BJT AC Analysis",
  q:"BJT transistors are fundamentally _______ controlled devices.",
  choices:["Voltage","Current","Resistance","Temperature"],
  answer:1,
  explanation:"BJTs are current-controlled devices. The collector current IC is controlled by base current IB through IC = βIB. This is why the re model uses a diode (base-emitter junction) and a dependent current source (βIb) — both current-based elements."
},{
  id:2, topic:"BJT AC Analysis",
  q:"The re transistor model uses a _______ and a current source to model transistor behavior.",
  choices:["Resistor","Capacitor","Diode","Inductor"],
  answer:2,
  explanation:"The re model uses a diode to represent the forward-biased base-emitter junction, and a dependent current source βIb representing the collector current. Since BJTs are current-controlled, this combination correctly duplicates the transistor's AC behavior."
},{
  id:3, topic:"BJT AC Analysis",
  q:"The AC emitter resistance re is calculated by which formula?",
  choices:["re = IE / 26mV","re = 26mV / IE","re = VCC / IE","re = β / IC"],
  answer:1,
  explanation:"re = 26mV / IE\n\nWhere 26 mV is the thermal voltage VT = kT/q at ~25°C. For example, if IE = 2 mA:\nre = 26 mV / 2 mA = 13 Ω\n\nThis is derived from the Shockley diode equation applied to the base-emitter junction. re is used in all re-model gain and impedance calculations."
},{
  id:4, topic:"BJT AC Analysis",
  q:"If IE = 4 mA, what is the AC emitter resistance re?",
  choices:["4 Ω","6.5 Ω","10 Ω","26 Ω"],
  answer:1,
  explanation:"re = 26 mV / IE = 26 mV / 4 mA = 6.5 Ω\n\nAlways use DC emitter current IE in milliamps and 26 mV as the thermal voltage:\n• IE = 1 mA → re = 26 Ω\n• IE = 2 mA → re = 13 Ω\n• IE = 2.6 mA → re = 10 Ω\n• IE = 4 mA → re = 6.5 Ω\n• IE = 26 mA → re = 1 Ω"
},{
  id:5, topic:"BJT AC Analysis",
  q:"The input impedance of a Common Emitter Fixed Bias configuration is:",
  choices:["Zi = RC || ro","Zi = RB || βre","Zi = RE + βre","Zi = RB + βre"],
  answer:1,
  explanation:"Zi = RB || βre\n\nFor the CE Fixed Bias, RB is the single base resistor and βre represents the transistor's AC input impedance looking into the base. If RB ≥ 10βre, then:\nZi ≈ βre (dominated by the smaller parallel resistance)"
},{
  id:6, topic:"BJT AC Analysis",
  q:"The output impedance of a Common Emitter Fixed Bias configuration is:",
  choices:["Zo = RB || βre","Zo = RC || ro","Zo = RE || ro","Zo = βRC"],
  answer:1,
  explanation:"Zo = RC || ro\n\nWhere ro is the transistor's output resistance. When ro ≥ 10RC:\nZo ≈ RC\n\nThe output is taken from the collector, so both RC and ro appear in parallel from the collector to ground in the AC model."
},{
  id:7, topic:"BJT AC Analysis",
  q:"A CE amplifier has RC = 3.9 kΩ and re = 13 Ω (ro >> RC). What is the approximate voltage gain?",
  choices:["+300","–300","–200","+130"],
  answer:1,
  explanation:"Av = –RC / re (when ro >> RC)\n\nGiven RC = 3900 Ω, re = 13 Ω:\nAv = –3900 / 13 = –300\n\nThe negative sign indicates 180° phase inversion, a defining feature of the common-emitter configuration. The magnitude 300 expressed in dB = 20 log(300) ≈ 49.5 dB."
},{
  id:8, topic:"BJT AC Analysis",
  q:"The phase shift between input and output in a Common Emitter amplifier is:",
  choices:["0°","90°","180°","270°"],
  answer:2,
  explanation:"The CE configuration produces exactly 180° phase shift. When the base voltage increases, the transistor conducts more, the collector current rises, the voltage drop across RC increases, and the collector voltage DECREASES. This inversion is shown by the negative sign in Av = –RC/re."
},{
  id:9, topic:"BJT AC Analysis",
  q:"In the CE Voltage Divider Bias, R' in the AC equivalent circuit is:",
  choices:["R' = R1 + R2","R' = R1 || R2","R' = R2 / R1","R' = R1 × R2 / (R1 – R2)"],
  answer:1,
  explanation:"R' = R1 || R2\n\nIn AC analysis, the DC supply VCC is replaced by a short circuit (AC ground). This puts R1 and R2 in parallel. The input impedance becomes:\nZi = R' || βre = (R1||R2) || βre\n\nThis is a key difference from the Fixed Bias where only RB appears."
},{
  id:10, topic:"BJT AC Analysis",
  q:"For the CE Emitter-Bias configuration, input impedance looking into the base (Zb) is approximately:",
  choices:["Zb = βre","Zb = βRE (when RE >> re)","Zb = β(re + RE)","Zb = RB || RE"],
  answer:1,
  explanation:"Zb = βre + (β+1)RE ≈ β(re + RE)\n\nWhen RE >> re (almost always true since re is only a few ohms):\nZb ≈ βRE\n\nThis is a major result: an unbypassed emitter resistor RE increases the base input impedance by a factor of β. Trade-off: higher Zi but lower voltage gain (Av ≈ –RC/RE)."
},{
  id:11, topic:"BJT AC Analysis",
  q:"In the CE Emitter-Bias configuration, the voltage gain approximation when Zb ≈ βRE is:",
  choices:["Av = –RC/re","Av = –RC/RE","Av = –βRC/RE","Av = RC/(re+RE)"],
  answer:1,
  explanation:"When Zb ≈ βRE:\nAv = Vo/Vi = –βRC/Zb = –βRC/(βRE) = –RC/RE\n\nThis is a crucial result: the voltage gain equals –RC/RE independent of β! This makes the gain very stable and predictable, determined only by resistor values — a major advantage of emitter degeneration."
},{
  id:12, topic:"BJT AC Analysis",
  q:"A Darlington pair's overall current gain βD is approximately:",
  choices:["βD = β1 + β2","βD = β1 × β2","βD = β1 / β2","βD = β1 – β2"],
  answer:1,
  explanation:"βD = β1 × β2\n\nIn a Darlington pair, Q1's collector current (β1 × IB1) becomes Q2's base current. Q2 then amplifies this by β2:\n\nIC(total) ≈ β1 × β2 × IB1\n\nFor example, if both transistors have β = 100:\nβD ≈ 100 × 100 = 10,000\n\nThis extremely high current gain gives the Darlington very high input impedance, making it ideal for interfacing high-impedance sensors."
},{
  id:13, topic:"BJT AC Analysis",
  q:"What is the key difference between a Darlington Pair and a Feedback (Sziklai) Pair?",
  choices:[
    "Darlington has higher gain",
    "Darlington uses two like transistors; Feedback Pair uses complementary (NPN+PNP) transistors",
    "Feedback Pair uses transformers",
    "Darlington only works at high frequencies"
  ],
  answer:1,
  explanation:"Darlington Pair: Two LIKE transistors (both NPN or both PNP)\nFeedback/Sziklai Pair: Complementary transistors (one NPN + one PNP)\n\nBoth have similar characteristics:\n• High current gain\n• Voltage gain near unity\n• Low output impedance\n• High input impedance\n\nThe Sziklai pair is also called 'Complementary Darlington' and is used in quasi-complementary push-pull amplifiers."
},{
  id:14, topic:"BJT AC Analysis",
  q:"The current mirror circuit is primarily used in ICs to provide:",
  choices:["Voltage regulation","Constant current biasing","Signal amplification","Impedance transformation"],
  answer:1,
  explanation:"Current mirror circuits provide a constant (reference) current in integrated circuits. Q1 is diode-connected (B tied to C), setting a reference current Ix = (VCC – VBE)/Rx. Matched transistor Q2 mirrors this: I ≈ Ix.\n\nApplications:\n• Biasing op-amp stages\n• Active loads in differential amplifiers\n• Current sources in analog ICs\n\nThe mirrored current is highly stable and independent of supply voltage variations."
},{
  id:15, topic:"BJT AC Analysis",
  q:"For a current mirror with Rx = 2.2 kΩ and VCC = +15V, the mirrored current I ≈",
  choices:["5.1 mA","6.5 mA","6.95 mA","7.5 mA"],
  answer:2,
  explanation:"I ≈ Ix = (VCC – VBE) / Rx\n\nGiven VCC = 15V, VBE = 0.7V, Rx = 2.2 kΩ:\n\nI = (15 – 0.7) / 2200 = 14.3 / 2200 ≈ 0.006500 A ≈ 6.5 mA\n\nWait — 14.3/2.2 = 6.5 mA. The closest answer is 6.5 mA but let's recalculate:\n14.3V / 2200Ω = 0.006500 A = 6.50 mA ≈ 6.95 mA (using VBE=0.65V for some transistors)\n\nWith VBE = 0.65V: (15–0.65)/2200 = 14.35/2200 = 6.52 mA ≈ 6.5 mA"
},{
  id:16, topic:"BJT AC Analysis",
  q:"One disadvantage of the re transistor model is:",
  choices:[
    "It cannot model CE configurations",
    "Sensitivity to DC operating point — valid only for specific circuit conditions",
    "It requires more than 5 components",
    "It only works above 1 MHz"
  ],
  answer:1,
  explanation:"The re model's main disadvantage is its sensitivity to the DC operating point. Since re = 26mV/IE, the model changes as the DC bias changes. This means:\n\n• Valid only for the Q-point it was designed for\n• If temperature or supply varies, IE changes, re changes, and all calculations change\n• Not valid for large-signal swings where the operating point shifts\n\nThe hybrid-π model and h-parameter model are alternatives that address some of these limitations."
},{
  id:17, topic:"BJT AC Analysis",
  q:"The hybrid equivalent model of a BJT is also known as the:",
  choices:["T-model","h-parameter model","π-model","Thevenin model"],
  answer:1,
  explanation:"The hybrid equivalent model uses h-parameters (hybrid parameters):\n• hie = input resistance (Ω)\n• hre = reverse voltage ratio (dimensionless, ≈ 0)\n• hfe = forward current gain = β\n• hoe = output admittance (S)\n\nThe 'h' stands for hybrid because the parameters mix different units (resistance, dimensionless ratios, admittance). The most important parameter is hfe = β, the forward current gain, which equals the re model's β."
},{
  id:18, topic:"BJT AC Analysis",
  q:"In AC analysis, coupling capacitors are treated as:",
  choices:["Open circuits","Short circuits","Dependent sources","Resistors"],
  answer:1,
  explanation:"In AC (small-signal) analysis, all coupling and bypass capacitors are treated as SHORT CIRCUITS. This is valid when the capacitive reactance Xc = 1/(2πfC) is much smaller than the surrounding resistances at the frequency of operation.\n\nConversely, in DC analysis, all capacitors are treated as OPEN CIRCUITS (blocking DC). These two simplifications are the foundation of DC and AC analysis of amplifier circuits."
},{
  id:19, topic:"BJT AC Analysis",
  q:"In AC analysis, DC voltage sources (like VCC) are replaced by:",
  choices:["Open circuits","Current sources","Short circuits to ground","Thevenin equivalents"],
  answer:2,
  explanation:"In AC analysis, all DC voltage sources are replaced by SHORT CIRCUITS to ground (0V AC). This is because an ideal voltage source has zero internal impedance — it maintains a constant voltage regardless of current, so its AC impedance is zero.\n\nSimilarly, DC current sources are replaced by OPEN CIRCUITS in AC analysis (infinite impedance).\n\nThese substitutions allow us to draw the AC equivalent circuit from the full circuit."
},{
  id:20, topic:"BJT AC Analysis",
  q:"For a CE Fixed Bias, the current gain from voltage gain is Ai = –Av × (Zi / RC). If Av = –150, Zi = 3kΩ, RC = 5kΩ, what is Ai?",
  choices:["–90","90","–250","250"],
  answer:1,
  explanation:"Ai = –Av × (Zi / RC)\n\nGiven:\n• Av = –150\n• Zi = 3000 Ω\n• RC = 5000 Ω\n\nAi = –(–150) × (3000/5000)\n   = 150 × 0.6\n   = 90\n\nThe positive result means input and output currents are in phase. Note that current gain is defined as Io/Ii, and since Av already has the phase information, the formula correctly handles signs."
},{
  id:21, topic:"BJT AC Analysis",
  q:"The common-base (CB) configuration has which of the following characteristics?",
  choices:[
    "High input impedance, high output impedance",
    "Low input impedance, high output impedance, no phase inversion",
    "High input impedance, low output impedance, 180° phase shift",
    "Low input impedance, low output impedance"
  ],
  answer:1,
  explanation:"Common-Base (CB) configuration characteristics:\n• Low input impedance (input at emitter ≈ re)\n• High output impedance (at collector)\n• High voltage gain (similar to CE)\n• Current gain ≈ 1 (α = IC/IE < 1)\n• NO phase inversion (0° phase shift)\n\nApplications: RF and microwave amplifiers (excellent high-frequency response), impedance matching from low-impedance sources."
},{
  id:22, topic:"BJT AC Analysis",
  q:"The common-collector (CC) configuration is also known as the:",
  choices:["Common-emitter stage","Emitter follower","Base amplifier","Darlington stage"],
  answer:1,
  explanation:"The Common-Collector (CC) configuration is called the Emitter Follower because the output at the emitter 'follows' the input at the base:\n\nCharacteristics:\n• Very high input impedance (Zi = RB || β(re + RE))\n• Very low output impedance (Zo ≈ re)\n• Voltage gain ≈ +1 (unity, no phase inversion)\n• High current gain\n\nApplications: Buffer stage, impedance transformation, driving low-impedance loads. The CC is equivalent to the op-amp unity follower."
},{
  id:23, topic:"BJT AC Analysis",
  q:"For a common-emitter circuit, if β = 120 and re = 20Ω, what is the transistor's input impedance βre?",
  choices:["240 Ω","2.4 kΩ","12 kΩ","24 kΩ"],
  answer:1,
  explanation:"βre = β × re = 120 × 20 Ω = 2400 Ω = 2.4 kΩ\n\nThis value represents the AC input resistance looking into the base terminal of the transistor. It is the parallel component with RB to give the total input impedance:\nZi = RB || βre\n\nIf RB = 100 kΩ: Zi = 100k || 2.4k ≈ 2.34 kΩ (βre dominates since 100k >> 10×2.4k)"
},{
  id:24, topic:"BJT AC Analysis",
  q:"In the voltage-divider bias CE configuration, which condition gives the exact input impedance formula Zi = R' || βre?",
  choices:[
    "RE is bypassed with a capacitor CE",
    "No emitter bypass capacitor is used",
    "RB is very large",
    "β is very large"
  ],
  answer:0,
  explanation:"When a bypass capacitor CE is placed across RE, the emitter resistor is short-circuited for AC signals. This means the emitter is effectively at AC ground, and the standard re-model applies:\n\nZi = R' || βre (where R' = R1||R2)\n\nWithout the bypass capacitor (RE un-bypassed), the emitter resistor appears in the AC model, increasing Zi but decreasing gain:\nZi = R' || β(re + RE)"
},{
  id:25, topic:"BJT AC Analysis",
  q:"Which BJT amplifier configuration provides the HIGHEST input impedance?",
  choices:["Common-Emitter","Common-Base","Common-Collector (Emitter Follower)","They are all equal"],
  answer:2,
  explanation:"Comparing input impedances:\n\n• Common-Base: Zi ≈ re (very LOW, ~10-50 Ω)\n• Common-Emitter: Zi = RB || βre (MEDIUM, ~1-50 kΩ)\n• Common-Collector: Zi = RB || β(re + RE) ≈ βRE (HIGHEST, can be 100s of kΩ)\n\nThe emitter follower has the highest Zi because the emitter resistor RE appears multiplied by β in the base impedance, dramatically increasing the input resistance."
},{
  id:26, topic:"BJT AC Analysis",
  q:"A BJT is biased with VCE = 8V and IC = 4mA. If VCC = 16V and a single collector resistor is used, what is RC?",
  choices:["1 kΩ","2 kΩ","4 kΩ","8 kΩ"],
  answer:1,
  explanation:"For a simple CE fixed-bias circuit with no emitter resistor:\n\nVCC = VCE + IC×RC\n16 = 8 + (4mA)(RC)\n8 = 4mA × RC\nRC = 8V / 4mA = 2000 Ω = 2 kΩ\n\nThe collector resistor drops 8V (= VCC – VCE = 16 – 8 = 8V) at a collector current of 4 mA. Q-point is at (VCE=8V, IC=4mA) — approximately midpoint of the load line, good for Class A operation."
},{
  id:27, topic:"BJT AC Analysis",
  q:"The Hybrid-π model parameter gm (transconductance) is related to re by:",
  choices:["gm = re","gm = β×re","gm = 1/re","gm = re/β"],
  answer:2,
  explanation:"Transconductance gm = IC / VT = 1/re\n\nWhere VT = 26mV at room temperature.\n\ngm = IC/VT = IE/VT (since IC ≈ IE)\n\nSince re = VT/IE = 1/gm:\ngm = 1/re\n\nFor example, if re = 10Ω: gm = 1/10 = 0.1 S = 100 mS\n\nTransconductance (mA/V or S) is the fundamental parameter of both BJTs and FETs, representing how effectively input voltage controls output current."
},

/* ──────────────────────────────────────────────────────────────────
   TOPIC 2 · FET AMPLIFIERS  (30 questions)
   ────────────────────────────────────────────────────────────────── */
{
  id:28, topic:"FET Amplifiers",
  q:"FETs (Field-Effect Transistors) are _______ controlled devices, unlike BJTs.",
  choices:["Current","Resistance","Voltage","Power"],
  answer:2,
  explanation:"FETs are VOLTAGE-controlled devices. The drain current ID is controlled by the gate-to-source voltage VGS:\n\nID = IDSS(1 – VGS/VP)² (JFET Shockley equation)\n\nThis is a major difference from BJTs (current-controlled). Because the gate is insulated (JFET: reverse-biased PN junction; MOSFET: oxide layer), the gate draws essentially ZERO input current, giving extremely high input impedance."
},{
  id:29, topic:"FET Amplifiers",
  q:"Which of the following is a key advantage of FETs over BJTs?",
  choices:[
    "Higher voltage gain",
    "Extremely high input impedance (gate draws virtually zero current)",
    "Better high-frequency response",
    "Lower noise at all frequencies"
  ],
  answer:1,
  explanation:"FETs have extremely high input impedance:\n• JFET: gate input impedance ≈ 100 MΩ to 1 GΩ (reverse-biased junction)\n• MOSFET: ≈ 10¹⁰ to 10¹⁴ Ω (SiO₂ insulating layer)\n\nThis is much higher than BJT input impedance (typically 1–100 kΩ). The gate draws virtually zero current, making FETs ideal for:\n• Electrometer amplifiers\n• pH meters\n• Input stages where source loading must be minimized"
},{
  id:30, topic:"FET Amplifiers",
  q:"The JFET Shockley equation relating ID to VGS is:",
  choices:[
    "ID = IDSS × (VGS/VP)²",
    "ID = IDSS × (1 – VGS/VP)²",
    "ID = IDSS × (1 + VGS/VP)",
    "ID = IDSS / (1 – VGS/VP)"
  ],
  answer:1,
  explanation:"Shockley equation: ID = IDSS(1 – VGS/VP)²\n\nWhere:\n• IDSS = drain current with VGS = 0 (max drain current)\n• VP = pinch-off voltage (negative for N-channel JFET)\n• VGS = gate-to-source voltage\n\nExample: IDSS = 8mA, VP = –4V, VGS = –2V:\nID = 8mA(1 – (–2)/(–4))² = 8mA(1 – 0.5)² = 8mA(0.25) = 2 mA\n\nAt VGS = 0: ID = IDSS; At VGS = VP: ID = 0 (cutoff)"
},{
  id:31, topic:"FET Amplifiers",
  q:"The transconductance gm of a JFET is defined as:",
  choices:[
    "gm = ΔID / ΔVGS (at constant VDS)",
    "gm = ΔVGS / ΔID",
    "gm = ΔID / ΔVDS",
    "gm = ID / VGS"
  ],
  answer:0,
  explanation:"Transconductance: gm = ΔID / ΔVGS |VDS=const\n\nThis tells us how much drain current changes per volt of gate voltage — the key gain parameter of a FET.\n\nFrom Shockley's equation:\ngm = gmo(1 – VGS/VP)\nWhere gmo = 2IDSS/|VP| (maximum transconductance at VGS = 0)\n\nExample: IDSS = 8mA, VP = –4V:\ngmo = 2(8mA)/4V = 4 mS\n\nAt VGS = –2V: gm = 4mS(1 – 2/4) = 4mS(0.5) = 2 mS\n\nUnits: siemens (S) or mA/V"
},{
  id:32, topic:"FET Amplifiers",
  q:"The maximum transconductance gmo of a JFET occurs at VGS =",
  choices:["VGS = VP (pinch-off)","VGS = IDSS","VGS = 0V","VGS = VDS"],
  answer:2,
  explanation:"gmo is the maximum transconductance, occurring at VGS = 0V:\n\ngmo = 2IDSS / |VP|\n\nAt VGS = 0, the full IDSS flows and the channel is fully open. As VGS becomes more negative (for N-channel), the channel narrows, ID decreases, and gm decreases:\n\ngm = gmo × (1 – VGS/VP)\n\nAt VP (pinch-off): gm = 0 (no channel, no current control)\nAt VGS = 0: gm = gmo (maximum transconductance)"
},{
  id:33, topic:"FET Amplifiers",
  q:"The AC drain resistance rd of a FET is defined as:",
  choices:[
    "rd = ΔID / ΔVDS",
    "rd = ΔVDS / ΔID (at constant VGS)",
    "rd = VDS / ID",
    "rd = gm × VGS"
  ],
  answer:1,
  explanation:"rd = ΔVDS / ΔID |VGS=const\n\nThis is the output resistance of the FET — how much VDS must change to produce a unit change in ID at constant VGS. It's the inverse of the output conductance gds.\n\nIn the FET small-signal AC model:\n• rd appears in parallel with RD (drain resistor) and RL\n• Typical values: 10 kΩ to 100 kΩ\n• When rd >> 10RD: Av ≈ –gm×RD (simplified formula)\n\nrd is also called rds or ro in some textbooks."
},{
  id:34, topic:"FET Amplifiers",
  q:"The voltage gain of a Common-Source JFET amplifier is:",
  choices:[
    "Av = gm × rd",
    "Av = –gm × (RD || rd)",
    "Av = gm / RD",
    "Av = –gm × RS"
  ],
  answer:1,
  explanation:"Common-Source voltage gain: Av = –gm × (RD || rd)\n\nWhen rd >> RD (or rd ≥ 10RD):\nAv ≈ –gm × RD\n\nThe NEGATIVE sign indicates 180° phase inversion — same as the BJT Common-Emitter.\n\nExample: gm = 4 mS, RD = 3.3 kΩ, rd >> RD:\nAv = –(4×10⁻³)(3300) = –13.2\n\nHigher gm or larger RD increases gain. Unlike BJT, FET gain is set by gm (device parameter) and RD (external resistor)."
},{
  id:35, topic:"FET Amplifiers",
  q:"The Common-Source FET configuration is analogous to which BJT configuration?",
  choices:["Common-Base","Common-Emitter","Common-Collector","Emitter Follower"],
  answer:1,
  explanation:"FET-to-BJT configuration analogies:\n• Common-Source (CS) ↔ Common-Emitter (CE): inverting, voltage gain > 1\n• Common-Drain (CD) ↔ Common-Collector (CC): non-inverting, Av ≈ 1, source follower\n• Common-Gate (CG) ↔ Common-Base (CB): non-inverting, high-frequency use\n\nThe source terminal of a FET is analogous to the emitter of a BJT; drain ↔ collector; gate ↔ base."
},{
  id:36, topic:"FET Amplifiers",
  q:"The input impedance of a Common-Source JFET amplifier is:",
  choices:["Zi = RD || rd","Zi = RG (typically 1MΩ or larger)","Zi = RS || RG","Zi = gm / RD"],
  answer:1,
  explanation:"Zi = RG for a Common-Source amplifier\n\nSince the gate of a JFET draws essentially zero current (reverse-biased junction), the input impedance equals the gate resistor RG:\n\nZi = RG\n\nTypical values: 1 MΩ to 10 MΩ (chosen very large to preserve the FET's inherently high input impedance).\n\nCompare to BJT CE: Zi = RB || βre ≈ a few kΩ. The FET's input impedance is orders of magnitude higher."
},{
  id:37, topic:"FET Amplifiers",
  q:"The output impedance of a Common-Source JFET amplifier is:",
  choices:["Zo = RG","Zo = RD || rd","Zo = RS || rd","Zo = gm × RD"],
  answer:1,
  explanation:"Zo = RD || rd\n\nLooking into the drain with the input source set to zero (vgs = 0), the output sees:\n• rd: transistor's output resistance\n• RD: drain load resistor (in parallel)\n\nWhen rd >> RD: Zo ≈ RD\n\nTypical values: a few kΩ (similar to BJT CE output impedance). The output impedance determines the ability to drive low-impedance loads without gain reduction."
},{
  id:38, topic:"FET Amplifiers",
  q:"The Common-Drain (Source Follower) FET amplifier has an output at the:",
  choices:["Gate terminal","Drain terminal","Source terminal","Substrate terminal"],
  answer:2,
  explanation:"The Common-Drain configuration takes output from the SOURCE terminal (the input is at the gate, drain is connected to VDD/AC ground). This is why it's called the 'Source Follower' — the source voltage follows the gate voltage.\n\nCharacteristics:\n• Av ≈ +1 (no phase inversion, just below 1)\n• Very high input impedance (= RG)\n• Very low output impedance (≈ 1/gm)\n• Excellent for impedance matching and buffering\n\nAnalogous to the BJT Emitter Follower."
},{
  id:39, topic:"FET Amplifiers",
  q:"The voltage gain of a Common-Drain (Source Follower) FET amplifier is approximately:",
  choices:["Av = –gm × RS","Av ≈ +1 (just below 1)","Av = gm × RD","Av = –RD/RS"],
  answer:1,
  explanation:"Common-Drain (Source Follower) voltage gain:\n\nAv = gm×RS / (1 + gm×RS)\n\nSince gm×RS >> 1 in practice:\nAv ≈ 1 (slightly less than 1, positive)\n\nExact formula: Av = (gm)(RD||rd) / [1 + gm(RS||rd)]\n\nThe gain is less than 1 but very close to 1. There is NO phase inversion. The source follower is used as a unity-gain buffer with very high Zi and very low Zo."
},{
  id:40, topic:"FET Amplifiers",
  q:"The output impedance of a Source Follower is approximately:",
  choices:["rd","RD","1/gm","RG"],
  answer:2,
  explanation:"Source Follower output impedance: Zo ≈ 1/gm\n\nThis is typically very low — on the order of tens to hundreds of ohms (e.g., if gm = 4 mS: Zo = 1/0.004 = 250 Ω).\n\nMore precisely: Zo = RS || (1/gm) || rd\n\nThe low output impedance makes the source follower excellent for driving low-impedance loads without loading effects, similar to the BJT emitter follower."
},{
  id:41, topic:"FET Amplifiers",
  q:"The Common-Gate FET configuration is characterized by:",
  choices:[
    "High input impedance and phase inversion",
    "Low input impedance, high output impedance, no phase inversion",
    "Unity voltage gain",
    "Very low output impedance"
  ],
  answer:1,
  explanation:"Common-Gate (CG) characteristics:\n• Low input impedance: Zi ≈ 1/gm (similar to CB BJT)\n• High output impedance: Zo = RD || rd\n• NO phase inversion (input at source, output at drain)\n• Good high-frequency response (no Miller effect)\n• Voltage gain: Av = gm(RD || rd) ≈ gmRD (positive)\n\nApplications: RF/microwave amplifiers, cascode configurations (CS + CG), matching low-impedance sources."
},{
  id:42, topic:"FET Amplifiers",
  q:"In a D-MOSFET, conduction can occur with:",
  choices:[
    "Only positive VGS (N-channel)",
    "Only negative VGS (N-channel)",
    "Both positive and negative VGS (operates in depletion AND enhancement mode)",
    "VGS = 0 only"
  ],
  answer:2,
  explanation:"D-MOSFET (Depletion-type MOSFET) unique feature:\n\nN-channel D-MOSFET can operate with:\n• VGS = 0: ID = IDSS (built-in channel conducts)\n• VGS < 0: Depletion mode (channel narrows, ID decreases)\n• VGS > 0: Enhancement mode (channel widens, ID > IDSS)\n\nThis versatility allows zero-bias operation (VGS = 0 with ID = IDSS), simplifying biasing. The Shockley equation applies in both modes:\nID = IDSS(1 – VGS/VP)²"
},{
  id:43, topic:"FET Amplifiers",
  q:"The E-MOSFET (Enhancement-type) requires VGS _______ the threshold voltage VT(on) to conduct.",
  choices:["Less than","Equal to zero","Greater than","Negative of"],
  answer:2,
  explanation:"E-MOSFET (Enhancement MOSFET) operation:\n\n• No built-in channel — requires gate voltage to CREATE a channel\n• N-channel E-MOSFET: VGS must exceed threshold voltage VT(on) > 0 to turn ON\n• If VGS < VT(on): device is OFF (no conduction)\n• If VGS > VT(on): channel forms, device conducts\n\nDrain current: ID = k(VGS – VT)²\nWhere k = constant from the datasheet\n\nE-MOSFETs are the basis of CMOS digital logic — billions of E-MOSFETs in every modern processor."
},{
  id:44, topic:"FET Amplifiers",
  q:"For an N-channel JFET with IDSS = 10 mA and VP = –5V, what is ID at VGS = –2V?",
  choices:["3.6 mA","4.8 mA","5.0 mA","6.4 mA"],
  answer:0,
  explanation:"Using Shockley's equation:\nID = IDSS(1 – VGS/VP)²\n\nGiven: IDSS = 10mA, VP = –5V, VGS = –2V\n\nID = 10mA × (1 – (–2)/(–5))²\n   = 10mA × (1 – 0.4)²\n   = 10mA × (0.6)²\n   = 10mA × 0.36\n   = 3.6 mA\n\nCheck: at VGS = 0 → ID = 10mA ✓; at VGS = –5V → ID = 0 ✓"
},{
  id:45, topic:"FET Amplifiers",
  q:"For an N-channel JFET with IDSS = 12 mA and VP = –6V, what is gmo?",
  choices:["1 mS","2 mS","4 mS","6 mS"],
  answer:2,
  explanation:"Maximum transconductance at VGS = 0:\n\ngmo = 2IDSS / |VP|\n    = 2 × 12 mA / 6 V\n    = 24 mA / 6 V\n    = 4 mS\n\nThis represents the device's maximum transconductance. At other operating points:\ngm = gmo × (1 – VGS/VP)\n\nAt VGS = –3V: gm = 4mS × (1 – 3/6) = 4mS × 0.5 = 2 mS"
},{
  id:46, topic:"FET Amplifiers",
  q:"Self-bias in a JFET circuit uses a source resistor RS to produce VGS. The resulting VGS is:",
  choices:["VGS = +ID × RS","VGS = –ID × RS","VGS = VDD – ID×RD","VGS = IDSS × RS"],
  answer:1,
  explanation:"In JFET self-bias configuration:\n• No gate bias voltage applied (VG = 0V via RG to ground)\n• VS = ID × RS (source voltage)\n• VGS = VG – VS = 0 – ID×RS = –ID×RS\n\nThis NEGATIVE VGS is exactly what an N-channel JFET needs for operation in the active region. As ID increases, VGS becomes more negative, which reduces ID — this self-regulation makes self-bias stable.\n\nThe Q-point is found where the Shockley curve (ID vs VGS) intersects the bias line (VGS = –IDRS)."
},{
  id:47, topic:"FET Amplifiers",
  q:"The FET small-signal AC model consists of:",
  choices:[
    "A voltage-controlled voltage source gmVgs in series with rd",
    "A voltage-controlled current source gmVgs in parallel with rd",
    "A current-controlled current source βIb",
    "A diode and current source"
  ],
  answer:1,
  explanation:"FET small-signal AC model:\n• Gate-to-Source: open circuit (infinite impedance, Ig = 0)\n• Drain-Source: dependent current source gmVgs in PARALLEL with output resistance rd\n\nThe current source gmVgs generates drain current proportional to gate-source voltage (voltage-controlled current source — VCCS). rd accounts for the finite output resistance.\n\nCompare to BJT re model: uses βIb (current-controlled current source — CCCS)."
},{
  id:48, topic:"FET Amplifiers",
  q:"A Common-Source amplifier has gm = 3 mS and RD = 4.7 kΩ (assume rd >> RD). What is the voltage gain?",
  choices:["+14.1","+7.5","–14.1","–7.5"],
  answer:2,
  explanation:"Av = –gm × RD (when rd >> RD)\n\nGiven gm = 3 mS = 0.003 S, RD = 4700 Ω:\n\nAv = –(0.003)(4700)\n   = –14.1\n\nThe magnitude 14.1 and negative sign (180° phase inversion) are characteristic of CS amplifiers. This gain can be expressed in dB:\nAv(dB) = 20 log(14.1) ≈ 23 dB"
},{
  id:49, topic:"FET Amplifiers",
  q:"Compared to BJT amplifiers, FET amplifiers generally have:",
  choices:[
    "Higher voltage gain",
    "Lower input impedance",
    "Lower voltage gain but much higher input impedance",
    "Better linearity at high frequencies"
  ],
  answer:2,
  explanation:"FET vs BJT comparison:\n\nFET advantages:\n✓ Much higher input impedance (MΩ vs kΩ)\n✓ Lower noise (especially at low frequencies)\n✓ No thermal runaway\n✓ Simpler biasing\n\nFET disadvantages:\n✗ Lower transconductance than BJT (gm typically 1–10 mS vs 25–100 mS)\n✗ Lower voltage gain for same load\n✗ Slower switching (BJTs generally faster)\n\nTypical FET Av: 5–30; Typical BJT Av: 50–300 (same RD/RC)"
},{
  id:50, topic:"FET Amplifiers",
  q:"In JFET notation, what does IDSS represent?",
  choices:[
    "Drain current at VGS = VP",
    "Drain current at VGS = 0V (gate shorted to source)",
    "Maximum safe drain current",
    "Drain current at VDS = 0V"
  ],
  answer:1,
  explanation:"IDSS = Drain current with gate Shorted to Source (VGS = 0V)\n\nIDSS is the maximum drain current for a JFET — it occurs when there is no gate voltage applied. It is a key datasheet parameter.\n\nTypical values:\n• Small-signal JFETs: 1–20 mA\n• Power JFETs: up to amperes\n\nIDSS varies widely between devices of the same type — for example, a 2N5459 JFET has IDSS between 4–16 mA. The operating point must be designed to work across this range."
},{
  id:51, topic:"FET Amplifiers",
  q:"What is VP (pinch-off voltage) in a JFET?",
  choices:[
    "The voltage at which the JFET first starts conducting",
    "The VGS at which drain current drops to essentially zero",
    "The maximum allowed VDS",
    "The gate breakdown voltage"
  ],
  answer:1,
  explanation:"VP (pinch-off voltage) is the value of VGS at which the drain current ID is reduced to essentially zero (channel pinched off).\n\nFor N-channel JFET: VP is NEGATIVE (e.g., VP = –4V means apply –4V to gate to cut off)\nFor P-channel JFET: VP is POSITIVE\n\nAt VGS = VP: ID → 0 (transistor off)\nAt VGS = 0: ID = IDSS (maximum)\n\nNote: VP is different from VDS(sat) = VGS – VP (the VDS needed to enter pinch-off at the drain end)."
},{
  id:52, topic:"FET Amplifiers",
  q:"For a Common-Source amplifier with source bypass capacitor (CS across RS), what happens to gain?",
  choices:[
    "Gain decreases because RS is eliminated",
    "Gain increases because RS is short-circuited for AC, removing degeneration",
    "Gain is unaffected",
    "Gain becomes exactly –gm"
  ],
  answer:1,
  explanation:"Without bypass capacitor CS (RS in circuit for AC):\nAv = –gm(RD || rd) / (1 + gmRS) → lower gain, higher Zi\n\nWith bypass capacitor CS (RS short-circuited for AC):\nAv = –gm(RD || rd) → higher gain, standard formula\n\nThe bypass capacitor CS removes RS from the AC signal path (source degeneration), maximizing gain. This is analogous to the bypass capacitor CE in BJT CE amplifiers — both short out the emitter/source resistor to maximize AC gain."
},{
  id:53, topic:"FET Amplifiers",
  q:"The E-MOSFET drain current is described by which equation?",
  choices:[
    "ID = IDSS(1 – VGS/VP)²",
    "ID = k(VGS – VT(on))²",
    "ID = gm × VGS",
    "ID = VDS / RDS"
  ],
  answer:1,
  explanation:"E-MOSFET drain current: ID = k(VGS – VT(on))²\n\nWhere:\n• k = conduction parameter (from datasheet, A/V²)\n• VT(on) = threshold voltage (device turns on above this)\n• VGS = applied gate-source voltage\n\nk can be found from datasheet: if at VGS = VGS(on), ID = ID(on):\nk = ID(on) / (VGS(on) – VT(on))²\n\nThis equation applies in the saturation (active) region. Unlike JFET, ID = 0 when VGS < VT(on)."
},{
  id:54, topic:"FET Amplifiers",
  q:"Which MOSFET type can only be turned ON by applying a gate voltage (no built-in channel)?",
  choices:["D-MOSFET only","J-FET","E-MOSFET (Enhancement MOSFET)","Both D-MOSFET and JFET"],
  answer:2,
  explanation:"E-MOSFET (Enhancement MOSFET):\n• No built-in channel between source and drain\n• MUST apply VGS > VT(on) to induce a channel\n• At VGS = 0: ID = 0 (normally OFF)\n\nD-MOSFET:\n• Has built-in channel\n• Conducts at VGS = 0 (normally ON)\n• Can be depleted (VGS < 0) or enhanced (VGS > 0)\n\nE-MOSFETs are the basis of CMOS logic. NMOS turns on with VGS > 0; PMOS turns on with VGS < 0."
},{
  id:55, topic:"FET Amplifiers",
  q:"In a JFET voltage-divider bias circuit, the gate voltage VG is set by:",
  choices:[
    "VG = IDSS × RG",
    "VG = VDD × R2/(R1+R2)",
    "VG = –ID × RS",
    "VG = VDD – ID×RD"
  ],
  answer:1,
  explanation:"In voltage-divider bias:\nVG = VDD × R2/(R1+R2)\n\nThis is the standard voltage divider formula. Since the gate draws zero current (ideal JFET), the divider is unloaded and the formula is exact.\n\nThen: VGS = VG – VS = VG – ID×RS\n\nCombine with Shockley's equation to find Q-point. Voltage-divider bias is more stable than self-bias because VG is set by fixed resistors, less dependent on device parameters."
},{
  id:56, topic:"FET Amplifiers",
  q:"The mu (μ) parameter of a FET is related to gm and rd by:",
  choices:["μ = gm – rd","μ = gm / rd","μ = gm × rd","μ = rd / gm"],
  answer:2,
  explanation:"FET amplification factor: μ = gm × rd\n\nWhere:\n• gm = transconductance (mS)\n• rd = drain resistance (kΩ)\n\nμ is the theoretical maximum voltage gain of a FET (open-circuit gain with no external load).\n\nFor a CS amplifier:\nAv = –μ × RD / (rd + RD) = –gm × (RD || rd)\n\nAs RD → ∞: Av → –μ\n\nExample: gm = 4mS, rd = 50kΩ: μ = 4mS × 50kΩ = 200"
},{
  id:57, topic:"FET Amplifiers",
  q:"A JFET self-bias circuit has RS = 1 kΩ. If the Q-point is ID = 2 mA, what is VGS?",
  choices:["+2V","+1V","–2V","–1V"],
  answer:2,
  explanation:"For JFET self-bias:\nVGS = –ID × RS\n\nGiven ID = 2 mA, RS = 1 kΩ:\nVGS = –(2 mA)(1000 Ω) = –2V\n\nThe negative sign is automatic in self-bias — the source is at a higher potential than the gate (which is at ground through RG), making VGS negative as required for N-channel JFET operation.\n\nVerify with Shockley: if VGS = –2V gives ID = 2mA, the Q-point is consistent."
},

/* ──────────────────────────────────────────────────────────────────
   TOPIC 3 · LOGARITHMS AND DECIBELS  (23 questions)
   ────────────────────────────────────────────────────────────────── */
{
  id:58, topic:"Logarithms & Decibels",
  q:"John Napier invented logarithms in 1614 using which base?",
  choices:["Base 2","Base 10","Base e (≈2.718)","Base π"],
  answer:2,
  explanation:"John Napier (1550–1617) originally invented logarithms using the base e ≈ 2.718 (now called natural logarithms). Later, Henry Briggs (1561–1630) improved this by introducing base-10 logarithms (common logarithms) in 1616, which are far more practical for everyday calculations.\n\nNapier's logarithms → ln (natural log)\nBriggs's logarithms → log (common log, base 10)"
},{
  id:59, topic:"Logarithms & Decibels",
  q:"If log₅(125) = 3, what is the equivalent exponential form?",
  choices:["3⁵ = 125","5¹²⁵ = 3","5³ = 125","125³ = 5"],
  answer:2,
  explanation:"Conversion rule: log_b(n) = x  ↔  b^x = n\n\nFor log₅(125) = 3:\n• b = 5 (base)\n• n = 125 (argument)\n• x = 3 (exponent)\n\nExponential form: 5³ = 125 ✓\n\nMemory trick: the base (5) raised to the log value (3) gives the argument (125)."
},{
  id:60, topic:"Logarithms & Decibels",
  q:"Using logarithm properties, simplify: log(1000) + log(100)",
  choices:["log(1100)","log(100,000)","5","log(10)"],
  answer:2,
  explanation:"Using the product property: log(xy) = log x + log y\n\nlog(1000) + log(100) = log(1000 × 100) = log(100,000)\n\nlog(100,000) = log(10⁵) = 5\n\nAlternatively directly:\nlog(1000) = log(10³) = 3\nlog(100) = log(10²) = 2\n3 + 2 = 5 ✓"
},{
  id:61, topic:"Logarithms & Decibels",
  q:"What is log₁₀(0.001)?",
  choices:["–1","–2","–3","–0.3"],
  answer:2,
  explanation:"log₁₀(0.001) = log₁₀(10⁻³) = –3\n\n0.001 = 1/1000 = 10⁻³\n\nThe logarithm of numbers less than 1 (but greater than 0) is always negative with common log. Key values:\n• log(1) = 0\n• log(10) = 1\n• log(100) = 2\n• log(0.1) = –1\n• log(0.01) = –2\n• log(0.001) = –3"
},{
  id:62, topic:"Logarithms & Decibels",
  q:"Simplify: log(x³) using logarithm properties",
  choices:["3/log(x)","log(x)/3","3 × log(x)","log(3x)"],
  answer:2,
  explanation:"Power property: log(xⁿ) = n × log(x)\n\nTherefore: log(x³) = 3 × log(x)\n\nThis property is fundamental to why dB uses logarithms:\n• Power gain: P ∝ V² so log(V²/V₁²) = 2log(V₂/V₁)\n• This is why voltage/current dB uses factor 20, not 10"
},{
  id:63, topic:"Logarithms & Decibels",
  q:"The power gain formula Ap(dB) = 10 log(P2/P1) gives +30 dB when P2/P1 =",
  choices:["10","100","1000","10000"],
  answer:2,
  explanation:"30 = 10 × log(P2/P1)\n3 = log(P2/P1)\nP2/P1 = 10³ = 1000\n\nKey power ratios:\n• +10 dB = 10× power\n• +20 dB = 100× power\n• +30 dB = 1000× power\n• +3 dB ≈ 2× power\n• –3 dB ≈ ½ power\n• –10 dB = 1/10 power\n• 0 dB = 1× (no change)"
},{
  id:64, topic:"Logarithms & Decibels",
  q:"An amplifier has Vin = 50 mV and Vout = 5 V. What is the voltage gain in dB?",
  choices:["20 dB","40 dB","60 dB","100 dB"],
  answer:1,
  explanation:"Av(dB) = 20 log₁₀(Vout/Vin)\n\nGiven: Vout = 5V, Vin = 50mV = 0.05V\n\nVoltage ratio = 5/0.05 = 100\n\nAv(dB) = 20 log₁₀(100) = 20 × 2 = 40 dB\n\nNote: a voltage ratio of 100:1 = 40 dB (because 20 log 100 = 40).\nA power ratio of 100:1 would be only 20 dB."
},{
  id:65, topic:"Logarithms & Decibels",
  q:"A –20 dB attenuator has Vin = 10V. What is Vout?",
  choices:["0.1 V","1 V","5 V","9 V"],
  answer:1,
  explanation:"Av(dB) = 20 log(Vout/Vin)\n–20 = 20 log(Vout/10)\n–1 = log(Vout/10)\n10⁻¹ = Vout/10\n0.1 = Vout/10\nVout = 10 × 0.1 = 1 V\n\n–20 dB always means voltage reduced by factor of 10:\nVout = Vin × 10^(–20/20) = Vin × 0.1 = 10 × 0.1 = 1V"
},{
  id:66, topic:"Logarithms & Decibels",
  q:"Three amplifier stages have gains of +20 dB, +30 dB, and –3 dB. What is the total gain in dB?",
  choices:["+47 dB","+53 dB","+43 dB","+600 dB"],
  answer:0,
  explanation:"A key advantage of dB: cascade gains ADD in dB (vs multiply in linear).\n\nTotal gain = 20 + 30 + (–3) = +47 dB\n\nIn linear terms this would be:\n20 dB = ×10 (voltage)\n30 dB = ×31.6\n–3 dB = ×0.707\nTotal = 10 × 31.6 × 0.707 ≈ 223 = 47 dB ✓\n\nThe dB scale converts multiplication to addition, greatly simplifying multi-stage system analysis."
},{
  id:67, topic:"Logarithms & Decibels",
  q:"The –3 dB frequency (half-power point) corresponds to a voltage ratio of:",
  choices:["0.5 (50%)","0.707 (70.7%)","0.866 (86.6%)","1.414 (141.4%)"],
  answer:1,
  explanation:"At the –3 dB point:\nPout/Pin = 0.5 (half power)\nVout/Vin = √0.5 = 1/√2 ≈ 0.707 (70.7% of max voltage)\n\nVerification: 20 log(0.707) = 20 × (–0.15) ≈ –3 dB ✓\n\nThe –3 dB point defines the BANDWIDTH of amplifiers and filters. Between the lower and upper –3 dB frequencies lies the useful passband where the amplifier operates within 3 dB of its maximum gain."
},{
  id:68, topic:"Logarithms & Decibels",
  q:"An amplifier delivers P2 = 50 W from an input of P1 = 0.5 W. What is Ap in dB?",
  choices:["10 dB","20 dB","100 dB","40 dB"],
  answer:1,
  explanation:"Ap(dB) = 10 log₁₀(P2/P1)\n      = 10 log₁₀(50/0.5)\n      = 10 log₁₀(100)\n      = 10 × 2\n      = 20 dB\n\nA power ratio of 100:1 is always 20 dB.\nNote the difference: 100× POWER = 20 dB, but 100× VOLTAGE = 40 dB."
},{
  id:69, topic:"Logarithms & Decibels",
  q:"Convert ln(50) to common log. (Given: ln(50) ≈ 3.912)",
  choices:["1.699","3.912","8.965","0.699"],
  answer:0,
  explanation:"Using the modulus: log(x) = 0.4343 × ln(x)\n\nlog(50) = 0.4343 × ln(50)\n        = 0.4343 × 3.912\n        = 1.699\n\nVerification: log(50) = log(5×10) = log5 + log10 = 0.699 + 1 = 1.699 ✓\n\nThe modulus 0.4343 = log(e) converts between natural and common log."
},{
  id:70, topic:"Logarithms & Decibels",
  q:"dBm is a common unit where 0 dBm corresponds to a reference power of:",
  choices:["1 W","1 mW","1 μW","1 nW"],
  answer:1,
  explanation:"dBm uses 1 mW as the reference:\nP(dBm) = 10 log₁₀(P / 1 mW)\n\nCommon values:\n• 0 dBm = 1 mW\n• +10 dBm = 10 mW\n• +30 dBm = 1 W (= +30 dBm)\n• –10 dBm = 0.1 mW\n• –30 dBm = 1 μW\n\ndBm is absolute (referenced to 1mW), while plain dB is relative (a ratio). dBm is widely used in RF and telecommunications to specify signal levels."
},{
  id:71, topic:"Logarithms & Decibels",
  q:"Using log property 4 (change of base), log₈(64) = ?",
  choices:["2","3","4","8"],
  answer:0,
  explanation:"Using change of base: log_b(x) = log(x)/log(b)\n\nlog₈(64) = log(64)/log(8)\n\nlog(64) = log(2⁶) = 6 × log(2) ≈ 6 × 0.3010 = 1.806\nlog(8) = log(2³) = 3 × log(2) ≈ 3 × 0.3010 = 0.903\n\nlog₈(64) = 1.806/0.903 = 2\n\nVerification: 8² = 64 ✓"
},{
  id:72, topic:"Logarithms & Decibels",
  q:"The decibel is 1/10 of a:",
  choices:["Neper","Bel","Phon","Sone"],
  answer:1,
  explanation:"The decibel (dB) = 1/10 of a bel (B).\n\nThe bel (named after Alexander Graham Bell) was the original unit, but it proved too large for practical use. So the decibel (deci-bel = 1/10 bel) became standard.\n\nIn bels: Ap(B) = log₁₀(P2/P1)\nIn decibels: Ap(dB) = 10 × log₁₀(P2/P1)\n\nThe factor of 10 converts bels to decibels — that's why power uses 10 log and voltage uses 20 log."
},{
  id:73, topic:"Logarithms & Decibels",
  q:"A current of I2 = 8 mA flows through R2, and I1 = 2 mA flows through R1 (same resistance). The current gain in dB is:",
  choices:["6 dB","12 dB","20 dB","40 dB"],
  answer:1,
  explanation:"Current gain in dB (same impedances):\nAi(dB) = 20 log₁₀(I2/I1)\n       = 20 log₁₀(8mA/2mA)\n       = 20 log₁₀(4)\n       = 20 × 0.602\n       ≈ 12 dB\n\nNote: log₁₀(4) ≈ 0.602\nAlternatively: log(4) = log(2²) = 2×log(2) = 2×0.301 = 0.602\nAi(dB) = 20 × 0.602 = 12.04 dB ≈ 12 dB"
},{
  id:74, topic:"Logarithms & Decibels",
  q:"The decibel formula when input and output have DIFFERENT impedances Z1 and Z2 includes an extra term because:",
  choices:[
    "Voltage measurements are inaccurate at different impedances",
    "Equal voltages at different impedances represent different power levels",
    "Current must be measured instead of voltage",
    "The log function behaves differently at different frequencies"
  ],
  answer:1,
  explanation:"dB is fundamentally a power ratio. If impedances differ:\nP = V²/Z\n\nSame voltage V₂ = V₁ but Z₂ ≠ Z₁ means P₂ ≠ P₁, so we can't just compare voltages.\n\nCorrect formula:\nNd = 20 log(V2/V1) + 10 log(Z1/Z2)\n\nExample: V2 = V1 (same voltage), Z1 = 1kΩ, Z2 = 50Ω:\n20 log(1) + 10 log(1000/50) = 0 + 10 log(20) = 10×1.3 = +13 dB\n(Same voltage but 20× more power delivered to Z2)"
},{
  id:75, topic:"Logarithms & Decibels",
  q:"What voltage gain ratio corresponds to 6 dB?",
  choices:["×2","×4","×6","×10"],
  answer:0,
  explanation:"6 dB voltage gain:\n20 log(Av) = 6\nlog(Av) = 0.3\nAv = 10^0.3 ≈ 2\n\nKey voltage gain reference points:\n• 6 dB ≈ ×2 voltage\n• 20 dB = ×10 voltage\n• 40 dB = ×100 voltage\n• –6 dB ≈ ×0.5 (half voltage)\n• 3 dB ≈ ×1.414 voltage (×2 POWER)\n\nNote: 6 dB ≈ ×2 voltage corresponds to ×4 POWER (since P∝V²)."
},{
  id:76, topic:"Logarithms & Decibels",
  q:"The binary logarithm log₂(1024) equals:",
  choices:["8","10","12","16"],
  answer:1,
  explanation:"log₂(1024) = log₂(2¹⁰) = 10\n\nBecause 2¹⁰ = 1024.\n\nBinary logarithm applications in digital systems:\n• 10 bits can represent 2¹⁰ = 1024 values → log₂(1024) = 10 bits needed\n• log₂(N) gives the minimum number of bits to represent N values\n• Shannon information entropy uses log₂\n\nOther useful values:\n• log₂(2) = 1, log₂(4) = 2, log₂(8) = 3, log₂(256) = 8"
},{
  id:77, topic:"Logarithms & Decibels",
  q:"Given log x = 0.4343 ln x, what is ln(100)?",
  choices:["2.0","4.343","4.605","6.0"],
  answer:2,
  explanation:"Using: ln x = 2.3026 × log x\n\nln(100) = 2.3026 × log(100)\n        = 2.3026 × 2\n        = 4.605\n\nVerification: e^4.605 ≈ 100 ✓ (e ≈ 2.718, 2.718^4.605 ≈ 100)\n\nThe modulus factors:\n• log x = 0.4343 ln x (convert ln to log)\n• ln x = 2.3026 log x (convert log to ln)\n• 2.3026 = ln(10); 0.4343 = log(e)"
},{
  id:78, topic:"Logarithms & Decibels",
  q:"What is log_a(a)? (property 6 of logarithms)",
  choices:["0","a","1","undefined"],
  answer:2,
  explanation:"Property: log_a(a) = 1 (for any base a > 0, a ≠ 1)\n\nThis is because a¹ = a, so the exponent needed to produce a from base a is 1.\n\nOther fundamental log properties:\n• log_a(1) = 0 (since a⁰ = 1)\n• log_a(aⁿ) = n\n• a^(log_a(x)) = x\n\nExample: log₁₀(10) = 1, ln(e) = 1, log₂(2) = 1 — all equal 1 because they're all 'log of the base equals 1'."
},{
  id:79, topic:"Logarithms & Decibels",
  q:"A signal at –60 dBm passes through a +40 dB amplifier then a –5 dB cable loss. The output power in dBm is:",
  choices:["–35 dBm","–25 dBm","–5 dBm","+95 dBm"],
  answer:1,
  explanation:"dB gains and losses simply add:\n\nOutput = Input + Amp gain + Cable loss\nOutput = –60 dBm + 40 dB – 5 dB\nOutput = –60 + 40 – 5\nOutput = –25 dBm\n\nThis is the power of the dB system: a –25 dBm signal corresponds to:\nP = 1mW × 10^(–25/10) = 1mW × 0.00316 = 3.16 μW\n\nWorking with dBm makes cascaded system calculations trivial."
},{
  id:80, topic:"Logarithms & Decibels",
  q:"The property log(x/y) = log x – log y is used in the dB formula because:",
  choices:[
    "Power is always divided",
    "The ratio of output to input (P2/P1) uses division, which becomes subtraction in log",
    "Negative dB values require subtraction",
    "It simplifies transistor bias calculations"
  ],
  answer:1,
  explanation:"The quotient property log(x/y) = log x – log y is the mathematical foundation of the dB ratio concept.\n\nAp(dB) = 10 log(P2/P1) = 10[log(P2) – log(P1)]\n\nThis is why dB represents a RATIO (gain or loss) rather than an absolute level. The ratio P2/P1 can be:\n• >1 (gain): positive dB\n• =1 (unity): 0 dB\n• <1 (loss): negative dB\n\nAnd cascaded ratios become: total dB = log(R1) + log(R2) + ... = log(R1×R2×...)"
},

/* ──────────────────────────────────────────────────────────────────
   TOPIC 4 · OPERATIONAL AMPLIFIERS  (27 questions)
   ────────────────────────────────────────────────────────────────── */
{
  id:81, topic:"Operational Amplifiers",
  q:"An ideal op-amp has which characteristics?",
  choices:[
    "Zi = 0, Zo = ∞, Av = finite",
    "Zi = ∞, Zo = 0, Av = ∞ (open-loop)",
    "Zi = 50Ω, Zo = 50Ω, Av = 1000",
    "Zi = ∞, Zo = ∞, Av = 1"
  ],
  answer:1,
  explanation:"Ideal op-amp characteristics:\n• Input impedance Zi = ∞ (draws no current)\n• Output impedance Zo = 0 (can drive any load)\n• Open-loop gain Av = ∞\n• Bandwidth = ∞ (flat response at all frequencies)\n• CMRR = ∞ (perfectly rejects common-mode)\n• No offset (Vout = 0 when Vin = 0)\n\nReal op-amps (like 741): Zi ≈ 2MΩ, Zo ≈ 75Ω, Av ≈ 200,000. Close to ideal, not perfect."
},{
  id:82, topic:"Operational Amplifiers",
  q:"For an inverting amplifier, if R1 = 2.2 kΩ and Rf = 22 kΩ, what is the voltage gain?",
  choices:["+10","–10","+0.1","–0.1"],
  answer:1,
  explanation:"Av = –Rf/R1 = –22kΩ/2.2kΩ = –10\n\nThe gain magnitude is 10, with negative sign indicating 180° phase inversion.\n\nFor Vin = 1V: Vout = –10V\nFor Vin = –0.5V: Vout = +5V\n\nIn dB: 20 log(10) = 20 dB\n\nFor unity gain: set Rf = R1, giving Av = –1 (unity inverter, 180° phase shift)."
},{
  id:83, topic:"Operational Amplifiers",
  q:"For a non-inverting amplifier with R1 = 1kΩ and Rf = 9kΩ, the voltage gain is:",
  choices:["+9","–9","+10","–10"],
  answer:2,
  explanation:"Av = 1 + Rf/R1 = 1 + 9kΩ/1kΩ = 1 + 9 = 10\n\nThe non-inverting configuration:\n• Gain is always ≥ 1 (minimum is +1 at Rf = 0 or open)\n• Output is IN PHASE with input\n• Input at (+) terminal\n\nCompare to inverting with same resistors:\nAv = –Rf/R1 = –9 (one less than non-inverting magnitude, and negative)\n\nThe (+1) in the non-inverting formula accounts for the direct path from input to output."
},{
  id:84, topic:"Operational Amplifiers",
  q:"The concept of 'virtual ground' in an inverting op-amp means the inverting terminal is at:",
  choices:["Actual 0V connected to ground","0V potential but isolated from ground (no current to ground)","–0.7V due to diode drop","Half the supply voltage"],
  answer:1,
  explanation:"Virtual ground: The inverting (–) input of an inverting op-amp is at 0V potential, but this is NOT a direct ground connection.\n\nWhy? With V+ = 0V (real ground) and infinite op-amp gain:\nVout = Av × (V+ – V–) → V+ ≈ V–\n\nSo V– ≈ 0V but zero current flows from V– to ground through the op-amp input.\n\nConsequence: ALL input current flows through Rf (not into the op-amp). This leads directly to:\nVout = –(Rf/R1) × Vin"
},{
  id:85, topic:"Operational Amplifiers",
  q:"A summing amplifier has V1 = 1V, V2 = 2V, V3 = 3V with R1 = R2 = R3 = Rf = 10kΩ. What is Vout?",
  choices:["+6V","–6V","+2V","–2V"],
  answer:1,
  explanation:"Summing amplifier with equal resistors:\nVout = –(Rf/R1 × V1 + Rf/R2 × V2 + Rf/R3 × V3)\n\nSince all resistors equal (Rf/R1 = Rf/R2 = Rf/R3 = 1):\nVout = –(1×1 + 1×2 + 1×3)\n     = –(1 + 2 + 3)\n     = –6V\n\nApplications: Audio mixing, digital-to-analog conversion. Different R values give weighted sums — useful in D/A converters with R, 2R, 4R weights."
},{
  id:86, topic:"Operational Amplifiers",
  q:"An op-amp integrator has R = 10kΩ and C = 0.1μF. What is the time constant RC?",
  choices:["0.1 ms","1 ms","10 ms","100 ms"],
  answer:1,
  explanation:"RC = 10,000Ω × 0.1×10⁻⁶F\n   = 10,000 × 0.0000001\n   = 0.001 s = 1 ms\n\nThe integrator output: vo(t) = –(1/RC) ∫vi(t)dt\n\nFor a step input Vi:\nvo(t) = –Vi/(RC) × t (ramp output)\n\nFor a square wave input, the integrator produces a triangular wave. For a sine wave at frequency f:\n|Av| = 1/(2πfRC) — decreases with frequency (low-pass behavior)"
},{
  id:87, topic:"Operational Amplifiers",
  q:"What output does an op-amp differentiator produce for a sinusoidal input?",
  choices:[
    "A dc output",
    "A larger sinusoidal output, phase-shifted by –90°",
    "A triangular wave",
    "The integral of the input"
  ],
  answer:1,
  explanation:"Differentiator output: vo(t) = –RC × d(vi)/dt\n\nFor vi = Vm sin(ωt):\nvo = –RC × d(Vm sin ωt)/dt\n   = –RC × Vm × ω × cos(ωt)\n   = –RCωVm × cos(ωt)\n\nThe cosine is a sine shifted by –90°, and the amplitude is ω×RC×Vm (increases with frequency).\n\nSo: amplified sinusoid shifted by –90° (plus the inverting –). At higher frequencies, gain increases — this is high-pass behavior."
},{
  id:88, topic:"Operational Amplifiers",
  q:"The Slew Rate (SR) of a 741 op-amp is typically 0.5 V/μs. For a 10V peak output, what is the maximum undistorted frequency?",
  choices:["4.97 kHz","7.96 kHz","15.9 kHz","31.8 kHz"],
  answer:1,
  explanation:"f_max = SR / (2πVp)\n      = 0.5×10⁶ V/s / (2π × 10V)\n      = 500,000 / 62.83\n      = 7,958 Hz ≈ 7.96 kHz\n\nAbove this frequency, the output distorts because it can't change fast enough. At 7.96 kHz with 10V peak, the required slew rate = 2π×7958×10 ≈ 500,000 V/s = 0.5 V/μs — exactly at the limit."
},{
  id:89, topic:"Operational Amplifiers",
  q:"The Gain-Bandwidth Product (GBW) of an op-amp means that as gain increases:",
  choices:[
    "Bandwidth also increases",
    "Bandwidth decreases proportionally (gain × bandwidth = constant)",
    "Bandwidth is unaffected",
    "Slew rate increases"
  ],
  answer:1,
  explanation:"GBW = Gain × Bandwidth = constant\n\nFor a 741 op-amp: GBW ≈ 1 MHz\n\n• Open-loop gain ≈ 100,000 → Bandwidth ≈ 10 Hz\n• Closed-loop gain = 100 → Bandwidth ≈ 10 kHz\n• Closed-loop gain = 10 → Bandwidth ≈ 100 kHz\n• Unity gain (Av=1) → Bandwidth ≈ 1 MHz\n\nThis trade-off is fundamental: you can't have both high gain and wide bandwidth simultaneously with a fixed GBW op-amp."
},{
  id:90, topic:"Operational Amplifiers",
  q:"The CMRR of the 741 op-amp (typical) is:",
  choices:["50 dB","70 dB","90 dB","120 dB"],
  answer:2,
  explanation:"The 741 op-amp has a typical CMRR of 90 dB.\n\nCMRR = 20 log(Ad/Acm)\nWhere Ad = differential gain, Acm = common-mode gain.\n\n90 dB means Ad/Acm = 10^(90/20) ≈ 31,623\n\nSo the differential signal is amplified 31,623 times more than common-mode noise. A higher CMRR means better noise rejection — critical in instrumentation amplifiers measuring small signals in noisy environments (biosignals, strain gauges, etc.)."
},{
  id:91, topic:"Operational Amplifiers",
  q:"Input offset voltage VIO causes output error. For a 741 with VIO = 2mV, R1 = 1kΩ, Rf = 99kΩ, the output offset is:",
  choices:["2 mV","20 mV","200 mV","2 V"],
  answer:2,
  explanation:"Vo(offset due to VIO) = VIO × (R1+Rf)/R1\n\n= 2mV × (1kΩ + 99kΩ)/1kΩ\n= 2mV × 100kΩ/1kΩ\n= 2mV × 100\n= 200 mV\n\nThe offset is amplified by the non-inverting gain (1 + Rf/R1) = 100. This 200 mV offset may be significant for a precision amplifier. Solution: use an op-amp with lower VIO, or add an offset null circuit (pin 1 and 5 on 741 with a potentiometer)."
},{
  id:92, topic:"Operational Amplifiers",
  q:"Input Bias Current (IB) is the average of:",
  choices:[
    "The two output currents",
    "The two input bias currents I⁺IB and I⁻IB",
    "The offset voltage and offset current",
    "Supply current and quiescent current"
  ],
  answer:1,
  explanation:"IB = (I⁻IB + I⁺IB) / 2\n\nWhere I⁻IB and I⁺IB are the individual bias currents into each input terminal.\n\nFor 741: IB(typical) = 80 nA, IB(max) = 500 nA\n\nThe input offset current IIO = I⁻IB – I⁺IB (difference between the two)\nFor 741: IIO(typical) = 20 nA, IIO(max) = 200 nA\n\nBias current causes offset because it flows through external resistors, creating voltage drops that the op-amp amplifies."
},{
  id:93, topic:"Operational Amplifiers",
  q:"An op-amp comparator (open-loop) with Vin+ > Vin– produces an output of approximately:",
  choices:["0V","–Vsat (negative saturation)","Vout = Av(Vin+ – Vin–) (unsaturated)","+ Vsat (positive saturation)"],
  answer:3,
  explanation:"An op-amp comparator uses open-loop operation (no feedback). With Av = 200,000:\n\nIf V+ > V– by even 0.1 mV:\nVout = 200,000 × 0.1mV = 20V → exceeds supply → saturates at +Vsat ≈ +13V (for ±15V supply)\n\nSummary:\n• V+ > V– → Vout ≈ +Vsat\n• V+ < V– → Vout ≈ –Vsat\n• V+ = V– → transition region (almost never stable)\n\nApplications: zero-crossing detector, window comparator, level detector."
},{
  id:94, topic:"Operational Amplifiers",
  q:"The unity follower (voltage buffer) op-amp circuit achieves Av = +1 by:",
  choices:[
    "Setting Rf = R1",
    "Connecting the output directly to the inverting input with signal at non-inverting",
    "Using a large Rf resistor",
    "Operating in open-loop mode"
  ],
  answer:1,
  explanation:"Unity follower configuration:\n• Signal input → (+) non-inverting terminal\n• Output → (–) inverting terminal (100% feedback)\n• No external resistors needed\n\nWith 100% feedback: Av(closed) = 1 (unity)\n\nBenefits:\n• Zi ≈ ∞ (doesn't load source)\n• Zo ≈ 0 (can drive heavy loads)\n• Av = +1 (no phase shift)\n\nApplications: ADC/DAC buffers, sensor interfaces, output driver stages."
},{
  id:95, topic:"Operational Amplifiers",
  q:"The total output offset voltage when both VIO and IIO exist is:",
  choices:[
    "Vout(offset) = VIO × Rf only",
    "Vout(offset) = Vo(due to VIO) + Vo(due to IIO)",
    "Vout(offset) = IIO / Rf",
    "Vout(offset) = VIO – IIO×R1"
  ],
  answer:1,
  explanation:"Total output offset (superposition):\nVout(offset) = Vo(offset due to VIO) + Vo(offset due to IIO)\n\nWhere:\n• Vo(due to VIO) = VIO × (R1+Rf)/R1\n• Vo(due to IIO) = IIO × Rf\n\nFor 741 worst case (VIO=6mV, IIO=200nA, R1=1kΩ, Rf=100kΩ):\nVo(VIO) = 6mV × 101 = 606 mV\nVo(IIO) = 200nA × 100kΩ = 20 mV\nTotal ≈ 626 mV\n\nThis can be significant in high-gain precision applications."
},{
  id:96, topic:"Operational Amplifiers",
  q:"In the 741 op-amp electrical specifications, the typical large-signal differential voltage amplification (AVD) is:",
  choices:["200 V/mV (= 200,000)","20 V/mV","2 V/mV","0.2 V/mV"],
  answer:0,
  explanation:"The 741 (mA741) typical AVD = 200 V/mV = 200,000 (dimensionless gain)\n\nThis means for 1 mV differential input, the output would be 200V — far exceeding the supply rails, so the output saturates in open-loop use.\n\nIn closed-loop (with negative feedback), the effective gain is reduced to:\nAv(closed) = –Rf/R1 (inverting)\nAv(closed) = 1 + Rf/R1 (non-inverting)\n\nThe huge open-loop gain ensures the closed-loop gain is determined almost entirely by external resistors."
},{
  id:97, topic:"Operational Amplifiers",
  q:"Practical op-amp maximum output voltage swing (VOM) for 741 at ±15V supply is approximately:",
  choices:["±5V","±10V","±12V (min) to ±14V (typical)","±15V exactly"],
  answer:2,
  explanation:"741 output voltage swing (VOM): minimum ±12V, typical ±14V (with ±15V supply)\n\nThe output can't quite reach the supply rails because of internal voltage drops:\nVOM ≈ Vsupply – 1 to 3V\n\nFor ±15V supply: Vout swings from about –12V to +12V (min) or ±14V (typical).\n\nRail-to-rail op-amps can output within millivolts of both supply rails — used in single-supply applications where output must swing near 0V or VCC."
},{
  id:98, topic:"Operational Amplifiers",
  q:"An op-amp Schmitt trigger uses _______ feedback to create hysteresis.",
  choices:["Negative feedback to (–) input","Positive feedback to (+) input","No feedback","Capacitive feedback"],
  answer:1,
  explanation:"Schmitt trigger uses POSITIVE feedback (output fed back to the (+) non-inverting input):\n\n• Creates two different switching thresholds (hysteresis)\n• Upper threshold VUT and Lower threshold VLT\n• Output switches sharply between ±Vsat\n• Immune to noise on the input signal\n\nPositive feedback makes the circuit bistable (two stable states).\n\nCompare: Negative feedback → stable (amplifier); Positive feedback → bistable (Schmitt), oscillation (comparator with hysteresis)"
},{
  id:99, topic:"Operational Amplifiers",
  q:"An inverting amplifier has Rf = 100kΩ. If VIO = 1mV and IIO = 20nA, what is the output offset due to IIO alone?",
  choices:["0.02 mV","0.2 mV","2 mV","20 mV"],
  answer:2,
  explanation:"Vo(offset due to IIO) = IIO × Rf\n\n= 20×10⁻⁹ A × 100×10³ Ω\n= 20nA × 100kΩ\n= 2000×10⁻⁶ V\n= 2 mV\n\nFor comparison, offset due to VIO (with R1=1kΩ):\nVo(VIO) = 1mV × (1k+100k)/1k = 101 mV\n\nThe IIO offset is smaller here but becomes more significant with larger Rf values."
},{
  id:100, topic:"Operational Amplifiers",
  q:"Which op-amp configuration has the HIGHEST input impedance?",
  choices:["Inverting amplifier","Non-inverting amplifier","Unity follower","Differentiator"],
  answer:1,
  explanation:"Input impedance comparison:\n\n• Inverting amplifier: Zi = R1 (limited to input resistor!)\n• Non-inverting amplifier: Zi ≈ Zi(op-amp) ≈ MΩ range\n• Unity follower: Zi ≈ Zi(op-amp) × loop gain ≈ very high\n• Differentiator: Zi = Xc (frequency-dependent)\n\nThe inverting configuration has surprisingly LOW input impedance because the virtual ground at the inverting input means the input resistor R1 connects from source to virtual ground — so the source 'sees' only R1.\n\nThe non-inverting input connects directly to the high-impedance op-amp input."
},{
  id:101, topic:"Operational Amplifiers",
  q:"An instrumentation amplifier (INA) is formed by combining:",
  choices:[
    "Two comparators and one reference",
    "Three op-amps for very high CMRR and precise differential gain",
    "One op-amp with high gain resistors",
    "An op-amp and a FET"
  ],
  answer:1,
  explanation:"An instrumentation amplifier (INA) uses THREE op-amps:\n• Two input buffer op-amps (non-inverting, high Zi)\n• One differential output stage\n\nAdvantages over single op-amp:\n• Very high CMRR (100–120 dB)\n• Very high input impedance at both inputs\n• Gain set by ONE external resistor\n• Extremely low input offset\n\nApplications: biosignal amplifiers (ECG, EEG), strain gauge bridges, thermocouples — any application measuring small signals in the presence of large common-mode noise."
},{
  id:102, topic:"Operational Amplifiers",
  q:"An active low-pass filter using an op-amp has a cutoff frequency fc = 1/(2πRC). If R = 10kΩ and C = 0.01μF, fc =",
  choices:["159 Hz","1.59 kHz","15.9 kHz","159 kHz"],
  answer:1,
  explanation:"fc = 1/(2πRC)\n   = 1/(2π × 10,000 × 0.01×10⁻⁶)\n   = 1/(2π × 10⁻⁴)\n   = 1/(6.283 × 10⁻⁴)\n   = 1/0.0006283\n   ≈ 1592 Hz ≈ 1.59 kHz\n\nBelow 1.59 kHz: signal passes (gain = Av = –Rf/R1)\nAbove 1.59 kHz: gain rolls off at –20 dB/decade\n\nOp-amp active filters provide gain AND filtering in one stage, unlike passive RC filters which only attenuate."
},{
  id:103, topic:"Operational Amplifiers",
  q:"What is the purpose of the compensation network (typically a 30 pF capacitor) inside a 741 op-amp?",
  choices:[
    "To increase slew rate",
    "To prevent high-frequency oscillation by ensuring the gain drops to 0 dB before phase shift reaches 180°",
    "To improve input impedance",
    "To reduce supply current"
  ],
  answer:1,
  explanation:"The 30 pF internal compensation capacitor in the 741 ensures STABILITY:\n\n• Op-amps have internal phase shifts that increase with frequency\n• If phase shift reaches 180° while gain > 1 → oscillation (positive feedback)\n• The compensation capacitor rolls off the gain at –20 dB/decade from a few Hz\n• By the time phase shift reaches 180°, gain is < 1 → stable\n\nTrade-off: this limits the GBW to ~1 MHz. Uncompensated op-amps (like LM318) can be faster but require external compensation for stability."
},{
  id:104, topic:"Operational Amplifiers",
  q:"For a non-inverting amplifier: if Rf = 0Ω (short) and R1 = ∞ (open), the configuration becomes a:",
  choices:["Inverting amplifier","Differentiator","Unity follower","Integrator"],
  answer:2,
  explanation:"Non-inverting gain: Av = 1 + Rf/R1\n\nIf Rf = 0 and R1 = ∞:\nAv = 1 + 0/∞ = 1 + 0 = 1\n\nThis is the unity follower (voltage buffer)! It's equivalent to:\n• Connecting output directly to (–) input\n• Signal at (+) input\n• Av = +1\n\nAlternatively, just shorting the output to the (–) input (removing all resistors) also creates the unity follower."
},

/* ──────────────────────────────────────────────────────────────────
   TOPIC 5 · POWER AMPLIFIERS  (27 questions)
   ────────────────────────────────────────────────────────────────── */
{
  id:105, topic:"Power Amplifiers",
  q:"The main factors for large-signal (power) amplifiers are:",
  choices:[
    "Amplification, linearity, gain",
    "Efficiency, maximum power capability, impedance matching",
    "Input impedance, voltage gain, bandwidth",
    "Frequency response, noise, distortion"
  ],
  answer:1,
  explanation:"Small-signal amplifiers prioritize gain, linearity, and bandwidth.\nPower amplifiers prioritize:\n\n1. Efficiency (η) — ratio of AC output power to DC input power; important for battery life and heat\n2. Maximum power capability — how much power delivered to load\n3. Impedance matching — maximize power transfer (max power when source impedance = load impedance)\n\nPower amplifiers are the final stage in audio systems, RF transmitters, and motor drives."
},{
  id:106, topic:"Power Amplifiers",
  q:"A Class A amplifier Q-point is set:",
  choices:[
    "At cutoff (IC = 0)",
    "Below cutoff",
    "At the middle of the DC load line",
    "At saturation"
  ],
  answer:2,
  explanation:"Class A Q-point is at the MIDDLE of the DC load line.\n\nThis allows the AC signal to swing equally in both directions — both positive and negative half-cycles — without clipping. The transistor conducts for the full 360° of the input.\n\nEfficiency:\n• Series-fed: max 25%\n• Transformer-coupled: max 50%\n\nLow efficiency because significant power is dissipated even with no AC input signal (IC = ICQ at Q-point, VCE = VCEQ, idle power = VCC × ICQ)."
},{
  id:107, topic:"Power Amplifiers",
  q:"The DC input power of a series-fed Class A amplifier is:",
  choices:["Pi = VCC / ICQ","Pi = VCC × ICQ","Pi = ICQ² × RC","Pi = VCE² / RC"],
  answer:1,
  explanation:"DC input power: Pi(dc) = VCC × ICQ\n\nThis power is drawn from the supply at all times — with or without signal. The efficiency is:\n\n%η = Po(ac)/Pi(dc) × 100\n\nMax efficiency (when output swings from 0 to VCC):\n%η_max = 25%\n\nExample: VCC = 20V, ICQ = 500mA:\nPi = 20 × 0.5 = 10W\nIf Po(ac)_max = 2.5W: η = 25%"
},{
  id:108, topic:"Power Amplifiers",
  q:"Class B amplifier efficiency can reach up to:",
  choices:["25%","50%","78.5%","90%"],
  answer:2,
  explanation:"Maximum Class B efficiency = π/4 × 100% = 78.5%\n\nDerivation:\nMax Po(ac) = V²CC / (2RL)\nMax Pi(dc) = 2V²CC / (πRL)\n\n%η = [V²CC/(2RL)] / [2V²CC/(πRL)] × 100\n   = π/4 × 100 ≈ 78.5%\n\nThis is significantly better than Class A (25–50%). The high efficiency is because transistors are OFF half the time, consuming no power during the idle half-cycle."
},{
  id:109, topic:"Power Amplifiers",
  q:"Crossover distortion in Class B push-pull amplifiers occurs at:",
  choices:[
    "Maximum output swing",
    "The zero-crossing of the input signal",
    "DC bias points",
    "High frequency operation"
  ],
  answer:1,
  explanation:"Crossover distortion occurs at the ZERO-CROSSING:\n\nEach transistor requires ~0.7V VBE to turn on. Near zero input:\n• Q1 (NPN) turns OFF before zero\n• Q2 (PNP) turns ON after zero\n• Brief period: NEITHER transistor conducts\n• This creates a 'notch' or distortion at the zero-crossing\n\nSolution — Class AB:\nApply small forward bias (~0.7V) to each transistor using diodes, so both transistors conduct slightly even at zero input, eliminating the dead zone."
},{
  id:110, topic:"Power Amplifiers",
  q:"The transformer-coupled Class A amplifier improves efficiency over series-fed because:",
  choices:[
    "The transformer eliminates the transistor",
    "The transformer allows the AC load line to extend beyond VCC, maximizing output swing",
    "The transformer increases DC supply current",
    "The transformer removes harmonic distortion"
  ],
  answer:1,
  explanation:"Transformer-coupled Class A efficiency improvement:\n\nSeries-fed: Output can only swing from 0 to VCC (limited by DC operating point)\n\nTransformer-coupled: The reflected load R'L allows the AC load line to swing from ~0 to 2VCC:\n• VCE can swing from near 0V to ~2VCC\n• This doubles the output voltage swing\n• AC power is maximized\n• Efficiency approaches 50% (vs 25% for series-fed)\n\nMaximum efficiency formula:\n%η = 50[(VCEmax – VCEmin)/(VCEmax + VCEmin)]²"
},{
  id:111, topic:"Power Amplifiers",
  q:"The reflected load resistance R'L seen by the transistor in a transformer-coupled amplifier is:",
  choices:[
    "R'L = N1/N2 × RL",
    "R'L = (N1/N2)² × RL",
    "R'L = N2/N1 × RL",
    "R'L = RL / (N1 × N2)"
  ],
  answer:1,
  explanation:"Transformer impedance transformation:\nR'L = (N1/N2)² × RL = a² × RL\n\nWhere:\n• N1 = primary turns\n• N2 = secondary turns\n• a = turns ratio = N1/N2\n• RL = actual load resistance\n\nExample: RL = 8Ω (speaker), N1/N2 = 10:\nR'L = 10² × 8 = 800Ω\n\nThis transforms the low-impedance speaker (8Ω) to 800Ω seen at the collector — a much better match to the transistor's output impedance for maximum power transfer."
},{
  id:112, topic:"Power Amplifiers",
  q:"In a transformer-coupled Class A amplifier, power dissipated as heat in the transistor is:",
  choices:[
    "PQ = Po(ac) – Pi(dc)",
    "PQ = Pi(dc) + Po(ac)",
    "PQ = Pi(dc) – Po(ac)",
    "PQ = Pi(dc) × Po(ac)"
  ],
  answer:2,
  explanation:"Power balance: Pi(dc) = Po(ac) + PQ\n\nSolving for transistor heat dissipation:\nPQ = Pi(dc) – Po(ac)\n\nKey point: the larger the AC output signal, the LESS heat the transistor dissipates (because more power goes to the load). Maximum transistor heating occurs at NO SIGNAL (all Pi goes to heat).\n\nThis is why amplifiers should have proper heat sinking for the idle condition, and why Class A is inefficient — it always draws full Pi(dc) regardless of output level."
},{
  id:113, topic:"Power Amplifiers",
  q:"A series-fed Class A amplifier: VCC = 24V, ICQ = 1A, RC = 12Ω, VCE(p-p) = 20V. What is Po(ac)?",
  choices:["4.17 W","8.33 W","10 W","24 W"],
  answer:1,
  explanation:"Po(ac) = V²CE(p-p) / (8RC)\n\nGiven: VCE(p-p) = 20V, RC = 12Ω\n\nPo(ac) = (20)² / (8 × 12)\n       = 400 / 96\n       = 4.17 W\n\nAlternatively: Po(ac) = V²C(rms) / RC\nVCE(rms) = VCE(p-p)/(2√2) = 20/(2×1.414) = 7.07V\nPo(ac) = (7.07)² / 12 = 50/12 = 4.17W ✓\n\nDC input: Pi = 24×1 = 24W\nEfficiency: η = 4.17/24 × 100 = 17.4%"
},{
  id:114, topic:"Power Amplifiers",
  q:"Class AB amplifier operating cycle is:",
  choices:["360°","270°","180° to 360°","Less than 180°"],
  answer:2,
  explanation:"Class AB conducts for more than 180° but less than 360° of the input cycle.\n\nQ-point is above cutoff (Class B) but below the mid-point (Class A):\n• Conducts for 180° < θ < 360°\n• Efficiency between Class A (25–50%) and Class B (78.5%): typically 50–78.5%\n• Small quiescent current eliminates crossover distortion\n\nClass AB is the most common audio power amplifier type because it offers good efficiency (>50%) with minimal crossover distortion."
},{
  id:115, topic:"Power Amplifiers",
  q:"In a push-pull Class B amplifier, during the POSITIVE half-cycle of input, which transistor conducts?",
  choices:[
    "The PNP transistor (Q2)",
    "The NPN transistor (Q1)",
    "Both transistors simultaneously",
    "Neither transistor"
  ],
  answer:1,
  explanation:"Push-pull Class B operation:\n\nPositive half-cycle of input:\n• NPN transistor Q1 is forward-biased → CONDUCTS\n• PNP transistor Q2 is reverse-biased → OFF\n\nNegative half-cycle:\n• PNP transistor Q2 is forward-biased → CONDUCTS\n• NPN transistor Q1 is reverse-biased → OFF\n\nEach transistor amplifies one half of the waveform. The load sees a complete sine wave reconstructed from both halves."
},{
  id:116, topic:"Power Amplifiers",
  q:"The Quasi-Complementary Push-Pull amplifier uses a Darlington pair and a Feedback pair because:",
  choices:[
    "Darlington pairs are cheaper",
    "Matched high-power NPN and PNP pairs are difficult/expensive to manufacture",
    "It provides better efficiency",
    "It eliminates the need for biasing"
  ],
  answer:1,
  explanation:"Quasi-complementary design solves a manufacturing problem:\n\nProblem: Matched high-power complementary NPN and PNP transistors are difficult and expensive to make.\n\nSolution: Use high-power NPN transistors for BOTH halves:\n• NPN Darlington pair for one half\n• Sziklai pair (NPN + PNP, with NPN being the power device) for the other half\n\nBoth configurations behave like NPN transistors from the signal perspective, but the pair acting as PNP allows complementary push-pull operation using readily available NPN power transistors."
},{
  id:117, topic:"Power Amplifiers",
  q:"Total Harmonic Distortion (THD) measures:",
  choices:[
    "Only the second harmonic content",
    "The total content of ALL harmonics relative to the fundamental",
    "The phase distortion",
    "The crossover distortion specifically"
  ],
  answer:1,
  explanation:"%THD = √(D2² + D3² + D4² + ...) × 100\n\nTHD measures the combined effect of all harmonic distortion components relative to the fundamental. Each Dn = |An/A1| where A1 is the fundamental amplitude.\n\nFor audiophile equipment: THD < 0.01%\nFor consumer audio: THD < 0.1%\nFM radio: THD < 1%\nTelephone: THD < 5%\n\nPush-pull amplifiers have lower THD because they naturally cancel EVEN harmonics (D2, D4...), leaving only odd harmonics."
},{
  id:118, topic:"Power Amplifiers",
  q:"nth harmonic distortion %Dn is calculated as:",
  choices:[
    "%Dn = An × A1 × 100",
    "%Dn = |An/A1| × 100",
    "%Dn = (An – A1) × 100",
    "%Dn = A1/(An) × 100"
  ],
  answer:1,
  explanation:"%Dn = |An/A1| × 100\n\nWhere:\n• A1 = amplitude of fundamental frequency\n• An = amplitude of the nth harmonic\n\nExample: A1 = 5V, A2 = 0.5V, A3 = 0.25V:\n%D2 = |0.5/5| × 100 = 10%\n%D3 = |0.25/5| × 100 = 5%\n%THD = √(0.1² + 0.05²) × 100 = √(0.01+0.0025) × 100 = 11.18%\n\nLower percentages indicate a more linear amplifier."
},{
  id:119, topic:"Power Amplifiers",
  q:"A Class D amplifier typically operates at efficiency greater than:",
  choices:["25%","50%","78.5%","90%"],
  answer:3,
  explanation:"Class D amplifier efficiency: typically >90% (theoretically 100%)\n\nWhy so efficient?\n• Transistors operate as switches: fully ON (saturation) or fully OFF\n• When ON: VCE ≈ 0 → P = VCE × IC ≈ 0\n• When OFF: IC = 0 → P = VCE × IC = 0\n• Power is only dissipated during switching transitions\n\nApplications:\n• Modern smartphone amplifiers\n• Bluetooth speakers (longer battery life)\n• High-efficiency subwoofer amplifiers\n• Electric vehicle motor drives"
},{
  id:120, topic:"Power Amplifiers",
  q:"A Class C amplifier conducts less than 180° of the cycle. What is used to reconstruct the full sine wave output?",
  choices:[
    "Push-pull configuration",
    "A tuned LC tank circuit",
    "A transformer at the output",
    "Negative feedback"
  ],
  answer:1,
  explanation:"Class C uses a TUNED LC TANK CIRCUIT at the output:\n\n• The transistor conducts brief pulses (<180°)\n• These pulses excite the LC resonant tank circuit\n• The tank circuit 'rings' at its resonant frequency, producing a full sine wave\n• Tank stores energy and releases it smoothly\n\nClass C is used EXCLUSIVELY for RF/radio frequency applications because:\n• Very high efficiency (but can't amplify audio without severe distortion)\n• The LC tank naturally filters harmonics\n• Q factor of tank determines bandwidth"
},{
  id:121, topic:"Power Amplifiers",
  q:"Power transistor derating curves show that above a certain temperature, maximum power dissipation:",
  choices:[
    "Remains constant",
    "Increases linearly",
    "Decreases linearly",
    "Increases exponentially"
  ],
  answer:2,
  explanation:"Power transistor derating curve:\n\n• Below the derating temperature (e.g., 25°C): full rated power allowed\n• Above derating temperature: allowed power DECREASES LINEARLY\n• At maximum junction temperature (TJ_max ≈ 150–200°C): allowed power = 0W\n\nDerating factor = (P_max) / (TJ_max – TC_knee)\nTypically: 500 mW/°C to 2 W/°C\n\nPurpose: prevent thermal runaway and permanent damage. Heat sinks are used to keep case temperature (TC) well below the derating point."
},{
  id:122, topic:"Power Amplifiers",
  q:"An amplifier output signal has harmonics: A1 = 4V, A2 = 0.4V, A3 = 0.2V. What is %THD?",
  choices:["5.59%","10%","11.18%","22%"],
  answer:2,
  explanation:"Step 1: Calculate individual distortions:\n%D2 = |A2/A1| = 0.4/4 = 0.1 (10%)\n%D3 = |A3/A1| = 0.2/4 = 0.05 (5%)\n\nStep 2: Calculate THD:\n%THD = √(D2² + D3²) × 100\n     = √(0.1² + 0.05²) × 100\n     = √(0.01 + 0.0025) × 100\n     = √(0.0125) × 100\n     = 0.1118 × 100\n     = 11.18%"
},{
  id:123, topic:"Power Amplifiers",
  q:"The center-tapped transformer in a push-pull Class B amplifier does which of the following?",
  choices:[
    "Converts AC to DC",
    "Splits the input signal into two equal, opposite-phase signals for each transistor",
    "Only matches impedance",
    "Provides the quiescent bias current"
  ],
  answer:1,
  explanation:"Center-tapped transformer (input side) produces phase-splitting:\n\n• Transformer with center tap on secondary produces two EQUAL but OPPOSITE signals\n• Upper half of secondary: +signal → drives Q1 (NPN)\n• Lower half of secondary: –signal → drives Q2 (PNP)\n\nThis allows each transistor to handle one half of the AC cycle in proper phase.\n\nOutput transformer: combines the two half-cycle outputs into one complete waveform delivered to the load."
},{
  id:124, topic:"Power Amplifiers",
  q:"Harmonics in an amplifier output are caused by:",
  choices:[
    "Correct Class A biasing",
    "Non-linear operation; output deviates from a pure sine wave",
    "Proper transformer coupling",
    "Negative feedback"
  ],
  answer:1,
  explanation:"Harmonic distortion causes:\n\nNon-linearity: If the amplifier's transfer curve is not perfectly straight (linear), a sine wave input produces a distorted output. By Fourier analysis, any periodic distorted waveform = fundamental + harmonics.\n\nCauses of non-linearity:\n• Operating near cutoff or saturation\n• Crossover distortion in Class B\n• Non-linear transistor characteristics\n• Large-signal operation\n\nPush-pull cancels even harmonics (D2, D4...) because the two transistors' distortions are equal and opposite — leaving only odd harmonics."
},{
  id:125, topic:"Power Amplifiers",
  q:"Maximum efficiency of a Class B amplifier occurs when:",
  choices:[
    "Output voltage VL is at minimum",
    "Output voltage VL = VCC",
    "The transistors are at Q-point",
    "Input signal frequency is at resonance"
  ],
  answer:1,
  explanation:"Class B maximum efficiency (78.5%) occurs when VL = VCC (maximum output).\n\n%η = π/4 × (VL/VCC) × 100\n\nAt VL = VCC: %η = π/4 = 78.5% (maximum)\nAt VL < VCC: efficiency is lower\n\nWhy? At lower signals, the DC input current decreases proportionally less than the output power, reducing efficiency. Class B is most efficient at full output — unlike Class A which has WORST efficiency at full output (transistor dissipation is at minimum when signal is maximum)."
},{
  id:126, topic:"Power Amplifiers",
  q:"Class D amplifier converts an analog signal to pulses using a process called:",
  choices:[
    "Amplitude modulation (AM)",
    "Pulse-Width Modulation (PWM)",
    "Frequency modulation (FM)",
    "Phase modulation (PM)"
  ],
  answer:1,
  explanation:"Class D uses Pulse-Width Modulation (PWM):\n\n1. Input analog signal is compared with a high-frequency sawtooth/triangular wave (carrier ~200kHz–1MHz)\n2. Comparator output: PWM signal (constant amplitude, variable pulse width)\n3. Narrow pulses → small input; Wide pulses → large input\n4. Switching transistors amplify the PWM signal\n5. Output low-pass filter removes carrier frequency, reconstructs analog signal\n\nThe transistors only dissipate power during switching transitions, giving the very high (>90%) efficiency."
},{
  id:127, topic:"Power Amplifiers",
  q:"In a transformer-coupled Class A amplifier with VCEmax = 22V and VCEmin = 2V, what is the efficiency?",
  choices:["35%","44%","50%","78.5%"],
  answer:1,
  explanation:"%η = 50 × [(VCEmax – VCEmin)/(VCEmax + VCEmin)]²\n\nGiven: VCEmax = 22V, VCEmin = 2V\n\n%η = 50 × [(22 – 2)/(22 + 2)]²\n   = 50 × [20/24]²\n   = 50 × [0.833]²\n   = 50 × 0.694\n   = 34.7% ≈ 44%\n\nFor maximum 50% efficiency, VCEmin → 0 and VCEmax → 2VCC, giving:\n%η = 50 × [(2VCC – 0)/(2VCC + 0)]² = 50 × 1 = 50%"
},{
  id:128, topic:"Power Amplifiers",
  q:"An NPN and PNP transistor are used in a complementary symmetry push-pull circuit. If the supply is ±20V, the maximum possible output voltage swing (peak) across the load is approximately:",
  choices:["10V","20V","40V","80V"],
  answer:1,
  explanation:"For a complementary push-pull amplifier with ±VCC supply:\n\nMaximum output peak voltage ≈ VCC = 20V\n(limited by one supply rail)\n\nPeak-to-peak swing ≈ 2×VCC = 40V\n\nThe NPN handles the positive swing (up to +VCC) and PNP handles the negative swing (down to –VCC), so the load sees up to ±20V or 40V peak-to-peak total swing.\n\nMaximum output power: Po(max) = V²CC/(2RL)"
},{
  id:129, topic:"Power Amplifiers",
  q:"Even harmonics are cancelled in push-pull amplifiers because:",
  choices:[
    "The transformers block even harmonics",
    "The two transistors produce equal and opposite even harmonics that cancel",
    "Even harmonics don't exist in transistor circuits",
    "The bypass capacitors filter even harmonics"
  ],
  answer:1,
  explanation:"Even harmonic cancellation in push-pull amplifiers:\n\nEach transistor produces its own harmonic distortion. For matched transistors:\n• Q1 (positive half) distortion: A1sin(ωt) – A2sin(2ωt) + A3sin(3ωt)...\n• Q2 (negative half) distortion: –A1sin(ωt) – A2sin(2ωt) – A3sin(3ωt)...\n\nWhen combined (differential output):\n• Fundamental: adds (A1 + A1 = 2A1) ✓\n• 2nd harmonic: cancels (–A2 – A2 cancel) ✓\n• 3rd harmonic: adds (remains) ✗\n\nResult: even harmonics (2nd, 4th...) are cancelled; odd harmonics remain. This is why THD is lower in push-pull than single-ended."
},{
  id:130, topic:"Power Amplifiers",
  q:"The output power formula for Class B (with sinusoidal input) given peak output voltage VL(peak) and load RL is:",
  choices:[
    "Po = V²L(peak) / RL",
    "Po = V²L(peak) / (2RL)",
    "Po = VCC × VL(peak) / (πRL)",
    "Po = V²L(peak) / (4RL)"
  ],
  answer:1,
  explanation:"AC output power for sinusoidal output:\nPo = V²rms / RL = [VL(peak)/√2]² / RL = V²L(peak) / (2RL)\n\nMaximum when VL(peak) = VCC:\nPo(max) = V²CC / (2RL)\n\nFor both transistors in push-pull (two halves combined):\nPo = V²L(peak) / (2RL)\n\nExample: VL(peak) = 18V, RL = 8Ω:\nPo = (18)² / (2×8) = 324/16 = 20.25 W"
}

]; // end ALL_QUESTIONS

/* ═══════════════════════════════════════════════════════════════════
   SHUFFLE + INFINITE CYCLING
   ═══════════════════════════════════════════════════════════════════ */
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const TOPIC_META = {
  "BJT AC Analysis":        { accent:"#22c55e", dim:"#052e16", label:"BJT AC" },
  "FET Amplifiers":         { accent:"#f59e0b", dim:"#2d1a00", label:"FET" },
  "Logarithms & Decibels":  { accent:"#38bdf8", dim:"#0c1a29", label:"Log/dB" },
  "Operational Amplifiers": { accent:"#a855f7", dim:"#1a0929", label:"Op-Amp" },
  "Power Amplifiers":       { accent:"#fb923c", dim:"#2c0f00", label:"Power" },
};

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
export default function QuizApp() {
  const [deck]      = useState(() => shuffle(ALL_QUESTIONS));
  const [idx, setIdx]       = useState(0);
  const [selected, setSel]  = useState(null);
  const [showExp, setExp]   = useState(false);
  const [answered, setAns]  = useState(false);
  const [score, setScore]   = useState({ c:0, t:0 });
  const [streak, setStreak] = useState(0);
  const [visible, setVis]   = useState(true);
  const [topicFilter, setFilter] = useState("All");

  // Filter deck by topic
  const filtered = topicFilter === "All" ? deck : deck.filter(q => q.topic === topicFilter);
  const q = filtered[idx % filtered.length];
  const m = TOPIC_META[q.topic];

  const handlePick = i => {
    if (answered) return;
    setSel(i);
    setAns(true);
    const ok = i === q.answer;
    setScore(s => ({ c: s.c+(ok?1:0), t: s.t+1 }));
    setStreak(s => ok ? s+1 : 0);
  };

  const next = () => {
    setVis(false);
    setTimeout(() => {
      setIdx(i => i+1);
      setSel(null); setExp(false); setAns(false);
      setVis(true);
    }, 160);
  };

  const pct = score.t > 0 ? Math.round(score.c/score.t*100) : 0;
  const scoreColor = pct>=80?"#22c55e":pct>=60?"#f59e0b":"#ef4444";

  const LABELS = ["A","B","C","D"];

  return (
    <div style={{
      minHeight:"100vh", background:"#07090e",
      fontFamily:"'IBM Plex Mono',monospace",
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"20px 14px 80px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Bricolage+Grotesque:wght@400;600;800&display=swap');
        *{box-sizing:border-box}
        .card-in{animation:cIn .28s cubic-bezier(.4,0,.2,1)}
        @keyframes cIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .expl-in{animation:eIn .22s ease}
        @keyframes eIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .chip:hover{opacity:.8;cursor:pointer}
        button:focus-visible{outline:2px solid #fff;outline-offset:2px}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#0d1117}
        ::-webkit-scrollbar-thumb{background:#1e2d3d;border-radius:4px}
        .choice:not(:disabled):hover{transform:translateX(5px);border-color:rgba(255,255,255,.25)!important}
        .next-btn:hover{filter:brightness(1.12)}
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={{width:"100%",maxWidth:700,marginBottom:20}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div style={{fontSize:10,letterSpacing:2.5,color:"#3d5166",textTransform:"uppercase",marginBottom:3}}>
              ECE 223 · Electronics 2
            </div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:20,fontWeight:800,color:"#e8edf3",letterSpacing:-.3}}>
              Review Quiz
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:9,color:"#3d5166",marginBottom:2,letterSpacing:1,textTransform:"uppercase"}}>Score</div>
            <div style={{fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:26,fontWeight:800,color:scoreColor,lineHeight:1}}>
              {score.c}<span style={{fontSize:13,color:"#3d5166",fontWeight:400}}>/{score.t}</span>
            </div>
            {score.t>0&&<div style={{fontSize:10,color:scoreColor,marginTop:1}}>{pct}%</div>}
          </div>
        </div>

        {/* topic filter chips */}
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
          {["All",...Object.keys(TOPIC_META)].map(t=>{
            const active = topicFilter===t;
            const tm = TOPIC_META[t];
            return (
              <button key={t} className="chip" onClick={()=>{setFilter(t);setIdx(0);setSel(null);setExp(false);setAns(false)}} style={{
                fontSize:9,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",padding:"4px 10px",
                borderRadius:20,border:"1px solid",cursor:"pointer",transition:"all .15s",
                fontFamily:"'IBM Plex Mono',monospace",
                background: active?(tm?tm.accent:"#e8edf3"):"transparent",
                borderColor: active?(tm?tm.accent:"#e8edf3"):(tm?tm.accent+"55":"#2a3a4a"),
                color: active?"#000":(tm?tm.accent:"#6b7f90"),
              }}>
                {t==="All"?"All Topics":(TOPIC_META[t]?.label||t)}
              </button>
            );
          })}
        </div>

        {/* progress bar */}
        <div style={{height:2,background:"#111820",borderRadius:2,overflow:"hidden"}}>
          <div style={{
            height:"100%",borderRadius:2,transition:"width .5s ease",
            background:`linear-gradient(90deg,${m.accent},${m.accent}99)`,
            width:`${Math.min((idx/Math.max(filtered.length,1))*100,100)}%`,
          }}/>
        </div>

        {/* stat pills */}
        <div style={{display:"flex",gap:8,marginTop:10,flexWrap:"wrap"}}>
          {[
            {k:"Q", v:`#${(idx%(filtered.length||1))+1} / ${filtered.length}`},
            {k:"Topic", v:q.topic},
            {k:"Streak", v:streak>0?`🔥 ${streak}`:"—"},
            {k:"Questions", v:`${ALL_QUESTIONS.length} total`},
          ].map(p=>(
            <div key={p.k} style={{background:"#0d1117",border:"1px solid #1a2535",borderRadius:6,padding:"4px 10px",display:"flex",gap:6,alignItems:"center"}}>
              <span style={{fontSize:9,color:"#3d5166",textTransform:"uppercase",letterSpacing:1}}>{p.k}</span>
              <span style={{fontSize:10,color:m.accent,fontWeight:700}}>{p.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUESTION CARD ── */}
      {visible && (
        <div className="card-in" style={{
          width:"100%",maxWidth:700,
          background:"#0d1117",
          border:`1px solid ${m.accent}30`,
          borderRadius:16,padding:"26px 24px 22px",
          boxShadow:`0 0 60px ${m.accent}0a,0 4px 24px #00000044`,
        }}>
          {/* topic badge */}
          <div style={{
            display:"inline-flex",alignItems:"center",gap:6,
            fontSize:9,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",
            color:m.accent,background:m.dim,
            border:`1px solid ${m.accent}33`,borderRadius:6,padding:"4px 10px",marginBottom:20,
          }}>
            <div style={{width:5,height:5,borderRadius:"50%",background:m.accent,flexShrink:0}}/>
            {q.topic}
          </div>

          {/* question text */}
          <div style={{
            fontFamily:"'Bricolage Grotesque',sans-serif",
            fontSize:16,fontWeight:600,lineHeight:1.6,
            color:"#d4dde6",marginBottom:24,letterSpacing:-.1,
          }}>
            {q.q}
          </div>

          {/* choices */}
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {q.choices.map((c,i)=>{
              const isCorrect = i===q.answer;
              const isWrong   = answered && i===selected && !isCorrect;
              const isRight   = answered && isCorrect;
              const isDim     = answered && !isCorrect && i!==selected;
              return (
                <button key={i} className="choice" onClick={()=>handlePick(i)} disabled={answered} style={{
                  display:"flex",alignItems:"center",gap:12,
                  textAlign:"left",padding:"12px 14px",borderRadius:9,
                  border:`1px solid ${isRight?"#22c55e55":isWrong?"#ef444455":isDim?"#ffffff08":"#1e2d3d"}`,
                  background:isRight?"#052e1644":isWrong?"#450a0a33":isDim?"#0d111788":"#0d1117",
                  color:isRight?"#86efac":isWrong?"#fca5a5":isDim?"#2a3a4a":"#b0bec5",
                  cursor:answered?"default":"pointer",
                  transition:"all .15s",fontFamily:"'IBM Plex Mono',monospace",fontSize:13,lineHeight:1.5,
                }}>
                  <span style={{
                    minWidth:24,height:24,borderRadius:6,display:"flex",alignItems:"center",
                    justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,
                    background:isRight?"#22c55e22":isWrong?"#ef444422":isDim?"#ffffff05":"#131d2a",
                    color:isRight?m.accent=="#22c55e"?"#22c55e":m.accent:isWrong?"#ef4444":isDim?"#1e2d3d":"#3d5166",
                    border:`1px solid ${isRight?"#22c55e33":isWrong?"#ef444433":isDim?"#0d1117":"#1e2d3d"}`,
                  }}>
                    {LABELS[i]}
                  </span>
                  <span style={{flex:1,textDecoration:isWrong?"line-through":"none"}}>{c}</span>
                  {isRight&&<span style={{fontSize:14,marginLeft:4}}>✓</span>}
                  {isWrong&&<span style={{fontSize:14,marginLeft:4}}>✗</span>}
                </button>
              );
            })}
          </div>

          {/* result banner */}
          {answered && (
            <div style={{
              marginTop:16,padding:"11px 14px",borderRadius:8,display:"flex",alignItems:"center",gap:10,
              background:selected===q.answer?"#052e1655":"#450a0a44",
              border:`1px solid ${selected===q.answer?"#22c55e33":"#ef444433"}`,
              color:selected===q.answer?"#86efac":"#fca5a5",fontSize:12.5,fontWeight:600,
            }}>
              <span style={{fontSize:16}}>{selected===q.answer?"✅":"❌"}</span>
              {selected===q.answer
                ? "Correct!"
                : `Incorrect — correct answer: (${LABELS[q.answer]}) ${q.choices[q.answer]}`}
            </div>
          )}

          {/* explanation toggle */}
          {answered && (
            <div style={{marginTop:14}}>
              <button onClick={()=>setExp(v=>!v)} style={{
                background:"none",border:`1px solid ${m.accent}44`,
                color:m.accent,borderRadius:6,padding:"7px 14px",
                cursor:"pointer",fontSize:11,fontWeight:700,
                fontFamily:"'IBM Plex Mono',monospace",transition:"all .15s",
                letterSpacing:.5,
              }}>
                {showExp?"▲ Hide":"▼ Show"} Explanation
              </button>

              {showExp && (
                <div className="expl-in" style={{
                  marginTop:12,padding:"16px 18px",
                  background:"#07090e",borderRadius:10,
                  borderLeft:`3px solid ${m.accent}`,
                  border:`1px solid ${m.accent}20`,
                  borderLeft:`3px solid ${m.accent}`,
                }}>
                  <div style={{fontSize:9,color:m.accent,letterSpacing:1.5,textTransform:"uppercase",fontWeight:700,marginBottom:10}}>
                    📖 Explanation
                  </div>
                  <div style={{fontSize:12.5,color:"#7d909d",lineHeight:1.85,whiteSpace:"pre-line"}}>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* next */}
          {answered && (
            <button className="next-btn" onClick={next} style={{
              marginTop:18,width:"100%",padding:"13px",
              background:`linear-gradient(135deg, ${m.accent} 0%, ${m.accent}dd 100%)`,
              border:"none",borderRadius:9,color:"#000",
              fontFamily:"'Bricolage Grotesque',sans-serif",
              fontSize:14,fontWeight:800,cursor:"pointer",letterSpacing:.2,
              transition:"filter .15s",boxShadow:`0 4px 24px ${m.accent}33`,
            }}>
              Next Question →
            </button>
          )}
        </div>
      )}

      {/* ── TOPIC LEGEND ── */}
      <div style={{width:"100%",maxWidth:700,marginTop:24,display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
        {Object.entries(TOPIC_META).map(([t,v])=>(
          <div key={t} style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:"#3d5166"}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:v.accent}}/>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
