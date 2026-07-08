/*
 * anthology.ts — the curated heart of the app: 41 famous ashaar with
 * VERIFIED attribution. One dataset, three jobs (spec §4): the browsable
 * anthology, the attribution ground truth, and the eval gold set.
 *
 * HONESTY CONTRACT: every `sourceUrl` below was actually loaded and read
 * during curation (see .superpowers/sdd/task-4-curation-log.md for the
 * per-sher evidence log). Each source — almost always the Rekhta.org page
 * for that ghazal/couplet — confirmed BOTH the poet AND the couplet text.
 * The Nastaliq `urduScript` is transcribed to match the exact romanized
 * couplet returned by that source. Do NOT add an entry you could not
 * verify against a real loaded page — refusing to guess is the whole point
 * of this app.
 */
import type { AnthologyEntry } from '../types';

export const anthology: AnthologyEntry[] = [
	// ─── Mir Taqi Mir (1723–1810) ──────────────────────────────────────────
	{
		slug: 'mir-patta-patta',
		urduScript: 'پتا پتا بوٹا بوٹا حال ہمارا جانے ہے\nجانے نہ جانے گل ہی نہ جانے باغ تو سارا جانے ہے',
		romanUrdu: 'patta patta boota boota haal hamara jaane hai\njaane na jaane gul hi na jaane bagh to sara jaane hai',
		poet: 'Mir Taqi Mir',
		poetUrdu: 'میر تقی میر',
		era: '1723–1810 · Mughal Delhi & Lucknow',
		referenceExplanation:
			'Mir maps his heartbreak onto an entire landscape: every leaf, every shrub, every blade of grass knows the state he is in. The paradox lands in the second line — the flower (gul), the very beloved for whom the garden exists, is the one who does not know, while the whole garden (bagh) knows everything. On the surface it is a lover’s complaint that the object of his love stays oblivious even as strangers perceive his suffering. Read deeper, it is Mir’s signature move: dissolving the boundary between self and nature so that grief becomes atmospheric, almost pantheistic. The device is tazad (antithesis) braced by insistent repetition — "patta patta, boota boota" and the doubled "jaane" — whose beat imitates the ache spreading outward. The old-Delhi idiom "jaane hai" (for "jaanta hai") gives Mir his plain, wounded music.',
		themes: ['heartbreak', 'nature', 'oblivious beloved'],
		sourceUrl:
			'https://www.rekhta.org/ghazals/pattaa-pattaa-buutaa-buutaa-haal-hamaaraa-jaane-hai-meer-taqi-meer-ghazals'
	},
	{
		slug: 'mir-ulti-ho-gain-tadbiren',
		urduScript: 'الٹی ہو گئیں سب تدبیریں کچھ نہ دوا نے کام کیا\nدیکھا اس بیماریِ دل نے آخر کام تمام کیا',
		romanUrdu: 'ulti ho gain sab tadbiren kuchh na dawa ne kaam kiya\ndekha is bimari-e-dil ne aakhir kaam tamam kiya',
		poet: 'Mir Taqi Mir',
		poetUrdu: 'میر تقی میر',
		era: '1723–1810 · Mughal Delhi & Lucknow',
		referenceExplanation:
			'Every remedy backfired; no medicine worked — and in the end the "sickness of the heart" finished the job, i.e. killed him. Literally it is the deathbed report of a lover whose ailment was love itself, beyond the reach of any physician. The deeper reading is Mir’s tragic fatalism: love is diagnosed as a terminal illness, and human "tadbir" (planning, contrivance) is powerless against a decreed "taqdir". The couplet’s force comes from its clinical vocabulary — tadbir, dawa, bimari, kaam tamam — a whole medical register turned into metaphor for doomed passion. Note the grim pun in "kaam tamam kiya": it means both "completed the task" and "did him in". The plainness is deliberate; Mir lets understatement carry devastation, which is exactly why the line became proverbial in Urdu for efforts that come to nothing.',
		themes: ['fate', 'love as illness', 'mortality'],
		sourceUrl:
			'https://www.rekhta.org/ghazals/ultii-ho-gaiin-sab-tadbiiren-kuchh-na-davaa-ne-kaam-kiyaa-meer-taqi-meer-ghazals'
	},
	{
		slug: 'mir-dikhai-diye-yun',
		urduScript: 'دکھائی دیے یوں کہ بے خود کیا\nہمیں آپ سے بھی جدا کر چلے',
		romanUrdu: 'dikhai diye yun ki bekhud kiya\nhamein aap se bhi juda kar chale',
		poet: 'Mir Taqi Mir',
		poetUrdu: 'میر تقی میر',
		era: '1723–1810 · Mughal Delhi & Lucknow',
		referenceExplanation:
			'The beloved appeared so dazzlingly that the lover was rendered "bekhud" — beside himself, emptied of self — and in that very appearing, they separated him even from his own self ("aap se bhi juda"). Literally, a single glimpse undoes his composure. The deeper reading turns on the Sufi double meaning of "aap": it is both the polite "you" (the beloved) and "one’s own self". So the sher describes fana — the annihilation of ego in the presence of the beloved/Divine, where union paradoxically means the loss of the self that sought it. The device is iham (deliberate ambiguity) on "aap", plus the paradox that being shown something makes you lose sight of yourself. Made unforgettable by Lata Mangeshkar’s rendition in the film Bazaar, the couplet compresses Mir’s whole metaphysics of love into two short, quiet lines.',
		themes: ['self-annihilation', 'mysticism', 'union'],
		sourceUrl: 'https://www.rekhta.org/couplets/dikhaaii-diye-yuun-ki-be-khud-kiyaa-mir-taqi-mir-couplets'
	},
	{
		slug: 'mir-hasti-apni-hubab',
		urduScript: 'ہستی اپنی حباب کی سی ہے\nیہ نمائش سراب کی سی ہے',
		romanUrdu: 'hasti apni hubab ki si hai\nye numaish sarab ki si hai',
		poet: 'Mir Taqi Mir',
		poetUrdu: 'میر تقی میر',
		era: '1723–1810 · Mughal Delhi & Lucknow',
		referenceExplanation:
			'Our existence, Mir says, is like a bubble (hubab), and this whole worldly display (numaish) is like a mirage (sarab). Literally: life is fragile and short, and its grandeur is an illusion. The deeper reading is classic Sufi and Buddhist-tinged transience — the bubble forms on water and bursts in the same instant, the mirage dazzles from afar and dissolves when approached; both look real yet cannot be grasped. The two images are precisely chosen: the bubble figures the brevity of being, the mirage the falseness of appearances, so line one indicts our substance and line two our spectacle. The device is tashbih (simile), doubled and parallel — "ki si hai" chiming at both line-ends — which makes the couplet feel like a settled verdict rather than a fresh thought. Its stark economy is why it is quoted whenever Urdu speakers reach for the vanity of the world.',
		themes: ['transience', 'illusion', 'mortality'],
		sourceUrl: 'https://www.rekhta.org/ghazals/hastii-apnii-habaab-kii-sii-hai-meer-taqi-meer-ghazals'
	},

	// ─── Mirza Ghalib (1797–1869) ──────────────────────────────────────────
	{
		slug: 'ghalib-hazaron-khwahishen',
		urduScript: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
		romanUrdu: 'hazaron khwahishen aisi ke har khwahish pe dam nikle\nbahut nikle mere armaan lekin phir bhi kam nikle',
		poet: 'Mirza Ghalib',
		poetUrdu: 'مرزا غالب',
		era: '1797–1869 · Mughal Delhi',
		referenceExplanation:
			'A thousand desires, each so intense that fulfilling it could cost a life; many of my longings were realised, and yet they were still too few. Literally, Ghalib confesses an appetite for life and love that no amount of fulfilment can exhaust. The deeper reading is a meditation on human insatiability itself: desire is not a problem to be solved but the very engine of being, and even a lifetime of satisfied wishes leaves the ledger short. The pun sits in "dam nikle" — literally "the breath departs" (death), figuratively "to yearn to the point of expiry". Ghalib sets a hyperbole (each wish worth dying for) against a deflation (yet still not enough), and the repetition of "nikle" as radif — dam nikle, kam nikle — stitches death and shortfall into one breath. It is the most quoted opening couplet in Urdu, and a whole worldview in two lines.',
		themes: ['desire', 'insatiability', 'mortality'],
		sourceUrl:
			'https://www.rekhta.org/ghazals/hazaaron-khvaahishen-aisii-ki-har-khvaahish-pe-dam-nikle-mirza-ghalib-ghazals'
	},
	{
		slug: 'ghalib-ye-na-thi-hamari-qismat',
		urduScript: 'یہ نہ تھی ہماری قسمت کہ وصالِ یار ہوتا\nاگر اور جیتے رہتے یہی انتظار ہوتا',
		romanUrdu: 'ye na thi hamari qismat ke visal-e-yar hota\nagar aur jite rahte yahi intizar hota',
		poet: 'Mirza Ghalib',
		poetUrdu: 'مرزا غالب',
		era: '1797–1869 · Mughal Delhi',
		referenceExplanation:
			'It was simply not in my fate to be united with the beloved — and had I gone on living longer, it would only have been this same waiting, endlessly. Literally, Ghalib resigns himself: union was never destined, so a longer life would have bought only more of the same suspense. The deeper reading is his cool, almost sardonic argument with fate: he reframes his own death not as tragedy but as escape from an infinite waiting-room, turning despair into a kind of grim logic. The rhetorical engine is the counterfactual "agar… hota" (had I lived on), which lets him reason past his own grave. "Visal" (union) and "intizar" (waiting) are set as poles of the lover’s condition, and the flat, conversational tone — no wailing, just deduction — is exactly what makes the resignation cut so deep. It opens one of Ghalib’s most beloved ghazals.',
		themes: ['fate', 'separation', 'longing'],
		sourceUrl:
			'https://www.rekhta.org/ghazals/ye-na-thii-hamaarii-qismat-ki-visaal-e-yaar-hotaa-mirza-ghalib-ghazals'
	},
	{
		slug: 'ghalib-koi-ummid-bar-nahin',
		urduScript: 'کوئی امید بر نہیں آتی\nکوئی صورت نظر نہیں آتی',
		romanUrdu: 'koi ummid bar nahin aati\nkoi surat nazar nahin aati',
		poet: 'Mirza Ghalib',
		poetUrdu: 'مرزا غالب',
		era: '1797–1869 · Mughal Delhi',
		referenceExplanation:
			'No hope comes to fruition; no way out is anywhere in sight. Literally, every expectation fails and every path forward looks blocked. The deeper reading is one of Urdu’s purest expressions of depressive stasis — not a sharp grief but a grey, total fatigue in which the very faculty of hoping has gone dark. Ghalib keeps the diction bare and the two lines almost mirror-images: "ummid bar nahin aati" (no hope ripens) rhymes structurally with "surat nazar nahin aati" (no face/prospect appears), so the couplet closes like a door on both future and vision at once. The word "surat" carries iham — it means both "a way/solution" and "a face", so the line also hints that not even the beloved’s face is to be seen. This matla opens a famously bleak ghazal that circles around weariness with existence itself.',
		themes: ['despair', 'hopelessness', 'weariness'],
		sourceUrl: 'https://www.rekhta.org/ghazals/koii-ummiid-bar-nahiin-aatii-mirza-ghalib-ghazals'
	},
	{
		slug: 'ghalib-dil-e-nadan',
		urduScript: 'دلِ ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے',
		romanUrdu: 'dil-e-nadan tujhe hua kya hai\naakhir is dard ki dawa kya hai',
		poet: 'Mirza Ghalib',
		poetUrdu: 'مرزا غالب',
		era: '1797–1869 · Mughal Delhi',
		referenceExplanation:
			'O naive heart, what has come over you? After all, what is the cure for this pain? Literally, Ghalib addresses his own heart with mixed tenderness and exasperation, as one might scold a foolish child who has fallen in love. The deeper reading lies in the unanswered question: he asks for a "dawa" (cure) precisely because he knows the ailment of love has none, so the question is really a confession that the pain is incurable and the heart’s naivety incorrigible. The device is apostrophe — the poet splitting himself in two to interrogate his own heart as a separate, wayward person — a favourite Ghalib manoeuvre that dramatises inner conflict. The doubled "kya hai" turns both lines into open questions with no reply, and that suspended, questioning music is why the ghazal has been sung so often. It stages the intellect helplessly cross-examining desire.',
		themes: ['love', 'inner conflict', 'incurable pain'],
		sourceUrl: 'https://www.rekhta.org/ghazals/dil-e-naadaan-tujhe-huaa-kyaa-hai-mirza-ghalib-ghazals'
	},
	{
		slug: 'ghalib-ishq-par-zor-nahin',
		urduScript: 'عشق پر زور نہیں ہے یہ وہ آتش غالبؔ\nکہ لگائے نہ لگے اور بجھائے نہ بنے',
		romanUrdu: 'ishq par zor nahin hai ye wo aatish ghalib\nke lagae na lage aur bujhae na bane',
		poet: 'Mirza Ghalib',
		poetUrdu: 'مرزا غالب',
		era: '1797–1869 · Mughal Delhi',
		referenceExplanation:
			'One has no power over love, Ghalib says; it is that fire which cannot be lit at will, nor put out once it catches. Literally, love arrives and departs on its own terms, immune to human control. The deeper reading is a statement about the autonomy of passion — you cannot manufacture love by trying, and once it burns you cannot extinguish it by trying either, so the lover is doubly helpless, at both ends of the flame. The central metaphor is aatish (fire), whose two impossibilities are laid out in a tight parallel: "lagae na lage" (kindle, yet it won’t kindle) against "bujhae na bane" (douse, yet it won’t be done). That balanced antithesis (tazad) makes the line feel like a proved law of nature. Ghalib names himself in the sher, a takhallus placement that lets the maxim land as hard-won personal testimony.',
		themes: ['love', 'helplessness', 'passion'],
		sourceUrl: 'https://www.rekhta.org/couplets/ishq-par-zor-nahiin-hai-ye-vo-aatish-gaalib-mirza-ghalib-couplets'
	},

	// ─── Momin Khan Momin (1800–1852) ──────────────────────────────────────
	{
		slug: 'momin-tum-mere-pas-hote',
		urduScript: 'تم مرے پاس ہوتے ہو گویا\nجب کوئی دوسرا نہیں ہوتا',
		romanUrdu: 'tum mere pas hote ho goya\njab koi dusra nahin hota',
		poet: 'Momin Khan Momin',
		poetUrdu: 'مومن خان مومن',
		era: '1800–1852 · Mughal Delhi',
		referenceExplanation:
			'It is as if you are with me — whenever no one else is there. Literally, in the poet’s solitude the beloved feels vividly present. The genius is the ambiguity of "jab koi dusra nahin hota": it can mean "when I am alone" (in loneliness I imagine you near), or "when no third person is around" (you come to me only in secret), or even, mystically, "when nothing else exists at all, you are there". Each reading reshuffles who is present and who absent. Legend holds that Ghalib offered Momin his entire divan in exchange for this one sher — apocryphal, but a measure of its fame. The device is precisely this iham (deliberate multivalence) folded into utterly plain words; there is not a single ornate term, yet the line opens like a hall of mirrors. It is Momin’s most quoted couplet and a masterclass in doing the most with the least.',
		themes: ['presence', 'solitude', 'imagined union'],
		sourceUrl: 'https://www.rekhta.org/ghazals/asar-us-ko-zaraa-nahiin-hotaa-momin-khan-momin-ghazals'
	},
	{
		slug: 'momin-wo-jo-hum-mein-tum-mein',
		urduScript: 'وہ جو ہم میں تم میں قرار تھا تمہیں یاد ہو کہ نہ یاد ہو\nوہی یعنی وعدہ نباہ کا تمہیں یاد ہو کہ نہ یاد ہو',
		romanUrdu: 'wo jo hum mein tum mein qarar tha tumhein yaad ho ke na yaad ho\nwahi yani wada nibah ka tumhein yaad ho ke na yaad ho',
		poet: 'Momin Khan Momin',
		poetUrdu: 'مومن خان مومن',
		era: '1800–1852 · Mughal Delhi',
		referenceExplanation:
			'That understanding there once was between us — you may or may not remember it; that very pledge to keep faith — you may or may not remember. Literally, the lover reminds a now-distant beloved of a settled bond ("qarar") and a promise of constancy ("wada nibah"). The deeper reading lives in the refrain "tumhein yaad ho ke na yaad ho": by conceding in advance that she may have forgotten, the poet turns memory itself into the accusation — the forgetting is the betrayal. The whole ghazal is a musalsal (continuous) sequence built on this single haunting radif, so each couplet reopens the same wound of remembered love. The device is that insistent repetition, tender and reproachful at once, which is why the ghazal became a standard of the qawwali and ghazal repertoire. Its restraint — no anger, only the ache of "do you even recall" — is the source of its power.',
		themes: ['lost love', 'memory', 'broken promise'],
		sourceUrl:
			'https://www.rekhta.org/ghazals/vo-jo-ham-men-tum-men-qaraar-thaa-tumhen-yaad-ho-ki-na-yaad-ho-momin-khan-momin-ghazals'
	},

	// ─── Shaikh Ibrahim Zauq (1790–1854) ───────────────────────────────────
	{
		slug: 'zauq-layi-hayat-aae-qaza',
		urduScript: 'لائی حیات آئے قضا لے چلی چلے\nاپنی خوشی نہ آئے نہ اپنی خوشی چلے',
		romanUrdu: 'layi hayat aae qaza le chali chale\napni khushi na aae na apni khushi chale',
		poet: 'Shaikh Ibrahim Zauq',
		poetUrdu: 'شیخ ابراہیم ذوق',
		era: '1790–1854 · Mughal Delhi',
		referenceExplanation:
			'Life brought me, so I came; death leads me away, so I go — I neither arrived of my own will nor depart of my own will. Literally, both the great events that frame a human life, birth and death, lie entirely outside our choosing. The deeper reading is a serene fatalism: the self is a passenger, not a driver, moved by forces (hayat, qaza — life and death personified) that issue the commands while we merely comply. Zauq, court poet and Bahadur Shah Zafar’s ustad, compresses this into a line of extreme economy: two verbs of motion, "aae" and "chale", carry the whole argument, and the balanced clauses "na aae… na… chale" seal our double helplessness. The personification of Life and Death as escorts who summon and dismiss us gives the couplet its calm, almost liturgical authority. It is Zauq’s most enduring sher and a fixture of Urdu reflections on mortality.',
		themes: ['fate', 'mortality', 'surrender'],
		sourceUrl: 'https://www.rekhta.org/ghazals/laaii-hayaat-aae-qazaa-le-chalii-chale-sheikh-ibrahim-zauq-ghazals'
	},

	// ─── Dagh Dehlvi (1831–1905) ───────────────────────────────────────────
	{
		slug: 'dagh-khoob-parda-hai-chilman',
		urduScript: 'خوب پردہ ہے کہ چلمن سے لگے بیٹھے ہیں\nصاف چھپتے بھی نہیں سامنے آتے بھی نہیں',
		romanUrdu: 'khoob parda hai ke chilman se lage baithe hain\nsaf chhupte bhi nahin samne aate bhi nahin',
		poet: 'Dagh Dehlvi',
		poetUrdu: 'داغ دہلوی',
		era: '1831–1905 · Delhi & Hyderabad',
		referenceExplanation:
			'What a fine veil this is — she sits pressed right against the reed-curtain (chilman), neither wholly hidden nor openly in view. Literally, the beloved plays at concealment: half-glimpsed through the screen, she is visible enough to inflame desire yet not present enough to satisfy it. The deeper reading is Dagh’s worldly, teasing eroticism — the "parda" (modesty/veil) is exposed as a coquette’s tactic, a calibrated withholding that heightens longing precisely by refusing full disclosure. The wit is in "khoob parda hai", literally "what excellent purdah", said with a raised eyebrow — the veil that is supposed to hide instead advertises. The device is tanz (irony) resting on a neat antithesis: "chhupte bhi nahin… aate bhi nahin" (neither hides nor comes forward). Dagh’s trademark is exactly this flirtatious, colloquial Delhi charm, and the couplet is one of the most quoted lines of playful romantic tension in Urdu.',
		themes: ['coquetry', 'veil', 'romantic tension'],
		sourceUrl: 'https://www.rekhta.org/couplets/khuub-parda-hai-ki-chilman-se-lage-baithe-hain-dagh-dehlvi-couplets'
	},
	{
		slug: 'dagh-ghazab-kiya-tere-wade',
		urduScript: 'غضب کیا ترے وعدے پہ اعتبار کیا\nتمام رات قیامت کا انتظار کیا',
		romanUrdu: 'ghazab kiya tere wade pe aitbar kiya\ntamam raat qayamat ka intizar kiya',
		poet: 'Dagh Dehlvi',
		poetUrdu: 'داغ دہلوی',
		era: '1831–1905 · Delhi & Hyderabad',
		referenceExplanation:
			'What a disaster — I actually trusted your promise, and so waited the whole night through as if for Doomsday. Literally, the lover reproaches himself for believing the beloved’s word; her broken vow to visit turned the night into torment. The deeper reading is how a single misplaced trust warps time itself: "qayamat" (the Day of Judgement) becomes the measure of an unbearable, catastrophic wait, so an ordinary night of no-show is inflated to cosmic scale. The self-directed exclamation "ghazab kiya" ("I did a terrible thing" — namely, believing you) sets the rueful, ironic tone; the beloved is never blamed directly, only his own credulity. The device is mubalgha (hyperbole) — equating a night’s vigil with the apocalypse — braced by the crisp repeated "kiya" as radif. This is Dagh at his most quotable: heartbreak delivered with a shrug and a smile rather than a sob.',
		themes: ['broken promise', 'waiting', 'irony'],
		sourceUrl: 'https://www.rekhta.org/ghazals/gazab-kiyaa-tire-vaade-pe-e-tibaar-kiyaa-dagh-dehlvi-ghazals'
	},

	// ─── Allama Iqbal (1877–1938) ──────────────────────────────────────────
	{
		slug: 'iqbal-sitaron-se-aage',
		urduScript: 'ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں',
		romanUrdu: 'sitaron se aage jahan aur bhi hain\nabhi ishq ke imtihan aur bhi hain',
		poet: 'Allama Iqbal',
		poetUrdu: 'علامہ اقبال',
		era: '1877–1938 · British India (Lahore)',
		referenceExplanation:
			'Beyond the stars there are yet more worlds; there are still more trials of love to come. Literally, do not mistake the visible horizon for the limit — vaster realms lie past even the farthest stars. The deeper reading is the heart of Iqbal’s philosophy of khudi (selfhood): the seeker must never rest at any attainment, because both the cosmos and the self are inexhaustible frontiers, and each stage of "ishq" (here a dynamic, striving love, not mere romance) only unlocks harder tests. "Sitaron se aage" fuses the astronomical and the spiritual — outer space becomes an emblem of inner possibility. The device is the parallel "aur bhi hain" closing both lines, a forward-leaning refrain that refuses closure and keeps pushing the reader onward. Endlessly quoted as motivational verse, the couplet is genuinely a compressed manifesto of restless human aspiration. It opens one of Iqbal’s most beloved ghazals of self-realisation.',
		themes: ['aspiration', 'selfhood', 'striving'],
		sourceUrl: 'https://www.rekhta.org/ghazals/sitaaron-se-aage-jahaan-aur-bhii-hain-allama-iqbal-ghazals-1'
	},
	{
		slug: 'iqbal-khudi-ko-kar-buland',
		urduScript: 'خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے',
		romanUrdu: 'khudi ko kar buland itna ke har taqdir se pahle\nkhuda bande se khud puchhe bata teri raza kya hai',
		poet: 'Allama Iqbal',
		poetUrdu: 'علامہ اقبال',
		era: '1877–1938 · British India (Lahore)',
		referenceExplanation:
			'Raise your selfhood so high that, before settling any destiny, God Himself asks the servant: "Tell me, what is your wish?" Literally, cultivate your inner self until the Divine consults you about your own fate. The deeper reading is Iqbal’s doctrine of khudi at its boldest — a disciplined, God-conscious self is not a passive recipient of fate but a co-author of it, so exalted that the decree of taqdir waits on human "raza" (will, consent). This is not arrogance but Iqbal’s vision of the fully realised believer whose will has been aligned with, and dignified by, the Divine. The striking image is the reversal of the ordinary hierarchy: God questioning the servant. The device is that dramatic personification of the God–servant exchange, staged as a single scene. Perhaps the most quoted motivational sher in Urdu, it turns theology into a summons to self-mastery and moral courage.',
		themes: ['selfhood', 'free will', 'self-mastery'],
		sourceUrl: 'https://www.rekhta.org/couplets/khudii-ko-kar-buland-itnaa-ki-har-taqdiir-se-pahle-allama-iqbal-couplets'
	},
	{
		slug: 'iqbal-kabhi-ae-haqiqat-e-muntazar',
		urduScript: 'کبھی اے حقیقتِ منتظر نظر آ لباسِ مجاز میں\nکہ ہزاروں سجدے تڑپ رہے ہیں مری جبینِ نیاز میں',
		romanUrdu: 'kabhi ae haqiqat-e-muntazar nazar aa libas-e-majaz mein\nke hazaron sajde tadap rahe hain meri jabin-e-niyaz mein',
		poet: 'Allama Iqbal',
		poetUrdu: 'علامہ اقبال',
		era: '1877–1938 · British India (Lahore)',
		referenceExplanation:
			'O long-awaited Reality, appear just once in the garb of the tangible, for a thousand prostrations tremble restlessly in my brow of submission. Literally, the poet begs the hidden Truth to take visible, sensory form. The deeper reading draws on the Sufi pairing of haqiqat (ultimate Reality) and majaz (the metaphorical, material world): Iqbal longs to glimpse the Divine within creation itself — the eternal clothed in the temporal — because his devotion is straining to be enacted, not merely felt. "Hazaron sajde tadap rahe hain" personifies acts of worship as living things writhing to be performed, a vivid image of adoration outrunning its object. The device is this rich Sufi symbolism (libas-e-majaz, jabin-e-niyaz) plus the personification of the sajda. Sung memorably by many, the couplet fuses intense religious yearning with philosophical precision, and stands among Iqbal’s most quoted openings on the ache to behold the Absolute.',
		themes: ['divine longing', 'mysticism', 'devotion'],
		sourceUrl:
			'https://www.rekhta.org/ghazals/kabhii-ai-haqiiqat-e-muntazar-nazar-aa-libaas-e-majaaz-men-allama-iqbal-ghazals'
	},
	{
		slug: 'iqbal-khirad-mandon-se-kya-puchhun',
		urduScript: 'خرد مندوں سے کیا پوچھوں کہ میری ابتدا کیا ہے\nکہ میں اس فکر میں رہتا ہوں میری انتہا کیا ہے',
		romanUrdu: 'khirad-mandon se kya puchhun ke meri ibtida kya hai\nke main is fikr mein rahta hun meri intiha kya hai',
		poet: 'Allama Iqbal',
		poetUrdu: 'علامہ اقبال',
		era: '1877–1938 · British India (Lahore)',
		referenceExplanation:
			'Why should I ask the wise about my origin, when I stay absorbed in the question of my end? Literally, Iqbal declines the philosophers’ debate about where the self comes from, because he is preoccupied with where it is headed. The deeper reading is a hallmark of his thought: origin is fixed and backward-looking, but "intiha" (culmination, ultimate horizon) is open and self-made — the meaning of a human life lies in what it can become, not in accounts of its beginning. So he dismisses "khirad-mandon" (the merely rational sages) in favour of an inner, destiny-oriented search. The device is the antithesis of ibtida and intiha (beginning versus end) held in perfect balance across the two lines, with "kya hai" as a probing radif that keeps both as live questions. It opens a celebrated ghazal and distils Iqbal’s conviction that selfhood is a project of the future, not a fact of the past.',
		themes: ['selfhood', 'destiny', 'existential inquiry'],
		sourceUrl: 'https://www.rekhta.org/ghazals/khirad-mandon-se-kyaa-puuchhuun-ki-merii-ibtidaa-kyaa-hai-allama-iqbal-ghazals'
	},

	// ─── Faiz Ahmed Faiz (1911–1984) ───────────────────────────────────────
	{
		slug: 'faiz-gulon-mein-rang-bhare',
		urduScript: 'گلوں میں رنگ بھرے بادِ نوبہار چلے\nچلے بھی آؤ کہ گلشن کا کاروبار چلے',
		romanUrdu: 'gulon mein rang bhare baad-e-naubahar chale\nchale bhi aao ke gulshan ka karobar chale',
		poet: 'Faiz Ahmed Faiz',
		poetUrdu: 'فیض احمد فیض',
		era: '1911–1984 · Pakistan (Progressive Movement)',
		referenceExplanation:
			'Let the new spring breeze blow and fill the flowers with colour — do come, so the garden’s whole enterprise can get going. Literally, it is a lover’s plea for the beloved’s arrival, without which even spring cannot properly begin. The deeper reading, characteristic of Faiz, lets the romantic double as the political: the "gulshan" (garden) is also the homeland or society, and the awaited beloved is also freedom or the promised dawn, whose coming would set the collective "karobar" (business of life) in motion. Written, famously, during imprisonment, its longing carries both private and public hope. The device is the pun on "chale", threaded as radif — the breeze "moves", the beloved should "come", the garden’s work should "run" — one verb animating wind, lover, and world alike. Immortalised in Mehdi Hassan’s rendition, it is among the best-loved ghazals in the language, romance and resistance breathing through the same lines.',
		themes: ['spring', 'longing', 'hope'],
		sourceUrl: 'https://www.rekhta.org/ghazals/gulon-men-rang-bhare-baad-e-nau-bahaar-chale-faiz-ahmad-faiz-ghazals'
	},
	{
		slug: 'faiz-aur-bhi-dukh-hain',
		urduScript: 'اور بھی دکھ ہیں زمانے میں محبت کے سوا\nراحتیں اور بھی ہیں وصل کی راحت کے سوا',
		romanUrdu: 'aur bhi dukh hain zamane mein mohabbat ke siva\nrahaten aur bhi hain vasl ki rahat ke siva',
		poet: 'Faiz Ahmed Faiz',
		poetUrdu: 'فیض احمد فیض',
		era: '1911–1984 · Pakistan (Progressive Movement)',
		referenceExplanation:
			'There are other sorrows in the world besides the sorrow of love; there are other comforts besides the comfort of union. Literally, Faiz gently informs the beloved that love is not the sole axis of a life. The deeper reading is the manifesto of Progressive poetry and of Faiz’s own turn: the private grief of the lover must widen to embrace the world’s griefs — poverty, oppression, injustice — and personal fulfilment is not the only joy worth seeking. It is a courteous but decisive expansion of the ghazal’s traditional subject beyond the beloved to all humanity. The device is strict parallelism: the two lines mirror each other exactly, "dukh… mohabbat ke siva" answered by "rahaten… vasl ke siva", so sorrow and solace are both pluralised and de-centred in the same breath. From the poem "Mujh se pehli si mohabbat", it is one of the most quoted couplets in modern Urdu, a hinge between romance and social conscience.',
		themes: ['social conscience', 'love beyond love', 'the wider world'],
		sourceUrl: 'https://www.rekhta.org/couplets/aur-bhii-dukh-hain-zamaane-men-mohabbat-ke-sivaa-faiz-ahmad-faiz-couplets'
	},
	{
		slug: 'faiz-raat-yun-dil-mein',
		urduScript: 'رات یوں دل میں تری کھوئی ہوئی یاد آئی\nجیسے ویرانے میں چپکے سے بہار آ جائے',
		romanUrdu: 'raat yun dil mein teri khoi hui yaad aai\njaise virane mein chupke se bahar aa jae',
		poet: 'Faiz Ahmed Faiz',
		poetUrdu: 'فیض احمد فیض',
		era: '1911–1984 · Pakistan (Progressive Movement)',
		referenceExplanation:
			'Last night your long-lost memory returned to my heart the way spring steals, unannounced, into a wasteland. Literally, a forgotten memory of the beloved arrives suddenly and transforms an inner desolation. The deeper reading turns on the tension between "khoi hui yaad" (a memory thought lost) and its quiet, almost miraculous return: grief’s barren landscape is not conquered by force but softly reclaimed, as a ruined place is by unbidden blossom. The whole piece is a qata (a self-contained quatrain) built on a chain of such similes — like a breeze crossing a desert, like relief coming causelessly to the sick. The device here is tashbih (simile) of extraordinary tenderness, "chupke se" (stealthily) giving the return of memory its hush and gentleness. Among Faiz’s most exquisite short pieces, it captures how the past can visit the present not as a wound but, briefly, as grace.',
		themes: ['memory', 'longing', 'solace'],
		sourceUrl: 'https://www.rekhta.org/couplets/raat-yuun-dil-men-tirii-khoii-huii-yaad-aaii-faiz-ahmad-faiz-couplets'
	},

	// ─── Ahmad Faraz (1931–2008) ───────────────────────────────────────────
	{
		slug: 'faraz-ranjish-hi-sahi',
		urduScript: 'رنجش ہی سہی دل ہی دکھانے کے لیے آ\nآ پھر سے مجھے چھوڑ کے جانے کے لیے آ',
		romanUrdu: 'ranjish hi sahi dil hi dukhane ke liye aa\naa phir se mujhe chhod ke jane ke liye aa',
		poet: 'Ahmad Faraz',
		poetUrdu: 'احمد فراز',
		era: '1931–2008 · Pakistan',
		referenceExplanation:
			'Let it be resentment then; come even if only to wound my heart — come, even if only to leave me all over again. Literally, the lover pleads for the beloved’s return on any terms whatsoever, accepting fresh pain as the price of mere presence. The deeper reading is the desperate arithmetic of longing: separation has become so unbearable that even a reunion guaranteed to end in hurt is preferable to continued absence — the visit is worth it though its only purpose be another parting. The concessive "hi sahi" ("so be it", "even if only") is the whole engine of the couplet, repeated to keep lowering the terms the lover will accept. The device is that pleading repetition of "aa" (come) as radif, four times across the ghazal’s matla, each an imperative that is really a supplication. Immortalised by Mehdi Hassan, it is arguably the most famous ghazal of longing in modern Urdu.',
		themes: ['longing', 'reconciliation', 'heartbreak'],
		sourceUrl: 'https://www.rekhta.org/ghazals/ranjish-hii-sahii-dil-hii-dukhaane-ke-liye-aa-ahmad-faraz-ghazals'
	},
	{
		slug: 'faraz-suna-hai-log-use',
		urduScript: 'سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں\nسو اس کے شہر میں کچھ دن ٹھہر کے دیکھتے ہیں',
		romanUrdu: 'suna hai log use aankh bhar ke dekhte hain\nso us ke shahr mein kuchh din thahar ke dekhte hain',
		poet: 'Ahmad Faraz',
		poetUrdu: 'احمد فراز',
		era: '1931–2008 · Pakistan',
		referenceExplanation:
			'They say people gaze at her to their heart’s content — so let me stop a while in her city and see for myself. Literally, the poet has heard reports of the beloved’s dazzling beauty and resolves to linger where she lives to witness it. The deeper reading is the sher’s teasing distance: the whole long ghazal is built on hearsay — "suna hai" (it is said) opening couplet after couplet — so the beloved is constructed entirely out of rumour, an ideal assembled from what others report, never directly possessed. That reliance on report makes desire itself a kind of pilgrimage of curiosity. The device is the anaphora of "suna hai" across the ghazal and the sly, understated "dekhte hain" (they look / let me look) as radif, mixing gossip with quest. One of Faraz’s signature ghazals, it turns the beloved into a legend the poet travels to verify.',
		themes: ['beauty', 'hearsay', 'yearning'],
		sourceUrl: 'https://www.rekhta.org/ghazals/sunaa-hai-log-use-aankh-bhar-ke-dekhte-hain-ahmad-faraz-ghazals'
	},
	{
		slug: 'faraz-ab-ke-hum-bichhre',
		urduScript: 'اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں\nجس طرح سوکھے ہوئے پھول کتابوں میں ملیں',
		romanUrdu: 'ab ke hum bichhre to shayad kabhi khwabon mein milen\njis tarah sukhe hue phool kitabon mein milen',
		poet: 'Ahmad Faraz',
		poetUrdu: 'احمد فراز',
		era: '1931–2008 · Pakistan',
		referenceExplanation:
			'If we part this time, perhaps we shall meet only in dreams — the way dried flowers are found pressed inside books. Literally, this separation feels final, so any future meeting will be as faint and posthumous as a flower discovered flattened between pages. The deeper reading turns on that unforgettable simile: the pressed flower is beauty preserved but dead, kept yet lifeless, so the lovers’ future "meetings" will be mere keepsakes of a love that has itself ended — memory without living presence. The dream becomes an album of what is gone. The device is tashbih (simile) of rare delicacy, the fragile, faded flower in the closed book mirroring a love folded away and browning with time. Widely sung and quoted, the couplet is a definitive modern image of parting: not a slammed door but a slow fade into keepsake and reverie.',
		themes: ['parting', 'memory', 'impermanence'],
		sourceUrl: 'https://www.rekhta.org/ghazals/ab-ke-ham-bichhde-to-shaayad-kabhii-khvaabon-men-milen-ahmad-faraz-ghazals'
	},

	// ─── Nasir Kazmi (1925–1972) ───────────────────────────────────────────
	{
		slug: 'nasir-dil-mein-ik-lahr',
		urduScript: 'دل میں اک لہر سی اٹھی ہے ابھی\nکوئی تازہ ہوا چلی ہے ابھی',
		romanUrdu: 'dil mein ik lahr si uthi hai abhi\nkoi taza hawa chali hai abhi',
		poet: 'Nasir Kazmi',
		poetUrdu: 'ناصر کاظمی',
		era: '1925–1972 · Pakistan (post-Partition Lahore)',
		referenceExplanation:
			'Just now a kind of wave has risen in my heart; some fresh breeze has just begun to blow. Literally, the poet registers a faint, sudden stirring — an inexplicable ripple of feeling, as if a new wind has entered. The deeper reading is the delicacy of Nasir Kazmi’s art: rather than name the emotion (hope? memory? the premonition of love or change?), he catches only its first tremor, the moment sensation arrives before it becomes thought. The repeated "abhi" (just now) freezes the couplet in a single fresh instant, giving it the quality of something perceived in real time. The devices are the soft simile "lahr si" (a wave-like something) and the parallel between an inner wave and an outer breeze, so that heart and weather move together. Nasir’s hallmark is exactly this understated, atmospheric lyricism; the ghazal, sung by Ghulam Ali, is a small masterpiece of feeling caught at its point of origin.',
		themes: ['stirring', 'renewal', 'inner weather'],
		sourceUrl: 'https://www.rekhta.org/ghazals/dil-men-ik-lahr-sii-uthii-hai-abhii-nasir-kazmi-ghazals'
	},
	{
		slug: 'nasir-gaye-dinon-ka-suragh',
		urduScript: 'گئے دنوں کا سراغ لے کر کدھر سے آیا کدھر گیا وہ\nعجیب مانوس اجنبی تھا مجھے تو حیران کر گیا وہ',
		romanUrdu: 'gaye dinon ka suragh le kar kidhar se aaya kidhar gaya wo\najib manus ajnabi tha mujhe to hairan kar gaya wo',
		poet: 'Nasir Kazmi',
		poetUrdu: 'ناصر کاظمی',
		era: '1925–1972 · Pakistan (post-Partition Lahore)',
		referenceExplanation:
			'Bearing some trace of bygone days, from where did he come and where did he go? A strange familiar-stranger he was — he left me astonished. Literally, a mysterious figure appears carrying the scent of the past, then vanishes, leaving only wonder. The deeper reading is soaked in Nasir Kazmi’s post-Partition melancholy: the "manus ajnabi" (familiar stranger) may be a lost friend, a former self, the abandoned city of one’s youth, or memory personified — someone at once intimately known and utterly unreachable. The couplet is really about how the past visits the present as an apparition we cannot hold. The device is the oxymoron "manus ajnabi" (familiar stranger), a two-word compression of the whole feeling, framed by the restless questioning "kidhar se aaya kidhar gaya" (whence, whither). Among Nasir’s most cherished ghazals, it distils exile and nostalgia into the image of a visitor who is gone before he can be recognised.',
		themes: ['nostalgia', 'exile', 'the past'],
		sourceUrl: 'https://www.rekhta.org/ghazals/gae-dinon-kaa-suraag-le-kar-kidhar-se-aayaa-kidhar-gayaa-vo-nasir-kazmi-ghazals'
	},
	{
		slug: 'nasir-wo-sahilon-pe-gaane',
		urduScript: 'وہ ساحلوں پہ گانے والے کیا ہوئے\nوہ کشتیاں چلانے والے کیا ہوئے',
		romanUrdu: 'wo sahilon pe gaane wale kya hue\nwo kashtiyan chalane wale kya hue',
		poet: 'Nasir Kazmi',
		poetUrdu: 'ناصر کاظمی',
		era: '1925–1972 · Pakistan (post-Partition Lahore)',
		referenceExplanation:
			'What became of those who used to sing on the shores? What became of those who used to row the boats? Literally, the poet asks after vanished people — singers and boatmen who once animated the riverbank, now gone. The deeper reading is elegiac and generational: the couplet mourns a whole lost world of companions, of an easier, more musical life dispersed by time and, for Nasir Kazmi, by the upheavals of Partition and migration. The vivid, ordinary figures — singers, rowers — stand for an entire community and era swept away. The device is the plaintive anaphora "wo… wale kya hue" (those who… — what became of them), a refrain of loss repeated down the ghazal so that each couplet tolls for another absence. The rhetorical question expects no answer; its point is the ache of asking. It is one of Urdu’s most quoted laments for a departed age and its people.',
		themes: ['loss', 'nostalgia', 'departed companions'],
		sourceUrl: 'https://www.rekhta.org/ghazals/vo-saahilon-pe-gaane-vaale-kyaa-hue-nasir-kazmi-ghazals'
	},

	// ─── Jaun Elia (1931–2002) ─────────────────────────────────────────────
	{
		slug: 'jaun-ab-nahin-koi-baat-khatre',
		urduScript: 'اب نہیں کوئی بات خطرے کی\nاب سبھی کو سبھی سے خطرہ ہے',
		romanUrdu: 'ab nahin koi baat khatre ki\nab sabhi ko sabhi se khatra hai',
		poet: 'Jaun Elia',
		poetUrdu: 'جون ایلیا',
		era: '1931–2002 · Karachi, Pakistan',
		referenceExplanation:
			'There is nothing alarming any more — because now everyone is a threat to everyone. Literally, danger has stopped being news precisely because it has become universal and constant. The deeper reading is Jaun Elia’s bleak social diagnosis wrapped in a shrug: when mutual suspicion is total, the very category of "threat" collapses into normalcy, so paradoxically nothing feels dangerous once everything is. It is a mordant comment on a fractured society (and, some read, on the self at war with itself) delivered with his trademark deadpan. The device is a paradox pivoting on the repeated word "khatra" (threat): line one dismisses danger, line two universalises it, and the two readings detonate against each other. The near-mirrored phrasing "sabhi ko sabhi se" (everyone, from everyone) enacts the all-against-all it describes. Its uncanny aptness for the modern age of pervasive fear is why the couplet is endlessly requoted, well beyond Jaun’s cult following.',
		themes: ['alienation', 'society', 'irony'],
		sourceUrl: 'https://www.rekhta.org/couplets/ab-nahiin-koii-baat-khatre-kii-jaun-eliya-couplets'
	},
	{
		slug: 'jaun-main-bhi-bahut-ajib',
		urduScript: 'میں بھی بہت عجیب ہوں اتنا عجیب ہوں کہ بس\nخود کو تباہ کر لیا اور ملال بھی نہیں',
		romanUrdu: 'main bhi bahut ajib hun itna ajib hun ke bas\nkhud ko tabah kar liya aur malal bhi nahin',
		poet: 'Jaun Elia',
		poetUrdu: 'جون ایلیا',
		era: '1931–2002 · Karachi, Pakistan',
		referenceExplanation:
			'I too am very strange — so strange, that’s all — I ruined myself entirely, and I do not even regret it. Literally, the poet confesses to a self-destruction he feels no remorse about. The deeper reading is the essence of Jaun Elia’s persona: a nihilistic, self-lacerating honesty that has passed beyond guilt into a kind of exhausted, defiant peace with his own wreckage. The chilling turn is "malal bhi nahin" (not even regret) — self-ruin is confessed not as tragedy but as a curiosity of temperament, which is more disturbing than any lament. The device is the intensifying repetition "ajib hun… ajib hun ke bas" (strange… so strange, enough), the trailing "ke bas" ("and that’s it") performing the very indifference it describes. Jaun is the poet of glorious self-destruction, and this couplet — among his most quoted — captures his voice exactly: brutal candour about the self, stripped of self-pity.',
		themes: ['self-destruction', 'nihilism', 'defiance'],
		sourceUrl: 'https://www.rekhta.org/couplets/main-bhii-bahut-ajiib-huun-itnaa-ajiib-huun-ki-bas-jaun-eliya-couplets'
	},

	// ─── Parveen Shakir (1952–1994) ────────────────────────────────────────
	{
		slug: 'parveen-ku-ba-ku-phail-gai',
		urduScript: 'کو بہ کو پھیل گئی بات شناسائی کی\nاس نے خوشبو کی طرح میری پذیرائی کی',
		romanUrdu: 'ku-ba-ku phail gai baat shanasai ki\nus ne khushbu ki tarah meri pazirai ki',
		poet: 'Parveen Shakir',
		poetUrdu: 'پروین شاکر',
		era: '1952–1994 · Pakistan',
		referenceExplanation:
			'Word of our acquaintance spread from lane to lane; he welcomed me the way one welcomes a fragrance. Literally, the news of a budding closeness travelled everywhere, because the beloved received the poet as warmly and openly as one receives a lovely scent. The deeper reading is quietly feminist and tender: Parveen Shakir voices female desire and social visibility on her own terms, the spreading "baat" (talk) hinting at how a woman’s attachment becomes public property, while "khushbu ki tarah pazirai" reclaims that exposure as something graceful rather than shameful. Fragrance — her signature motif — is by nature un-hideable, drifting freely, which mirrors both the spreading rumour and an openly received love. The device is the simile "khushbu ki tarah" (like a fragrance), fusing welcome with diffusion, plus the alliterative music of "ku-ba-ku" (lane to lane). It is the matla of one of her most beloved ghazals and a hallmark of her fresh, feminine idiom.',
		themes: ['acquaintance', 'fragrance', 'female voice'],
		sourceUrl: 'https://www.rekhta.org/ghazals/kuu-ba-kuu-phail-gaii-baat-shanaasaaii-kii-parveen-shakir-ghazals'
	},
	{
		slug: 'parveen-jugnu-ko-din-ke-waqt',
		urduScript: 'جگنو کو دن کے وقت پرکھنے کی ضد کریں\nبچے ہمارے عہد کے چالاک ہو گئے',
		romanUrdu: 'jugnu ko din ke waqt parakhne ki zid karein\nbachche hamare ahd ke chalak ho gae',
		poet: 'Parveen Shakir',
		poetUrdu: 'پروین شاکر',
		era: '1952–1994 · Pakistan',
		referenceExplanation:
			'They insist on testing the firefly in broad daylight — the children of our age have grown too clever. Literally, people demand that a glow-worm prove its light at noon, when of course it cannot shine; the young have become cunningly, mockingly "smart". The deeper reading is a sharp critique of a cynical, over-clever generation that has lost the capacity for wonder: a firefly’s magic is real only in darkness, and to demand it perform on the sceptic’s terms (daylight) is to guarantee disenchantment and to kill the very thing being tested. It defends innocence, faith, and subtle beauties against a hardened, literal-minded scrutiny. The device is the exquisite central metaphor — the firefly as fragile, conditional wonder — set against the irony of "chalak" (clever) used as a reproach, not a compliment. Among Parveen Shakir’s most quoted couplets, it turns a tiny natural image into a lament for a disbelieving world.',
		themes: ['innocence', 'cynicism', 'wonder'],
		sourceUrl: 'https://www.rekhta.org/couplets/jugnuu-ko-din-ke-vaqt-parakhne-kii-zid-karen-parveen-shakir-couplets'
	},
	{
		slug: 'parveen-wo-to-khushbu-hai',
		urduScript: 'وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا\nمسئلہ پھول کا ہے پھول کدھر جائے گا',
		romanUrdu: 'wo to khushbu hai hawaon mein bikhar jaega\nmasla phul ka hai phul kidhar jaega',
		poet: 'Parveen Shakir',
		poetUrdu: 'پروین شاکر',
		era: '1952–1994 · Pakistan',
		referenceExplanation:
			'He is a fragrance — he will simply scatter on the winds; the real problem is the flower: where is the flower to go? Literally, the beloved (the "khushbu", fragrance) can drift freely and disperse without consequence, but the flower left behind is fixed, and its plight is the true crisis. The deeper reading is a piercingly gendered insight: in a parting, the man moves on and diffuses like scent into the wide world, while the woman — the rooted "phul" (flower) — must stay and bear the aftermath, with nowhere to go. It quietly exposes the asymmetry of freedom between the one who leaves and the one who remains. The device is the paired metaphor of fragrance and flower — inseparable in life, yet unequal in fate — with the plaintive question "phul kidhar jaega" (where will the flower go?) carrying the whole burden. It is one of Parveen Shakir’s most quoted and most quietly devastating couplets.',
		themes: ['parting', 'gendered fate', 'abandonment'],
		sourceUrl: 'https://www.rekhta.org/ghazals/vo-to-khush-buu-hai-havaaon-men-bikhar-jaaegaa-parveen-shakir-ghazals'
	},

	// ─── Bashir Badr (b. 1935) ─────────────────────────────────────────────
	{
		slug: 'bashir-ujale-apni-yaadon',
		urduScript: 'اجالے اپنی یادوں کے ہمارے ساتھ رہنے دو\nنہ جانے کس گلی میں زندگی کی شام ہو جائے',
		romanUrdu: 'ujale apni yaadon ke hamare sath rahne do\nna jane kis gali mein zindagi ki sham ho jae',
		poet: 'Bashir Badr',
		poetUrdu: 'بشیر بدر',
		era: 'b. 1935 · Bhopal, India (modern ghazal)',
		referenceExplanation:
			'Let the glow of your memories stay with me — for who knows in which lane the evening of my life may fall. Literally, the poet asks to keep the light of remembered love, since he cannot know where or when his life will end. The deeper reading is a gentle plea against total loss: even after love is over, its remembered radiance is a lamp for the uncertain, homeless journey of the rest of one’s days, and one wants that light close at the unknown hour of death. There is acceptance, not bitterness — memory as provision for the road. The device is the extended metaphor of light and dusk: "ujale" (radiance) of memory against "zindagi ki sham" (life’s evening, i.e. its close), youth’s glow set to guard old age’s dark. The wandering "kis gali mein" (in which lane) gives life the feel of an unmapped walk. It is Bashir Badr’s most beloved couplet, a fixture of ghazal recitation.',
		themes: ['memory', 'mortality', 'acceptance'],
		sourceUrl: 'https://www.rekhta.org/couplets/ujaale-apnii-yaadon-ke-hamaare-saath-rahne-do-bashir-badr-couplets'
	},
	{
		slug: 'bashir-dushmani-jam-kar',
		urduScript: 'دشمنی جم کر کرو لیکن یہ گنجائش رہے\nجب کبھی ہم دوست ہو جائیں تو شرمندہ نہ ہوں',
		romanUrdu: 'dushmani jam kar karo lekin ye gunjaish rahe\njab kabhi hum dost ho jaen to sharminda na hon',
		poet: 'Bashir Badr',
		poetUrdu: 'بشیر بدر',
		era: 'b. 1935 · Bhopal, India (modern ghazal)',
		referenceExplanation:
			'Be my enemy wholeheartedly — but leave this much room: that if we ever become friends again, neither of us need feel ashamed. Literally, the poet grants his adversary full licence to oppose him, asking only that the hostility stop short of anything unforgivable. The deeper reading is a piece of humane worldly wisdom: enmity should be conducted with a built-in exit, never so cruel or dishonourable that future reconciliation becomes impossible — because relationships turn, and today’s foe may be tomorrow’s friend. It is a plea for keeping conflict civilised and reversible. The device is the key word "gunjaish" (room, allowance, margin) — the whole ethic hinges on preserving a little space — set against the vigorous "jam kar" (thoroughly). The counsel’s calm reasonableness, addressed even to an enemy, is its charm. Widely quoted in political and personal contexts alike, it is one of Bashir Badr’s signature couplets on restraint and the long view.',
		themes: ['enmity', 'reconciliation', 'wisdom'],
		sourceUrl: 'https://www.rekhta.org/couplets/dushmanii-jam-kar-karo-lekin-ye-gunjaaish-rahe-bashir-badr-couplets'
	},
	{
		slug: 'bashir-koi-hath-bhi-na-milaega',
		urduScript: 'کوئی ہاتھ بھی نہ ملائے گا جو گلے ملو گے تپاک سے\nیہ نئے مزاج کا شہر ہے ذرا فاصلے سے ملا کرو',
		romanUrdu: 'koi hath bhi na milaega jo gale miloge tapak se\nye nae mizaj ka shahr hai zara fasle se mila karo',
		poet: 'Bashir Badr',
		poetUrdu: 'بشیر بدر',
		era: 'b. 1935 · Bhopal, India (modern ghazal)',
		referenceExplanation:
			'No one will even shake your hand if you embrace them too warmly — this is a city of new temperament; do meet people, but keep a little distance. Literally, excessive warmth is now met with cold withdrawal, so the poet advises measured reserve. The deeper reading is a wry lament for a changed social ethos: an older culture of open-hearted "tapak" (effusive affection) has given way to a guarded, transactional modernity where too much sincerity is punished rather than returned. It mourns the death of warmth even as it counsels adapting to its absence. The device is the pointed antithesis of "gale milna" (to embrace) versus "fasle se milna" (to meet at arm’s length), with the diagnosis "nae mizaj ka shahr" (a city of new disposition) naming the shift. Uncannily apt in an age of literal social distancing, the couplet has enjoyed a fresh second life and remains one of Bashir Badr’s most quoted lines on modern coldness.',
		themes: ['modern coldness', 'social change', 'reserve'],
		sourceUrl: 'https://www.rekhta.org/couplets/koii-haath-bhii-na-milaaegaa-jo-gale-miloge-tapaak-se-bashir-badr-couplets'
	},

	// ─── Munir Niazi (1928–2006) ───────────────────────────────────────────
	{
		slug: 'munir-hamesha-der-kar-deta',
		urduScript: 'ہمیشہ دیر کر دیتا ہوں میں ہر کام کرنے میں\nضروری بات کہنی ہو کوئی وعدہ نبھانا ہو',
		romanUrdu: 'hamesha der kar deta hun main har kaam karne mein\nzaruri baat kahni ho koi wada nibhana ho',
		poet: 'Munir Niazi',
		poetUrdu: 'منیر نیازی',
		era: '1928–2006 · Pakistan',
		referenceExplanation:
			'I am always too late in doing everything — whether it is saying something that had to be said or keeping some promise. Literally, the poet confesses a chronic lateness that spoils his most important acts. The deeper reading, unfolding across this famous nazm, is a haunting self-portrait of a temperament fatally out of step with time: not idle delay but an almost cosmic mistiming, so that the necessary word, the rescue, the kept vow, all arrive just after the moment for them has passed. It becomes a metaphor for missed lives and irreversible regret. The device is the confessional, list-like structure — the opening admission followed by mounting examples ("zaruri baat", "wada nibhana", and, later in the poem, saving someone or calling them back) — driven by the flat, relentless "der kar deta hun" (I make it late). Endlessly quoted, it names a feeling everyone recognises: being perpetually, painfully a beat behind.',
		themes: ['regret', 'missed timing', 'self-portrait'],
		sourceUrl:
			'https://www.rekhta.org/nazms/hamesha-der-kar-detaa-huun-hamesha-der-kar-detaa-huun-main-har-kaam-karne-men-muneer-niyazi-nazms'
	},
	{
		slug: 'munir-ik-aur-dariya-ka-samna',
		urduScript: 'اک اور دریا کا سامنا تھا منیرؔ مجھ کو\nمیں ایک دریا کے پار اترا تو میں نے دیکھا',
		romanUrdu: 'ik aur dariya ka samna tha munir mujh ko\nmain ek dariya ke par utra to main ne dekha',
		poet: 'Munir Niazi',
		poetUrdu: 'منیر نیازی',
		era: '1928–2006 · Pakistan',
		referenceExplanation:
			'I faced yet another river, Munir — the moment I crossed one river and reached the far bank, I saw. Literally, no sooner is one river forded than a new one appears in its place. The deeper reading is Munir Niazi’s vision of struggle as endless: every hardship overcome merely reveals the next, so life is not a single crossing but an unbroken series of them, with no final shore. It reads as a metaphor for the perpetual challenges of existence, or of a restless, never-satisfied soul that finds a new ordeal waiting behind each conquered one. The device is the river as recurring symbol of trial, and the suspended syntax — the couplet ends on "main ne dekha" (I saw), leaving the seeing to spill into the reader’s dread of what comes next. Ranked among Munir’s finest, it has become proverbial ("ik aur dariya ka samna") for problems that renew themselves the instant you think you are through.',
		themes: ['endless struggle', 'perseverance', 'existential trial'],
		sourceUrl: 'https://www.rekhta.org/couplets/ik-aur-dariyaa-kaa-saamnaa-thaa-muniir-mujh-ko-muneer-niyazi-couplets'
	},

	// ─── Firaq Gorakhpuri (1896–1982) ──────────────────────────────────────
	{
		slug: 'firaq-bahut-pahle-se-un-qadmon',
		urduScript: 'بہت پہلے سے ان قدموں کی آہٹ جان لیتے ہیں\nتجھے اے زندگی ہم دور سے پہچان لیتے ہیں',
		romanUrdu: 'bahut pahle se un qadmon ki aahat jaan lete hain\ntujhe ai zindagi hum dur se pahchan lete hain',
		poet: 'Firaq Gorakhpuri',
		poetUrdu: 'فراق گورکھپوری',
		era: '1896–1982 · India (Allahabad)',
		referenceExplanation:
			'Long in advance we sense the footfall of those approaching steps; O life, we recognise you even from afar. Literally, the poet claims a seasoned intuition — he can tell what is coming before it arrives. The deeper reading is the weary wisdom of experience: after enough living, one anticipates life’s recurring arrivals — its troubles, its demands, its familiar disappointments — so nothing truly surprises any more, and even "zindagi" (life) is greeted like a figure whose gait one knows too well. There is intimacy and fatigue braided together, a tired affection for existence. The device is the personification of life as a person with recognisable footsteps ("qadmon ki aahat"), and the confident, knowing "pahchan lete hain" (we recognise) that turns hard-won resignation into a kind of quiet mastery. It is among Firaq’s most quoted couplets, distilling his contemplative, philosophical strain into a single serene, knowing address to life itself.',
		themes: ['experience', 'foreknowledge', 'life'],
		sourceUrl: 'https://www.rekhta.org/ghazals/bahut-pahle-se-un-qadmon-kii-aahat-jaan-lete-hain-firaq-gorakhpuri-ghazals'
	},
	{
		slug: 'firaq-shaam-bhi-thi-dhuan-dhuan',
		urduScript: 'شام بھی تھی دھواں دھواں حسن بھی تھا اداس اداس\nدل کو کئی کہانیاں یاد سی آ کے رہ گئیں',
		romanUrdu: 'shaam bhi thi dhuan dhuan husn bhi tha udas udas\ndil ko kai kahaniyan yaad si aa ke rah gain',
		poet: 'Firaq Gorakhpuri',
		poetUrdu: 'فراق گورکھپوری',
		era: '1896–1982 · India (Allahabad)',
		referenceExplanation:
			'The evening too was hazy, smoke-like; beauty too was steeped in sadness — and the heart half-remembered many old stories that only rose and stayed unfinished. Literally, a dim, smoky dusk and a melancholy beauty stir a cluster of memories that never quite surface into words. The deeper reading is pure Firaq mood-poetry: outer scene and inner state are perfectly fused — the smokiness of the evening, the sorrow tingeing even beauty, and the vague ache of recollections that "aa ke rah gain" (came and simply lingered), never completing themselves. It captures that precise twilight feeling of nostalgia without a nameable object. The devices are the doubled, atmospheric intensifiers "dhuan dhuan" (smoky, blurred) and "udas udas" (sad, sad), whose repetition softens the whole line into a haze, and the wonderfully vague "yaad si" (a memory-like something). Frequently sung, it is one of the most evocative couplets of ambient melancholy in Urdu.',
		themes: ['melancholy', 'nostalgia', 'twilight mood'],
		sourceUrl: 'https://www.rekhta.org/couplets/shaam-bhii-thii-dhuaan-dhuaan-husn-bhii-thaa-udaas-udaas-firaq-gorakhpuri-couplets'
	},

	// ─── Josh Malihabadi (1898–1982) ───────────────────────────────────────
	{
		slug: 'josh-kaam-hai-mera-taghayyur',
		urduScript: 'کام ہے میرا تغیر نام ہے میرا شباب\nمیرا نعرہ انقلاب و انقلاب و انقلاب',
		romanUrdu: 'kaam hai mera taghayyur naam hai mera shabab\nmera nara inqilab o inqilab o inqilab',
		poet: 'Josh Malihabadi',
		poetUrdu: 'جوش ملیح آبادی',
		era: '1898–1982 · India → Pakistan (Shayar-e-Inquilab)',
		referenceExplanation:
			'My vocation is change; my very name is youth; my slogan is revolution, and revolution, and revolution. Literally, the poet declares himself the embodiment of transformation, vitality, and upheaval. The deeper reading is the credo of Josh Malihabadi, the self-styled "Shayar-e-Inquilab" (Poet of Revolution): he identifies his whole being with ceaseless change and defiant youth, rejecting stasis and the established order in favour of perpetual renewal and struggle. It is less a description than a battle-cry, poetry as political energy. The device is the mounting, incantatory repetition of "inqilab" three times, a rhetorical crescendo that makes the line sound like a marching chant, plus the emphatic parallel definitions ("kaam hai… naam hai") equating the self with abstractions of change and vigour. Loud, muscular, and declamatory, the couplet is quintessential Josh — the grand, oratorical voice of revolutionary Urdu poetry — and remains one of his most quoted revolutionary lines.',
		themes: ['revolution', 'youth', 'change'],
		sourceUrl: 'https://www.rekhta.org/couplets/kaam-hai-meraa-tagayyur-naam-hai-meraa-shabaab-josh-malihabadi-couplets'
	},

	// ─── Mohsin Naqvi (1947–1996) ──────────────────────────────────────────
	{
		slug: 'mohsin-ek-pal-mein-zindagi',
		urduScript: 'اک پل میں زندگی بھر کی اداسی دے گیا\nوہ جدا ہوتے ہوئے کچھ پھول باسی دے گیا',
		romanUrdu: 'ek pal mein zindagi bhar ki udasi de gaya\nwo juda hote hue kuchh phool basi de gaya',
		poet: 'Mohsin Naqvi',
		poetUrdu: 'محسن نقوی',
		era: '1947–1996 · Pakistan',
		referenceExplanation:
			'In a single instant he handed me a whole lifetime’s sorrow; as he parted, he left me some stale, withered flowers. Literally, one moment of separation deposited endless grief, and the departing beloved’s only gift was a clutch of wilted blooms. The deeper reading turns on the cruel disproportion and the symbolism of the "phool basi" (stale flowers): what should be a token of love arrives already dead, so the parting gift is itself an emblem of a love gone lifeless — freshness curdled into decay in the very act of giving. A single "pal" (instant) is set against a "zindagi bhar" (whole lifetime) of sadness, making time itself lopsided. The device is that arithmetic antithesis (one moment versus a lifetime) plus the bitter image of the wilted flower as a parting offering. Mohsin Naqvi — a hugely popular voice of the mushaira and of Karbala elegy — is at his most romantic-tragic here, in one of his most quoted couplets of loss.',
		themes: ['parting', 'grief', 'faded love'],
		sourceUrl: 'https://www.rekhta.org/ghazals/ek-pal-men-zindagii-bhar-kii-udaasii-de-gayaa-mohsin-naqvi-ghazals'
	}
];
