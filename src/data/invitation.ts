export interface EventDetails {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  day: string;
  time: string;
  venue: string;
  description: string;
  dressCode: string;
  iconName: 'Sparkles' | 'Music' | 'Flame' | 'Heart' | 'GlassWater' | 'Crown';
}

export interface StoryMilestone {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface WeddingInvitationData {
  groom: {
    firstName: string;
    fullName: string;
    parents: string;
    parentTitle: string;
    bio: string;
  };
  bride: {
    firstName: string;
    fullName: string;
    parents: string;
    parentTitle: string;
    bio: string;
  };
  weddingDate: {
    displayDate: string;
    dayOfWeek: string;
    time: string;
    year: number;
    month: number; // 0-indexed for JS Date
    day: number;
    isoDate: string;
  };
  venue: {
    name: string;
    subHeading: string;
    city: string;
    state: string;
    fullAddress: string;
    mapUrl: string;
    mapEmbedPlaceholder: string;
    directionsNote: string;
  };
  events: EventDetails[];
  story: StoryMilestone[];
  gallery: GalleryPhoto[];
  rsvpConfig: {
    deadline: string;
    contactPhone: string;
    contactEmail: string;
  };
}

export const weddingData: WeddingInvitationData = {
  groom: {
    firstName: "Imran",
    fullName: "Imran Pathan",
    parents: "Mr Barkat Pathan",
    parentTitle: "Son of Mr Barkat Pathan",
    bio: "Architect of dreams, passionate soul, and Anam's forever partner."
  },
  bride: {
    firstName: "Anam",
    fullName: "Anam Shaikh",
    parents: "Irfan Shaikh",
    parentTitle: "Daughter of Irfan Shaikh",
    bio: "Graceful artist, bibliophile, and Imran's eternal joy."
  },
  weddingDate: {
    displayDate: "November 22, 2026",
    dayOfWeek: "Sunday",
    time: "11:30 AM",
    year: 2026,
    month: 10, // November
    day: 22,
    isoDate: "2026-11-22T11:30:00"
  },
  venue: {
    name: "Gayatri Lawns",
    subHeading: "Sortee Nagar, near Ambad Chowfully",
    city: "Jalna",
    state: "Maharashtra 431213",
    fullAddress: "Gayatri Lawns, Sortee Nagar, near Ambad Chowfully, Jalna, Maharashtra 431213",
    mapUrl: "https://maps.google.com/?q=Gayatri+Lawns+Sortee+Nagar+Ambad+Chowfully+Jalna+Maharashtra+431213",
    mapEmbedPlaceholder: "Sortee Nagar, near Ambad Chowfully",
    directionsNote: "Conveniently located near Ambad Chowfully, Jalna with ample parking facilities for all guests."
  },
  events: [
    {
      id: "mehendi",
      title: "Rang-e-Mehendi",
      subTitle: "",
      date: "November 19, 2026",
      day: "Thursday",
      time: "08:00 PM onwards",
      venue: "",
      description: "",
      dressCode: "",
      iconName: "Sparkles"
    },
    {
      id: "haldi",
      title: "Haldi",
      subTitle: "",
      date: "November 20, 2026",
      day: "Friday",
      time: "11:00 AM onwards",
      venue: "",
      description: "",
      dressCode: "",
      iconName: "Flame"
    },
    {
      id: "sangeet",
      title: "Jashn-e-Sangeet",
      subTitle: "",
      date: "November 20, 2026",
      day: "Friday",
      time: "07:30 PM onwards",
      venue: "",
      description: "",
      dressCode: "",
      iconName: "Music"
    },
    {
      id: "nikah",
      title: "Nikah",
      subTitle: "",
      date: "November 22, 2026",
      day: "Sunday",
      time: "11:30 AM onwards",
      venue: "Gayatri Lawns",
      description: "",
      dressCode: "Royal Traditional / Formal Festive",
      iconName: "Crown"
    },
    {
      id: "reception",
      title: "Reception",
      subTitle: "",
      date: "November 24, 2026",
      day: "Tuesday",
      time: "06:00 PM onwards",
      venue: "Rutba Function Hall",
      description: "",
      dressCode: "Festive Elegance",
      iconName: "Heart"
    }
  ],
  story: [
    {
      year: "2025",
      title: "The Heartfelt Promise",
      subtitle: "A Bond For Life",
      description: "With heartfelt joy and the blessings of both families, two souls promised to walk hand in hand forever.",
      icon: "💍"
    },
    {
      year: "2026",
      title: "The Forever Beginning",
      subtitle: "Our Wedding Day",
      description: "Surrounded by our loved ones, stepping into a lifetime of love, companionship, and endless joy.",
      icon: "💖"
    }
  ],
  gallery: [
    {
      id: "photo-1",
      url: `${import.meta.env.BASE_URL}wedding1.jpg.jpeg`,
      caption: "Cherished smiles and golden memories",
      aspect: "portrait"
    },
    {
      id: "photo-2",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      caption: "Laughter, unconditional warmth, and golden hour magic",
      aspect: "landscape"
    },
    {
      id: "photo-3",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80",
      caption: "The promise of forever inscribed in our hearts",
      aspect: "portrait"
    },
    {
      id: "photo-4",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OOcVuysbollXrADzsaRUElBftXulgNGWrPp7V7DrUxZDkSR3YLcabFjX&s=10",
      caption: "Enchanted moments beneath the starlit sky",
      aspect: "landscape"
    },
    {
      id: "photo-5",
      url: "https://media.istockphoto.com/id/2248742586/photo/close-up-of-a-bride-with-henna-patterned-hands-placing-a-diamond-ring-on-the-grooms-finger.jpg?s=612x612&w=0&k=20&c=J8rz7khXz43wdiGzcYidDOZaz5E-IBpz5-obG1rvlBc=",
      caption: "Every glance speaks a thousand heartfelt words",
      aspect: "portrait"
    },
    {
      id: "photo-6",
      url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
      caption: "Together, stepping into our eternal chapter",
      aspect: "square"
    }
  ],
  rsvpConfig: {
    deadline: "November 10, 2026",
    contactPhone: "+91 98765 43210",
    contactEmail: "imran.anam2026@gmail.com"
  }
};
