/* ===================================================
   PDF GENERATOR — Sanskriti Setu
   Uses jsPDF (loaded from CDN) to generate 15-page PDFs
   =================================================== */

// Load jsPDF from CDN dynamically
function loadJsPDF(callback) {
  if (window.jspdf) { callback(); return; }
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  script.onload = callback;
  script.onerror = () => { alert('PDF library could not load. Please check your internet connection.'); };
  document.head.appendChild(script);
}

// PDF content definitions per module
const PDF_CONTENT = {
  festivals: {
    title: 'Festivals of India',
    subtitle: 'A Complete Learning Workbook for Children',
    emoji: '🪔',
    pages: [
      { heading: 'What Are Festivals?', body: 'Festivals are special days when families and communities come together to celebrate, pray, and be joyful. India has more festivals than any other country in the world!\n\nEvery region, religion, and community in India has its own special celebrations. This makes India an incredibly colorful and joyful place to live.\n\nActivity: Ask your family about their favorite festival and draw it on page 3!' },
      { heading: 'Diwali — Festival of Lights 🪔', body: 'Diwali is celebrated by Hindus, Jains, Sikhs, and some Buddhists!\n\nWhen: October/November (Kartik month)\nWhy: Celebrates Lord Ram\'s return to Ayodhya, Goddess Lakshmi\'s blessings\n\nHow we celebrate:\n• Light diyas (clay lamps) around the home\n• Make Rangoli designs with colored powder\n• Exchange sweets with neighbors\n• Burst crackers (eco-friendly ones!)\n• Pray to Goddess Lakshmi for prosperity\n\nDid you know: Over 1 billion people celebrate Diwali worldwide!' },
      { heading: 'Holi — Festival of Colors 🌈', body: 'Holi is the most colorful festival in the world!\n\nWhen: March (Phalgun month — end of winter)\nWhy: Celebrates victory of good over evil (Prahlad and Holika story), arrival of spring and love of Radha-Krishna\n\nHow we celebrate:\n• Burn the Holika bonfire the night before (Holika Dahan)\n• Throw colored powder (gulal) on friends and family\n• Drench each other with water and water guns\n• Eat Gujiya (sweet dumplings) and drink Thandai\n\nSafety note: Use only natural flower-based colors!' },
      { heading: 'Navratri & Dussehra 💃', body: 'Nine nights of dance and one day of victory!\n\nNavratri: 9 nights of worship of Goddess Durga in all her 9 forms\n• Night 1-3: Goddess Shailaputri, Brahmacharini, Chandraghanta\n• Night 4-6: Kushmanda, Skandamata, Katyayani\n• Night 7-9: Kaalratri, Mahagauri, Siddhidatri\n\nHow: Garba dance in Gujarat, Dandiya Raas, fasting, prayers\n\nDussehra (Day 10): Burning of giant Ravana effigy — symbolizing burning of ego and evil\n\nFun fact: Mysuru Dasara is one of the grandest processions in the world — 400+ years old!' },
      { heading: 'Eid & Islamic Festivals ☪️', body: 'India has the world\'s second-largest Muslim population.\n\nEid-ul-Fitr: Celebration after 30 days of Ramadan (fasting)\n• Special prayers at mosque in the morning\n• New clothes and exchange of gifts\n• Preparation of Biryani, Sewai (vermicelli dessert), Sheer Khurma\n• The greeting: "Eid Mubarak!" (Joyful Eid!)\n\nEid-ul-Adha: Festival of sacrifice and sharing\n• Commemorates Ibrahim\'s devotion\n• Food shared with neighbors and the poor\n\nMuharram: Day of remembrance — solemn processions' },
      { heading: 'Christmas & Christian Festivals ✝️', body: 'India has a rich Christian tradition dating back to 52 AD!\n\nSt. Thomas (one of Jesus\'s disciples) is believed to have landed in Kerala in 52 AD — making Indian Christianity one of the oldest in the world.\n\nChristmas (December 25):\n• Midnight Mass in beautiful churches\n• Star decorations (the Star of Bethlehem)\n• Plum cake and Christmas sweets\n• Carol singing\n\nGoa\'s Christmas: The most famous in India — Portuguese colonial influence creates a magical atmosphere with music, processions, and special food.' },
      { heading: 'Guru Nanak Jayanti & Sikh Festivals 🙏', body: 'Sikhism was founded in Punjab, India by Guru Nanak Dev Ji.\n\nGuru Nanak Jayanti (November/December):\n• Birthday of Guru Nanak Dev Ji — founder of Sikhism\n• Akhand path: 48-hour non-stop reading of Guru Granth Sahib\n• Langar: Free vegetarian meal for everyone, regardless of religion or caste\n• Nagar Kirtan: Joyful procession through streets with singing\n\nGuru Gobind Singh Jayanti: Birthday of the 10th and final human Guru\n\nBaisakhi (April 13): Founding of the Khalsa Panth in 1699 — Sikhs\' New Year and harvest festival' },
      { heading: 'Pongal & Harvest Festivals 🌾', body: 'India is an agricultural country — harvest festivals are celebrated in every state!\n\nPongal (Tamil Nadu - January):\n• 4-day festival thanking Sun God and nature\n• Day 1 (Bhogi): Clean and decorate the house\n• Day 2 (Thai Pongal): Cook the new harvest rice pudding (Pongal) in clay pots until it overflows — overflow means abundance!\n• Day 3 (Mattu Pongal): Decorate cattle (they help farmers!)\n• Day 4 (Kaanum Pongal): Family gatherings\n\nOther harvest festivals: Baisakhi (Punjab), Bihu (Assam), Onam (Kerala), Makar Sankranti (all of India)' },
      { heading: 'Janmashtami — Krishna\'s Birthday 🎉', body: 'Lord Krishna — one of the most beloved deities in Hinduism — was born on this day!\n\nWhen: August (Bhadra month, midnight)\nWhy: Midnight is the exact time of Krishna\'s birth\n\nHow we celebrate:\n• Fast the whole day until midnight\n• Midnight aarti and puja\n• Dahi Handi: Human pyramid to break a pot of curd (butter) hanging high — young men form towers!\n• Enact the birth of Krishna with drama\n• Sing bhajans and kirtans all night\n\nMathura and Vrindavan (UP) have the grandest celebrations — lakhs of pilgrims attend!' },
      { heading: 'Onam — Kerala\'s Harvest Festival 🌸', body: 'Onam is celebrated by ALL Keralites — Hindu, Muslim, and Christian!\n\nWhen: August/September (10 days)\nWhy: Celebrates the return of King Mahabali — the beloved democratic king of Kerala\n\nHighlights:\n• Pookalam: Elaborate carpet of flowers — each day a new ring added for 10 days\n• Sadhya: Vegetarian feast of 26+ dishes served on a banana leaf!\n• Vallam Kali: Spectacular snake boat race on backwater lakes (hundreds of rowers!)\n• Thiruvathira: Women\'s traditional dance\n• Kaikottikali: Clapping dance in circles\n\nFun fact: Onam Sadhya is one of the world\'s most elaborate traditional meals!' },
      { heading: 'Drawing Activity — My Favorite Festival', body: 'ACTIVITY PAGE\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\nDraw your favorite Indian festival in the space below!\n\nMy festival is: ___________________________\n\nI like it because: ________________________\n\n\n[LARGE DRAWING SPACE]\n\n\n\n\n\n\n\n\nColor the diyas, flowers, and decorations!\n\nAsk a family member: "What is special about this festival?"' },
      { heading: 'Festival Quiz — Test Your Knowledge!', body: 'QUIZ TIME! Circle the correct answer:\n\n1. Diwali is also called:\na) Festival of Colors  b) Festival of Lights  c) Festival of Music  d) Festival of Food\n\n2. Holi celebrates the story of:\na) Lord Ram returning to Ayodhya\nb) King Mahabali visiting Kerala\nc) Prahlad\'s devotion defeating Holika\nd) Lord Krishna\'s birthday\n\n3. Navratri lasts for how many nights?\na) 3 nights  b) 5 nights  c) 9 nights  d) 12 nights\n\n4. The Pongal festival is from which state?\na) Maharashtra  b) Gujarat  c) Tamil Nadu  d) Punjab\n\n5. "Eid Mubarak" means:\na) Happy Diwali  b) Happy New Year  c) Joyful Eid  d) Stay healthy\n\nAnswers: 1-b, 2-c, 3-c, 4-c, 5-c' },
      { heading: 'Festival Calendar — Every Month Has a Festival!', body: 'JANUARY: Makar Sankranti (kite flying!), Pongal, Lohri\nFEBRUARY: Vasant Panchami (Saraswati Puja — decorate books!)\nMARCH: Holi (colors!), Shivaratri, Ugadi, Gudi Padwa\nAPRIL: Ram Navami, Baisakhi, Vishu\nMAY: Buddha Purnima, Akshaya Tritiya\nJUNE: International Yoga Day (June 21!)\nJULY: Rath Yatra, Guru Purnima, Ashadhi Ekadashi\nAUGUST: Independence Day, Onam, Janmashtami, Raksha Bandhan\nSEPTEMBER: Ganesh Chaturthi, Navratri begins\nOCTOBER: Navratri, Dussehra, Karva Chauth\nNOVEMBER: Diwali, Guru Nanak Jayanti, Chhath Puja\nDECEMBER: Christmas, Eid-ul-Adha (varies)' },
      { heading: 'Coloring Page — Festival Decorations', body: 'COLORING ACTIVITY\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔 🪔\n\nColor the following using bright, happy colors:\n\n⭐ The diya flames — use yellow and orange!\n⭐ The Rangoli pattern — use pink, blue, and green!\n⭐ The stars in the sky — use yellow!\n⭐ The fireworks — use red, green, and gold!\n\n\n[ OUTLINE RANGOLI PATTERN HERE ]\n\n\n\n\nRemember: Every color in a festival has a meaning.\nRed = love and courage\nYellow = wisdom and learning\nGreen = nature and growth\nBlue = peace and sky\nWhite = purity and peace' },
      { heading: 'My Festival Journal', body: 'PERSONAL JOURNAL PAGE\n━━━━━━━━━━━━━━━━━━━━━━━━━\n\nName: ______________________________\nClass: ______________________________\nFavorite Festival: ___________________\n\nWhat I learned about Indian festivals:\n\n1. _________________________________\n   _________________________________\n\n2. _________________________________\n   _________________________________\n\n3. _________________________________\n   _________________________________\n\nA festival I would like to learn more about:\n_____________________________________\n\nOne thing I will do to celebrate an Indian festival:\n_____________________________________\n_____________________________________\n\nJoyful Learning! Jai Hind! 🇮🇳' }
    ]
  }
};

