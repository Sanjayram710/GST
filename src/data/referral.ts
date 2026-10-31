export interface ReferredBusiness {
  id: string;
  businessName: string;
  ownerName: string;
  city: string;
  date: string;
  status: 'Registered & Active' | 'Filing In Progress' | 'Invited';
  creditEarned: number;
}

export interface ReferralData {
  creditBalance: number;
  referralCode: string;
  referralLink: string;
  totalReferred: number;
  totalCreditsEarned: number;
  referredList: ReferredBusiness[];
}

export const REFERRAL_DATA: ReferralData = {
  creditBalance: 3500,
  referralCode: 'MALABAR92',
  referralLink: 'https://gstsimple.in/r/MALABAR92',
  totalReferred: 5,
  totalCreditsEarned: 5000,
  referredList: [
    {
      id: 'ref-1',
      businessName: 'Wayanad Organic Spices',
      ownerName: 'M. Kurian',
      city: 'Kalpetta, Wayanad',
      date: '12 Oct 2026',
      status: 'Registered & Active',
      creditEarned: 1500,
    },
    {
      id: 'ref-2',
      businessName: 'Travancore Timber Depot',
      ownerName: 'Sunil Varghese',
      city: 'Kottayam',
      date: '20 Oct 2026',
      status: 'Filing In Progress',
      creditEarned: 1000,
    },
    {
      id: 'ref-3',
      businessName: 'Cochin Marine Exports',
      ownerName: 'Abdul Latheef',
      city: 'Fort Kochi',
      date: '28 Oct 2026',
      status: 'Invited',
      creditEarned: 1000,
    },
  ],
};

