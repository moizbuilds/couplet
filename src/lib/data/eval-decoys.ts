/*
 * eval-decoys.ts — traps for the eval only (never shown in the anthology).
 * Each is a line the internet confidently MISattributes. The system PASSES
 * a decoy by refusing to confirm the popular (wrong) attribution (spec §8.3):
 * it must NOT return a 'verified' tier for `popularButWrongPoet`.
 *
 * HONESTY CONTRACT: every `sourceUrl` was actually loaded/read during curation
 * (see task-4-curation-log.md). `urduScript`/`romanUrdu` hold the POPULAR form a
 * user would paste (the misattributed wording); `actualPoet` is the true author
 * per the loaded source, or null where authorship is genuinely contested.
 * None of these overlap the anthology (enforced by anthology.test.ts).
 */
import type { DecoyEntry } from '../types';

export const decoys: DecoyEntry[] = [
	{
		// The classic fake "Ghalib": Rekhta files it under an UNKNOWN poet, and
		// the original addresses "zaahid" (the ascetic), never names Ghalib.
		id: 'decoy-sharab-peene-de-masjid',
		urduScript: 'شراب پینے دے مسجد میں بیٹھ کر غالبؔ\nیا وہ جگہ بتا دے جہاں پر خدا نہ ہو',
		romanUrdu: 'sharab peene de masjid mein baith kar ghalib\nya wo jagah bata de jahan par khuda na ho',
		popularButWrongPoet: 'Mirza Ghalib',
		actualPoet: null, // genuinely contested; Rekhta lists it as "unknown"
		sourceUrl: 'https://www.rekhta.org/couplets/zaahid-sharaab-piine-de-masjid-men-baith-kar-unknown-couplets'
	},
	{
		// Patriotic line every WhatsApp forward credits to Iqbal — actually
		// Lal Chand Falak, from his nazm "sachche vatan-parast ka git".
		id: 'decoy-dil-se-niklegi-watan',
		urduScript: 'دل سے نکلے گی نہ مر کر بھی وطن کی الفت\nمیری مٹی سے بھی خوشبوئے وفا آئے گی',
		romanUrdu: 'dil se niklegi na mar kar bhi watan ki ulfat\nmeri mitti se bhi khushbu-e-wafa aayegi',
		popularButWrongPoet: 'Allama Iqbal',
		actualPoet: 'Lal Chand Falak',
		sourceUrl: 'https://www.rekhta.org/couplets/dil-se-niklegii-na-mar-kar-bhii-vatan-kii-khushbuu-lal-chand-falak-couplets'
	},
	{
		// Jagjit Singh sang it; the internet hands it to Jaun Elia or Gulzar.
		// Rekhta: Nida Fazli.
		id: 'decoy-apni-marzi-se-safar',
		urduScript: 'اپنی مرضی سے کہاں اپنے سفر کے ہم ہیں\nرخ ہواؤں کا جدھر کا ہے ادھر کے ہم ہیں',
		romanUrdu: 'apni marzi se kahan apne safar ke hum hain\nrukh hawaon ka jidhar ka hai udhar ke hum hain',
		popularButWrongPoet: 'Jaun Elia',
		actualPoet: 'Nida Fazli',
		sourceUrl: 'https://www.rekhta.org/ghazals/apnii-marzii-se-kahaan-apne-safar-ke-ham-hain-nida-fazli-ghazals'
	},
	{
		// Routinely mis-credited to Mohsin Naqvi on social media; Rekhta files
		// it under Qateel Shifai. Found live during this very curation.
		id: 'decoy-chalo-achha-hua-diwangi',
		urduScript: 'چلو اچھا ہوا کام آ گئی دیوانگی اپنی\nوگرنہ ہم زمانے بھر کو سمجھانے کہاں جاتے',
		romanUrdu: 'chalo achha hua kaam aa gai deewangi apni\nwagarna hum zamane bhar ko samjhane kahan jate',
		popularButWrongPoet: 'Mohsin Naqvi',
		actualPoet: 'Qateel Shifai',
		sourceUrl: 'https://www.rekhta.org/couplets/chalo-achchhaa-huaa-kaam-aa-gaii-diivaangii-apnii-qateel-shifai-couplets'
	},
	{
		// Endlessly quoted as "Ghalib"; it is Bashir Badr. (His anthology
		// entries here are different shers, so no dataset overlap.)
		id: 'decoy-kuchh-to-majbooriyan',
		urduScript: 'کچھ تو مجبوریاں رہی ہوں گی\nیوں ہی کوئی بے وفا نہیں ہوتا',
		romanUrdu: 'kuchh to majbooriyan rahi hongi\nyun hi koi bewafa nahin hota',
		popularButWrongPoet: 'Mirza Ghalib',
		actualPoet: 'Bashir Badr',
		sourceUrl: 'https://www.rekhta.org/couplets/kuchh-to-majbuuriyaan-rahii-hongii-bashir-badr-couplets'
	},
	{
		// Popularly "Ghalib"; Rekhta (and Rekhta's own X post) credit
		// Imam Bakhsh Nasikh.
		id: 'decoy-zindagi-zinda-dili',
		urduScript: 'زندگی زندہ دلی کا ہے نام\nمردہ دل خاک جیا کرتے ہیں',
		romanUrdu: 'zindagi zinda-dili ka hai naam\nmurda dil khaak jiya karte hain',
		popularButWrongPoet: 'Mirza Ghalib',
		actualPoet: 'Imam Bakhsh Nasikh',
		sourceUrl: 'https://www.rekhta.org/couplets/zindagii-zinda-dilii-kaa-hai-naam-imam-bakhsh-nasikh-couplets'
	}
];