// Generate default content for modules without full definitions
function getDefaultPages(moduleKey) {
  const titles = {
    yoga: 'Yoga & Pranayama',
    food: 'Indian Food Magic',
    music: 'Indian Music & Instruments',
    languages: 'Languages of India',
    nature: 'Nature & Ayurveda',
    dance: 'Dance & Arts',
    stories: 'Stories & Values',
    states: 'States of India',
    'teacher-guidelines': 'Teacher Guidelines',
    'emotional-development': 'Emotional Development for Teachers'
  };
  const title = titles[moduleKey] || moduleKey;
  const pages = [];
  for (let i = 1; i <= 15; i++) {
    pages.push({
      heading: i === 1 ? `Introduction to ${title}` :
               i === 15 ? 'My Learning Journal' :
               `${title} — Page ${i}`,
      body: i === 1 ?
        `Welcome to the ${title} module!\n\nIndia is a land of incredible diversity and rich cultural heritage. This workbook will take you on a journey through one of the many wonderful aspects of Indian culture.\n\nHow to use this workbook:\n• Read each page carefully\n• Complete the activities with a parent or teacher\n• Draw and color in the activity boxes\n• Share what you learn with your family!\n\nRemember: Every culture has beautiful things to offer. Learning about Indian culture helps us understand and respect all people. Let's begin our adventure! 🇮🇳` :
      i === 15 ?
        `MY LEARNING JOURNAL\n━━━━━━━━━━━━━━━━━━━\n\nName: ________________________\nClass: ________________________\nDate: ________________________\n\nThree things I learned:\n1. ____________________________\n   ____________________________\n2. ____________________________\n   ____________________________\n3. ____________________________\n   ____________________________\n\nMy favorite part was:\n______________________________\n______________________________\n\nI want to learn more about:\n______________________________\n\nStar Rating: ⭐ ⭐ ⭐ ⭐ ⭐\n\nSigned: ______________________\nTeacher: _____________________\n\nSanskriti Setu — Building Bridges to Indian Culture 🪔` :
        `${title}\n\nPage ${i} Content\n\nThis page explores an important aspect of ${title} in Indian culture. India has one of the world's oldest and richest cultural traditions, spanning thousands of years.\n\nKey Learning Points:\n• Indian culture is diverse and varied across 28 states\n• Each tradition has deep historical and philosophical roots\n• Cultural practices help develop identity, values, and wellbeing\n• Learning culture connects us to our roots and community\n\nActivity:\nDraw something you learned about ${title} in the box below, or write 3 words that describe what you feel about it.\n\n[ ACTIVITY SPACE ]\n\n\n\n\n\nDiscussion Question:\nWhat is something similar in your own family\'s traditions?`
    });
  }
  return pages;
}

