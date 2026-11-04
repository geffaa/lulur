# Images — Lulur mockups

Open-licensed photos from Wikimedia Commons, cropped for the booking page (`img/p-*.jpg`). Crops count as changes under CC BY / BY-SA. Originals are in `img/` and metadata in `img/credits.json`. The photos come from different spas, so the tenant "Tirta Spa" is fictional. Replace them with a generated or shot set using the prompts below.

| Used as | File | Author | Licence | Source |
|---|---|---|---|---|
| Booking hero, room | p-hero | Paradisus Bali | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:YHI_Spa_treatment_room_at_Paradisus_by_Meli%C3%A1_Bali.jpg |
| Balinese Massage | p-balinese | Deepakyadav78626 | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Young-man-spa-treatment-recreation-rest-relaxation-massage-hygh-angle-view.jpg |
| Hot Stone Massage | p-stone | Daniela | CC BY 2.0 | https://commons.wikimedia.org/wiki/File:Hot_Stone_Massage_at_Witches_Falls_Cottages.jpg |
| Couples Ritual (suite with bath) | p-couples | Missvain (Sarah Stierch) | CC BY 4.0 | https://commons.wikimedia.org/wiki/File:Lounge_at_the_Spa_at_Silver_Legacy_-_2021-11-14_-_Sarah_Stierch_01.jpg |
| Lulur Royal Ritual (flower bowl) | p-flowers | Kate Branch | CC BY-SA 4.0 | https://commons.wikimedia.org/wiki/File:Mansion_Resort_and_Spa_in_Bali_-_21.jpg |
| Signature Facial | p-facial | Keyfwellness | CC0 | https://commons.wikimedia.org/wiki/File:SPA_SKIN_CARE.jpg |

## Generation prompts (consistent set for a Balinese spa)
Shared style, to append to every prompt:

> Editorial photography for a calm Balinese day spa in Ubud. Soft natural daylight through bamboo blinds, warm teak, white linen, frangipani, volcanic stone, deep rosewood accents. 35 mm lens, eye level, shallow depth of field. Real skin texture, no retouched glamour. No text, no logos, no visible faces except where stated (keep faces turned away or cropped). Photorealistic.

| File | Prompt (add the shared style) | Ratio |
|---|---|---|
| p-hero | A treatment room with two massage beds dressed in white linen, a carved teak screen, rice fields visible through an open window, a bowl of frangipani on a stone ledge. | 3:2, 2400 × 1600 |
| p-balinese | A therapist's hands applying warm coconut oil with long strokes on a guest's upper back; guest face down, towel at the waist. | 1:1, 1200 × 1200 |
| p-stone | Smooth black basalt stones in a row along a guest's spine, steam rising from a stone warmer in the background. | 1:1 |
| p-couples | A couples suite with two beds side by side and a sunken stone bath strewn with petals, candles lit. | 1:1 |
| p-flowers | Top view of a stone bowl of water filled with frangipani, bougainvillea and marigold petals, next to a small dish of yellow turmeric lulur scrub. | 1:1 |
| p-facial | A guest lying back with a cooling green clay mask and cotton eye pads, therapist's gloved hands at the temples; face partly cropped. | 1:1 |
| Therapist avatars (optional) | Friendly portrait of a Balinese spa therapist in a rosewood uniform, plain warm wall, head and shoulders. | 1:1, 600 × 600 |

Keep the file names and sizes, then rerun `python3 lulur_v1.py`.
