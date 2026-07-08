/*
 * fixtures.ts — three sample SherExplanationResults, one per attribution
 * tier. WHY: the app's whole point is honesty about attribution, so the UI
 * must be checkable in all three states without spending an LLM call — this
 * powers /preview (Task 10) and will be reused by later component tests.
 *
 * Content is real, not invented: the verified sher is the actual opening
 * couplet of one of Ghalib's most quoted ghazals (also curated with a
 * source in src/lib/data/anthology.ts). The attributed and unknown fixtures
 * reuse real, source-checked lines from src/lib/data/eval-decoys.ts — real
 * shers whose attribution is exactly as contested as the tier they exemplify.
 */
import type { SherExplanationResult } from './types';

/** Tier 1 — verified: in the curated anthology, so code (not the LLM)
 *  upgrades this to a confident, linked attribution. */
export const verifiedFixture: SherExplanationResult = {
	analysis: {
		isValidSher: true,
		invalidReason: null,
		urduScript:
			'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے',
		romanUrdu: 'hazaron khwahishen aisi ke har khwahish pe dam nikle\nbahut nikle mere armaan lekin phir bhi kam nikle',
		translation:
			'A thousand desires, each so consuming that fulfilling it could cost a life — many of my longings were realised, and yet even so, they proved too few.',
		interpretation:
			'This is a meditation on human insatiability itself: desire is not a problem to be solved but the very engine of being, so even a lifetime of satisfied wishes still leaves the ledger short. The pun sits in "dam nikle" — literally "the breath departs" (to die), figuratively "to yearn to the point of expiry" — so each desire is framed as worth a life, while the closing "kam nikle" (turned out to be too few) deflates even a life crowded with fulfilment.',
		context:
			'The opening couplet (matla) of one of the most quoted ghazals in the Urdu canon, from the Diwan-e-Ghalib. Its stark honesty about wanting more, even after getting much, is why it has outlived its 19th-century Delhi setting.',
		themes: ['desire', 'insatiability'],
		devices: [
			{
				urduTerm: 'دم نکلے',
				english: 'the breath departs',
				explanation:
					'A pun that means both "to die" and, figuratively, "to yearn to the point of expiry" — every desire is framed as worth a life.'
			},
			{
				urduTerm: 'نکلے',
				english: 'turned out / emerged',
				explanation:
					'Repeated as the radif (the fixed rhyme-word) linking "dam nikle" and "kam nikle" — stitching death and shortfall into a single breath across both lines.'
			}
		],
		poetGuess: 'Mirza Ghalib',
		attributionConfidence: 'high'
	},
	attribution: { tier: 'verified', poet: 'Mirza Ghalib', slug: 'ghalib-hazaron-khwahishen' },
	cachedAt: null
};

/** Tier 2 — attributed: the LLM guesses a poet with high confidence, but the
 *  line isn't in the verified anthology, so code holds it at "attributed"
 *  rather than upgrading it to "verified". This is a real, widely-shared
 *  couplet the internet mis-files under Ghalib; Rekhta credits Bashir Badr. */
export const attributedFixture: SherExplanationResult = {
	analysis: {
		isValidSher: true,
		invalidReason: null,
		urduScript: 'کچھ تو مجبوریاں رہی ہوں گی\nیوں ہی کوئی بے وفا نہیں ہوتا',
		romanUrdu: 'kuchh to majbooriyan rahi hongi\nyun hi koi bewafa nahin hota',
		translation: 'There must have been some compulsions — no one becomes unfaithful just like that.',
		interpretation:
			'The couplet reaches for empathy over blame: rather than condemning the person who broke faith, it insists that betrayal has a hidden cause, some circumstance the betrayed party never got to see. It refuses to let "bewafa" (unfaithful) be the whole story.',
		context:
			'One of the most quoted lines in Urdu about heartbreak, and one of the internet\'s most persistent misattributions — it circulates almost everywhere as "Ghalib," but Rekhta credits it to the contemporary poet Bashir Badr, and it does not appear in Ghalib\'s divan.',
		themes: ['betrayal', 'empathy'],
		devices: [
			{
				urduTerm: 'بے وفا',
				english: 'unfaithful one',
				explanation: 'Names the person who broke faith without contempt — the word is held up for explanation, not condemnation.'
			},
			{
				urduTerm: 'مجبوریاں',
				english: 'compulsions / circumstances beyond one\'s control',
				explanation: 'Reframes the betrayal as circumstantial rather than a moral failing — the couplet\'s entire rhetorical move rests on this one word.'
			}
		],
		poetGuess: 'Bashir Badr',
		attributionConfidence: 'high'
	},
	attribution: { tier: 'attributed', poet: 'Bashir Badr' },
	cachedAt: null
};

/** Tier 3 — unknown: a genuinely contested "Ghalib" line that Rekhta itself
 *  lists under no confirmed author — the app says so rather than guessing. */
export const unknownFixture: SherExplanationResult = {
	analysis: {
		isValidSher: true,
		invalidReason: null,
		urduScript: 'شراب پینے دے مسجد میں بیٹھ کر غالبؔ\nیا وہ جگہ بتا دے جہاں پر خدا نہ ہو',
		romanUrdu: 'sharab peene de masjid mein baith kar ghalib\nya wo jagah bata de jahan par khuda na ho',
		translation: 'Let me drink sitting in the mosque — or tell me a single place where God does not exist.',
		interpretation:
			'The line stages a direct challenge to performed piety: if God is truly everywhere, no space is exempt from His presence, so drinking in the mosque is no more sinful than drinking anywhere else. It is the classic wine-and-mosque paradox Persian and Urdu poetry uses to expose the hypocrisy of policing where sin is and isn\'t allowed.',
		context:
			'One of the most widely shared "Ghalib" couplets online, but Rekhta lists it under no confirmed poet — it does not appear in Ghalib\'s verified divan, and the name inside the line itself may be a later addition meant to borrow his authority.',
		themes: ['piety vs. sin', 'hypocrisy'],
		devices: [
			{
				urduTerm: 'شراب',
				english: 'wine',
				explanation: 'Stands for worldly transgression, set deliberately against the sanctity of the mosque in the same breath.'
			},
			{
				urduTerm: 'مسجد',
				english: 'mosque',
				explanation: 'The sacred space is invoked ironically — the very site of piety becomes the stage for the poet\'s defiance.'
			}
		],
		poetGuess: null,
		attributionConfidence: 'none'
	},
	attribution: { tier: 'unknown' },
	cachedAt: null
};