// Main PDF generation function
function downloadPDF(moduleKey) {
  showToast('📄 Preparing your 15-page PDF... Please wait!', 'info', 4000);
  loadJsPDF(() => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const content = PDF_CONTENT[moduleKey] || { title: moduleKey, pages: getDefaultPages(moduleKey) };
      const pages = content.pages && content.pages.length === 15 ? content.pages : getDefaultPages(moduleKey);

      const W = 210, H = 297;
      const margin = 18;
      const contentW = W - margin * 2;

      // Color palette
      const saffron = [255, 107, 53];
      const teal = [13, 148, 136];
      const gold = [245, 158, 11];
      const dark = [30, 30, 50];
      const mid = [100, 100, 120];

      pages.forEach((page, idx) => {
        if (idx > 0) doc.addPage();
        const pageNum = idx + 1;

        // --- HEADER BAR ---
        doc.setFillColor(...saffron);
        doc.rect(0, 0, W, 22, 'F');
        doc.setFillColor(...teal);
        doc.rect(0, 18, W, 4, 'F');

        // App name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text('SANSKRITI SETU', margin, 10);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text('Indian Culture Learning for Children', margin, 16);

        // Page number (right side)
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(`Page ${pageNum} / 15`, W - margin, 10, { align: 'right' });

        // --- TITLE BOX ---
        doc.setFillColor(255, 248, 240);
        doc.roundedRect(margin, 28, contentW, 22, 3, 3, 'F');
        doc.setDrawColor(...saffron);
        doc.setLineWidth(0.5);
        doc.roundedRect(margin, 28, contentW, 22, 3, 3, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...dark);
        doc.text(page.heading, margin + 5, 40);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(...mid);
        doc.text(`Module: ${content.title || moduleKey}  |  Sanskriti Setu`, margin + 5, 47);

        // --- BODY CONTENT ---
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(...dark);
        const bodyLines = doc.splitTextToSize(page.body, contentW - 8);
        let yPos = 58;
        const lineH = 6;

        bodyLines.forEach(line => {
          if (yPos > H - 28) return; // Prevent overflow beyond footer
          if (line.startsWith('━') || line.startsWith('─')) {
            doc.setDrawColor(...saffron);
            doc.setLineWidth(0.3);
            doc.line(margin, yPos - 1, margin + contentW, yPos - 1);
          } else if (line.endsWith(':') && line.length < 50) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(...saffron);
            doc.text(line, margin + 3, yPos);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...dark);
          } else if (line.startsWith('•') || line.startsWith('→') || line.startsWith('⭐')) {
            doc.setTextColor(teal[0], teal[1], teal[2]);
            doc.text(line, margin + 6, yPos);
            doc.setTextColor(...dark);
          } else {
            doc.text(line, margin + 3, yPos);
          }
          yPos += lineH;
        });

        // --- DECORATIVE FOOTER ---
        doc.setFillColor(250, 245, 240);
        doc.rect(0, H - 20, W, 20, 'F');
        doc.setFillColor(...saffron);
        doc.rect(0, H - 20, W, 1.5, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(...mid);
        doc.text('Sanskriti Setu — Building Bridges to Indian Culture 🪔', margin, H - 12);
        doc.text(`© Indian Culture Learning App | ${content.title}`, margin, H - 7);

        // India flag colors strip
        doc.setFillColor(255, 153, 51);  // Saffron
        doc.rect(W - 30, H - 18, 30, 5.5, 'F');
        doc.setFillColor(255, 255, 255);
        doc.rect(W - 30, H - 12.5, 30, 5.5, 'F');
        doc.setFillColor(19, 136, 8);    // India green
        doc.rect(W - 30, H - 7, 30, 5.5, 'F');
      });

      // Save
      const filename = `Sanskriti-Setu-${content.title || moduleKey}-Workbook.pdf`;
      doc.save(filename.replace(/\s+/g, '-'));
      showToast('✅ Your 15-page PDF has been downloaded!', 'success', 4000);
    } catch (err) {
      console.error('PDF error:', err);
      showToast('❌ PDF generation failed. Please try again.', 'error');
    }
  });
}
