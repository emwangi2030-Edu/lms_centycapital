/* lms-console/app.js — CentyCapital LMS v2.0 */

// ─── MUTABLE DATA ─────────────────────────────────────────────────────────────

let LEADS = [
  {id:1,name:'Grace Wanjiku',phone:'0712 345 678',biz:'Grace Wines & Spirits',location:'Westlands',distributor:'CentyDist Nairobi',source:'Field Agent',status:'Pending'},
  {id:2,name:'Peter Kamau',phone:'0723 456 789',biz:'Kamau Hardware',location:'Thika',distributor:'CentyDist Nairobi',source:'Referral',status:'Approved'},
  {id:3,name:'Faith Njeri',phone:'0734 567 890',biz:'Njeri Agrovet',location:'Nakuru',distributor:'CentyDist Nakuru',source:'WhatsApp',status:'Pending'},
  {id:4,name:'James Omondi',phone:'0745 678 901',biz:'Omondi Mobile Shop',location:'Kisumu',distributor:'CentyDist Kisumu',source:'Walk-in',status:'Completed'},
  {id:5,name:'Mary Adhiambo',phone:'0756 789 012',biz:'Mama Mary Salon',location:'Kisumu',distributor:'CentyDist Kisumu',source:'Referral',status:'Pending'},
  {id:6,name:'Samuel Kiprono',phone:'0767 890 123',biz:'Kip Fresh Produce',location:'Eldoret',distributor:'CentyDist Eldoret',source:'Field Agent',status:'Rejected'},
  {id:7,name:'Agnes Mutua',phone:'0778 901 234',biz:'Mutua Boutique',location:'Machakos',distributor:'CentyDist Nairobi',source:'WhatsApp',status:'Approved'},
  {id:8,name:'David Mwangi',phone:'0789 012 345',biz:'Mwangi Butchery',location:'Nairobi CBD',distributor:'CentyDist Nairobi',source:'Field Agent',status:'Pending'},
  {id:9,name:'Lucy Atieno',phone:'0790 123 456',biz:'Lucy Cereals',location:'Siaya',distributor:'CentyDist Kisumu',source:'Referral',status:'Completed'},
  {id:10,name:'Charles Ndirangu',phone:'0711 234 567',biz:'Ndirangu Electronics',location:'Nyeri',distributor:'CentyDist Nakuru',source:'Field Agent',status:'Pending'},
  {id:11,name:'Esther Muthoni',phone:'0722 345 678',biz:'Muthoni Pharmacy',location:'Karatina',distributor:'CentyDist Nakuru',source:'Walk-in',status:'Approved'},
  {id:12,name:'Francis Onyango',phone:'0733 456 789',biz:'Onyango Logistics',location:'Mombasa',distributor:'CentyDist Mombasa',source:'Referral',status:'Rejected'},
  {id:13,name:'Hannah Chebet',phone:'0744 567 890',biz:'Chebet Dairy',location:'Eldoret',distributor:'CentyDist Eldoret',source:'WhatsApp',status:'Pending'},
  {id:14,name:'Isaac Waweru',phone:'0755 678 901',biz:'Waweru Auto Parts',location:'Thika',distributor:'CentyDist Nairobi',source:'Field Agent',status:'Completed'},
];

let APPS = [
  {ref:'CNTAPP001',borrower:'Grace Wanjiku',amount:30000,rate:'5%/mo',product:'CentyFlex 30',partner:'Centum MFI',status:'Pending',applied:'10 Mar 2026'},
  {ref:'CNTAPP002',borrower:'Peter Kamau',amount:75000,rate:'4.5%/mo',product:'CentyGrowth 60',partner:'Faulu Kenya',status:'Pending',applied:'11 Mar 2026'},
  {ref:'CNTAPP003',borrower:'Faith Njeri',amount:20000,rate:'5.5%/mo',product:'CentyFlex 30',partner:'Centum MFI',status:'Approved',applied:'09 Mar 2026'},
  {ref:'CNTAPP004',borrower:'Agnes Mutua',amount:50000,rate:'4%/mo',product:'CentyBoost 90',partner:'Letshego',status:'Pending',applied:'12 Mar 2026'},
  {ref:'CNTAPP005',borrower:'David Mwangi',amount:15000,rate:'6%/mo',product:'CentyMicro 14',partner:'Centum MFI',status:'Rejected',applied:'08 Mar 2026'},
  {ref:'CNTAPP006',borrower:'Esther Muthoni',amount:100000,rate:'3.5%/mo',product:'CentyPro 120',partner:'Equity Bank',status:'Pending',applied:'13 Mar 2026'},
  {ref:'CNTAPP007',borrower:'Isaac Waweru',amount:45000,rate:'4.5%/mo',product:'CentyGrowth 60',partner:'Faulu Kenya',status:'Pending',applied:'13 Mar 2026'},
];

let LOANS = [
  {ref:'CNTLOAN001',borrower:'Grace Wanjiku',ke:'KE-0041',amount:30000,disbursed:'01 Mar 2026',repayment:31500,due:'31 Mar 2026',product:'CentyFlex 30',partner:'Centum MFI',till:'891234',mode:'Paybill',status:'Repaid'},
  {ref:'CNTLOAN002',borrower:'Peter Kamau',ke:'KE-0087',amount:75000,disbursed:'15 Feb 2026',repayment:78375,due:'15 Apr 2026',product:'CentyGrowth 60',partner:'Faulu Kenya',till:'891235',mode:'USSD',status:'Active'},
  {ref:'CNTLOAN003',borrower:'Faith Njeri',ke:'KE-0112',amount:20000,disbursed:'10 Feb 2026',repayment:21100,due:'10 Mar 2026',product:'CentyFlex 30',partner:'Centum MFI',till:'891234',mode:'Paybill',status:'Overdue'},
  {ref:'CNTLOAN004',borrower:'James Omondi',ke:'KE-0056',amount:12000,disbursed:'01 Feb 2026',repayment:12720,due:'28 Feb 2026',product:'CentyMicro 14',partner:'Centum MFI',till:'891234',mode:'Paybill',status:'Repaid'},
  {ref:'CNTLOAN005',borrower:'Mary Adhiambo',ke:'KE-0078',amount:25000,disbursed:'20 Feb 2026',repayment:26250,due:'20 Mar 2026',product:'CentyFlex 30',partner:'Letshego',till:'891237',mode:'USSD',status:'Due'},
  {ref:'CNTLOAN006',borrower:'Samuel Kiprono',ke:'KE-0034',amount:18000,disbursed:'05 Jan 2026',repayment:19800,due:'05 Feb 2026',product:'CentyFlex 30',partner:'Faulu Kenya',till:'891235',mode:'Paybill',status:'Overdue'},
  {ref:'CNTLOAN007',borrower:'Agnes Mutua',ke:'KE-0091',amount:50000,disbursed:'01 Mar 2026',repayment:52000,due:'29 May 2026',product:'CentyBoost 90',partner:'Letshego',till:'891237',mode:'Paybill',status:'Active'},
  {ref:'CNTLOAN008',borrower:'Lucy Atieno',ke:'KE-0023',amount:8000,disbursed:'01 Jan 2026',repayment:8480,due:'31 Jan 2026',product:'CentyMicro 14',partner:'Centum MFI',till:'891234',mode:'USSD',status:'Repaid'},
  {ref:'CNTLOAN009',borrower:'Charles Ndirangu',ke:'KE-0067',amount:35000,disbursed:'15 Feb 2026',repayment:36575,due:'15 Apr 2026',product:'CentyGrowth 60',partner:'Faulu Kenya',till:'891235',mode:'Paybill',status:'Active'},
  {ref:'CNTLOAN010',borrower:'Esther Muthoni',ke:'KE-0103',amount:100000,disbursed:'01 Mar 2026',repayment:103500,due:'28 May 2026',product:'CentyPro 120',partner:'Equity Bank',till:'891238',mode:'Paybill',status:'Active'},
  {ref:'CNTLOAN011',borrower:'Hannah Chebet',ke:'KE-0049',amount:15000,disbursed:'10 Dec 2025',repayment:16650,due:'10 Jan 2026',product:'CentyFlex 30',partner:'Centum MFI',till:'891234',mode:'USSD',status:'Written Off'},
  {ref:'CNTLOAN012',borrower:'Isaac Waweru',ke:'KE-0082',amount:45000,disbursed:'01 Mar 2026',repayment:47025,due:'29 Apr 2026',product:'CentyGrowth 60',partner:'Faulu Kenya',till:'891235',mode:'Paybill',status:'Frozen'},
];

let BORROWERS = [
  {ref:'BWR-0001',name:'Grace Wanjiku',phone:'0712 345 678',ke:'KE-0041',limit:50000,score:752,biz:'Grace Wines & Spirits',bizType:'Retailer',location:'Westlands',distributor:'CentyDist Nairobi',id:'12345679',refName:'John Wanjiku',refPhone:'0700 111 222',refRel:'Husband',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN']},
  {ref:'BWR-0002',name:'Peter Kamau',phone:'0723 456 789',ke:'KE-0087',limit:100000,score:788,biz:'Kamau Hardware',bizType:'Retailer',location:'Thika',distributor:'CentyDist Nairobi',id:'23456789',refName:'Jane Kamau',refPhone:'0700 222 333',refRel:'Spouse',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN','BANK_STMT']},
  {ref:'BWR-0003',name:'Faith Njeri',phone:'0734 567 890',ke:'KE-0112',limit:30000,score:698,biz:'Njeri Agrovet',bizType:'Agrovet',location:'Nakuru',distributor:'CentyDist Nakuru',id:'34567890',refName:'Paul Njeri',refPhone:'0700 333 444',refRel:'Brother',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT']},
  {ref:'BWR-0004',name:'James Omondi',phone:'0745 678 901',ke:'KE-0056',limit:20000,score:715,biz:'Omondi Mobile Shop',bizType:'Retailer',location:'Kisumu',distributor:'CentyDist Kisumu',id:'45678901',refName:'Ester Omondi',refPhone:'0700 444 555',refRel:'Spouse',status:'Inactive',kycUploaded:['NAT_ID','PHOTO']},
  {ref:'BWR-0005',name:'Mary Adhiambo',phone:'0756 789 012',ke:'KE-0078',limit:40000,score:731,biz:'Mama Mary Salon',bizType:'Salon',location:'Kisumu',distributor:'CentyDist Kisumu',id:'56789012',refName:'Tom Adhiambo',refPhone:'0700 555 666',refRel:'Husband',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN']},
  {ref:'BWR-0006',name:'Samuel Kiprono',phone:'0767 890 123',ke:'KE-0034',limit:25000,score:688,biz:'Kip Fresh Produce',bizType:'Kiosk',location:'Eldoret',distributor:'CentyDist Eldoret',id:'67890123',refName:'Rose Kiprono',refPhone:'0700 666 777',refRel:'Spouse',status:'Blacklisted',kycUploaded:['NAT_ID','PHOTO']},
  {ref:'BWR-0007',name:'Agnes Mutua',phone:'0778 901 234',ke:'KE-0091',limit:75000,score:769,biz:'Mutua Boutique',bizType:'Retailer',location:'Machakos',distributor:'CentyDist Nairobi',id:'78901234',refName:'Ben Mutua',refPhone:'0700 777 888',refRel:'Husband',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN']},
  {ref:'BWR-0008',name:'David Mwangi',phone:'0789 012 345',ke:'KE-0063',limit:15000,score:703,biz:'Mwangi Butchery',bizType:'Retailer',location:'Nairobi CBD',distributor:'CentyDist Nairobi',id:'89012345',refName:'Ann Mwangi',refPhone:'0700 888 999',refRel:'Spouse',status:'Awaiting',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT']},
  {ref:'BWR-0009',name:'Lucy Atieno',phone:'0790 123 456',ke:'KE-0023',limit:12000,score:711,biz:'Lucy Cereals',bizType:'Kiosk',location:'Siaya',distributor:'CentyDist Kisumu',id:'90123456',refName:'Mark Atieno',refPhone:'0700 999 000',refRel:'Husband',status:'Inactive',kycUploaded:['NAT_ID','PHOTO']},
  {ref:'BWR-0010',name:'Charles Ndirangu',phone:'0711 234 567',ke:'KE-0067',limit:60000,score:744,biz:'Ndirangu Electronics',bizType:'Retailer',location:'Nyeri',distributor:'CentyDist Nakuru',id:'01234567',refName:'Helen Ndirangu',refPhone:'0701 100 200',refRel:'Spouse',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN']},
  {ref:'BWR-0011',name:'Esther Muthoni',phone:'0722 345 678',ke:'KE-0103',limit:120000,score:791,biz:'Muthoni Pharmacy',bizType:'Retailer',location:'Karatina',distributor:'CentyDist Nakuru',id:'12340987',refName:'Fred Muthoni',refPhone:'0701 200 300',refRel:'Husband',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN','BANK_STMT']},
  {ref:'BWR-0012',name:'Isaac Waweru',phone:'0755 678 901',ke:'KE-0082',limit:55000,score:758,biz:'Waweru Auto Parts',bizType:'Retailer',location:'Thika',distributor:'CentyDist Nairobi',id:'23451098',refName:'Purity Waweru',refPhone:'0701 300 400',refRel:'Spouse',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN']},
  {ref:'BWR-0013',name:'Edwin Upeo',phone:'0700 123 456',ke:'KE-UPEO1',limit:60000,score:742,biz:'Upeo Retail',bizType:'Retailer',location:'Nairobi',distributor:'Upeo Distribution',id:'12345678',refName:'Jane Upeo',refPhone:'0700 654 321',refRel:'Spouse',status:'Active',kycUploaded:['NAT_ID','PHOTO','BIZ_PERMIT','KRA_PIN'],tenantId:'upeo-co-ke'},
];

const AUTH_USERS = [
  { email: 'admin@centycapital.com', password: 'demo1234', role: 'admin', tenantId: 'centycapital-ke', accountType: 'staff' },
  { email: 'manager@centycapital.com', password: 'demo1234', role: 'credit_manager', tenantId: 'centycapital-ke', accountType: 'staff' },
  { email: 'officer@centycapital.com', password: 'demo1234', role: 'credit_officer', tenantId: 'centycapital-ke', accountType: 'staff' },
  { email: 'grace@client.centycapital.com', password: 'demo1234', role: 'client', tenantId: 'centycapital-ke', accountType: 'client', borrowerNationalId: '12345679' },
  { email: 'faith@client.centycapital.com', password: 'demo1234', role: 'client', tenantId: 'centycapital-ke', accountType: 'client', borrowerNationalId: '34567890' },
  { email: 'edwin@upeo.co.ke', password: 'demo1234', role: 'client', tenantId: 'upeo-co-ke', accountType: 'client', borrowerNationalId: '12345678' },
];

let MPESA = [
  {phone:'0712 345 678',amount:31500,code:'RA4X9KL2MT',account:'CNTLOAN001',loanRef:'CNTLOAN001',mode:'Paybill',created:'13 Mar 2026 09:04',completed:true},
  {phone:'0756 789 012',amount:13125,code:'SB7Y2WK5NR',account:'CNTLOAN005',loanRef:'CNTLOAN005',mode:'USSD',created:'13 Mar 2026 08:22',completed:true},
  {phone:'0723 456 789',amount:26125,code:'TC9Z4VM8PQ',account:'CNTLOAN002',loanRef:'CNTLOAN002',mode:'Paybill',created:'12 Mar 2026 16:45',completed:true},
  {phone:'0778 901 234',amount:52000,code:'UD1A3XN6RS',account:'CNTLOAN007',loanRef:'CNTLOAN007',mode:'Paybill',created:'12 Mar 2026 11:30',completed:true},
  {phone:'0734 567 890',amount:21100,code:'VE2B4YO7TU',account:'CNTLOAN003',loanRef:'CNTLOAN003',mode:'USSD',created:'11 Mar 2026 14:10',completed:false},
  {phone:'0767 890 123',amount:9900,code:'WF3C5ZP8UV',account:'CNTLOAN006',loanRef:'CNTLOAN006',mode:'Paybill',created:'10 Mar 2026 09:55',completed:true},
  {phone:'0711 234 567',amount:36575,code:'XG4D6AQ9VW',account:'CNTLOAN009',loanRef:'CNTLOAN009',mode:'Paybill',created:'09 Mar 2026 12:00',completed:true},
  {phone:'0745 678 901',amount:12720,code:'YH5E7BR0WX',account:'CNTLOAN004',loanRef:'CNTLOAN004',mode:'USSD',created:'28 Feb 2026 18:20',completed:true},
];

let PRODUCTS = [
  {name:'CentyMicro 14',ref:'PROD-001',partner:'Centum MFI',limit:15000,rate:'6%',charge:'150',status:'Active'},
  {name:'CentyFlex 30',ref:'PROD-002',partner:'Centum MFI',limit:50000,rate:'5%',charge:'200',status:'Active'},
  {name:'CentyGrowth 60',ref:'PROD-003',partner:'Faulu Kenya',limit:100000,rate:'4.5%',charge:'350',status:'Active'},
  {name:'CentyBoost 90',ref:'PROD-004',partner:'Letshego',limit:150000,rate:'4%',charge:'500',status:'Active'},
  {name:'CentyPro 120',ref:'PROD-005',partner:'Equity Bank',limit:300000,rate:'3.5%',charge:'750',status:'Active'},
  {name:'CentySoko 21',ref:'PROD-006',partner:'Centum MFI',limit:30000,rate:'5.5%',charge:'180',status:'Active'},
  {name:'CentyAgri 45',ref:'PROD-007',partner:'Faulu Kenya',limit:80000,rate:'4%',charge:'280',status:'Active'},
  {name:'CentySME 180',ref:'PROD-008',partner:'NCBA Bank',limit:500000,rate:'3%',charge:'1200',status:'Active'},
  {name:'CentyWoman 30',ref:'PROD-009',partner:'Letshego',limit:60000,rate:'4.5%',charge:'220',status:'Active'},
  {name:'CentyYouth 14',ref:'PROD-010',partner:'Centum MFI',limit:10000,rate:'6.5%',charge:'100',status:'Draft'},
  {name:'CentyLogistics 60',ref:'PROD-011',partner:'NCBA Bank',limit:200000,rate:'4%',charge:'600',status:'Active'},
  {name:'CentyStock 30',ref:'PROD-012',partner:'Faulu Kenya',limit:75000,rate:'4.8%',charge:'300',status:'Active'},
];

let KYC_DOCS = [
  {type:'National ID / Passport',code:'NAT_ID',required:true,desc:'Government-issued photo identification'},
  {type:'Passport Photo',code:'PHOTO',required:true,desc:'Recent clear passport-sized photo'},
  {type:'Business Permit',code:'BIZ_PERMIT',required:true,desc:'County business operating permit'},
  {type:'Liquor Licence',code:'LIQUOR_LIC',required:false,desc:'Required for alcohol retailers only'},
  {type:'KRA PIN Certificate',code:'KRA_PIN',required:true,desc:'KRA tax registration certificate'},
  {type:'Bank Statement',code:'BANK_STMT',required:false,desc:'Last 3 months bank statements'},
];

let SMS_TEMPLATES = [
  {name:'Payment Reminder — D-5',category:'Debt Collection',body:'Hi {name}, your loan of KES {amount} is due in 5 days on {due_date}. Pay via M-Pesa Paybill 891234, Acc: {loan_ref}.',status:'Active'},
  {name:'Overdue Day 3',category:'Debt Collection',body:'URGENT: Dear {name}, your CentyCapital loan (KES {amount}) is 3 days overdue. Avoid penalties — pay today via M-Pesa Paybill 891234.',status:'Active'},
  {name:'Overdue Day 7',category:'Debt Collection',body:'Dear {name}, your account {loan_ref} is 7 days overdue. Immediate payment of KES {amount} is required to avoid credit bureau listing.',status:'Active'},
  {name:'Disbursement Confirmed',category:'Disbursement',body:'Hi {name}! KES {amount} has been credited to your M-Pesa. Repay by {due_date} via Paybill 891234, Acc: {loan_ref}. Good luck!',status:'Active'},
  {name:'Application Received',category:'Engagement',body:'Hi {name}, we have received your loan application (Ref: {loan_ref}). You will hear from us within 24 hours. CentyCapital.',status:'Active'},
  {name:'Application Approved',category:'Engagement',body:'Congratulations {name}! Your loan application has been approved. Funds will be disbursed within 2 hours. CentyCapital.',status:'Active'},
  {name:'Application Rejected',category:'Engagement',body:'Dear {name}, unfortunately your loan application could not be approved at this time. Contact us for details. CentyCapital.',status:'Active'},
  {name:'Welcome Onboard',category:'Engagement',body:'Welcome to CentyCapital, {name}! Your borrower account is now active. Our team is here to support your business growth.',status:'Active'},
  {name:'Repayment Received',category:'Engagement',body:'Thank you {name}! We have received your payment of KES {amount} for loan {loan_ref}. Your account is now up to date.',status:'Active'},
  {name:'PTP Follow-up',category:'Debt Collection',body:'Hi {name}, this is a reminder of your promise to pay KES {amount} today. Please complete payment via Paybill 891234.',status:'Active'},
  {name:'Loan Cleared',category:'Engagement',body:'Excellent! Dear {name}, loan {loan_ref} has been fully repaid. You are eligible for a new loan. Contact us today!',status:'Active'},
  {name:'Credit Limit Increase',category:'Engagement',body:'Good news {name}! Based on your repayment history, your CentyCapital credit limit has been increased. Contact us for details.',status:'Draft'},
];

let SMS_SCHEDULED = [
  {recipient:'All Overdue Borrowers',template:'Overdue Day 3',scheduled:'13 Mar 2026 10:00',status:'Queued'},
  {recipient:'0734 567 890 (Faith Njeri)',template:'PTP Follow-up',scheduled:'14 Mar 2026 09:00',status:'Queued'},
  {recipient:'All Active Borrowers',template:'Payment Reminder — D-5',scheduled:'26 Mar 2026 08:00',status:'Queued'},
];

let SMS_SENT = [
  {recipient:'0712 345 678',message:'Hi Grace! KES 30,000 has been credited to your M-Pesa…',sent:'13 Mar 2026 09:01',status:'Delivered'},
  {recipient:'All 12 Borrowers',message:'Welcome to CentyCapital! Your borrower account…',sent:'01 Mar 2026 08:00',status:'Delivered'},
  {recipient:'0767 890 123',message:'URGENT: Dear Samuel, your CentyCapital loan (KES 18,000)…',sent:'08 Mar 2026 09:00',status:'Delivered'},
  {recipient:'0734 567 890',message:'URGENT: Dear Faith, your CentyCapital loan (KES 20,000)…',sent:'13 Mar 2026 08:00',status:'Delivered'},
];

let DMS_HISTORY = [
  {date:'10 Mar 2026 08:14',file:'DMS_Export_March_Week2.xlsx',records:247,matched:241,flagged:6,status:'Success',by:'Edwin M'},
  {date:'03 Mar 2026 07:55',file:'DMS_Export_March_Week1.xlsx',records:189,matched:187,flagged:2,status:'Success',by:'Edwin M'},
  {date:'25 Feb 2026 08:30',file:'DMS_Export_Feb_Week4.xlsx',records:214,matched:209,flagged:5,status:'Success',by:'Edwin M'},
  {date:'18 Feb 2026 09:10',file:'DMS_Export_Feb_Week3.xlsx',records:176,matched:171,flagged:5,status:'Warning',by:'System'},
];

// Per-loan supplementary data
const LOAN_COMMENTS = {
  'CNTLOAN001':[
    {author:'Edwin M',time:'12 Mar 2026 10:44',text:'Called borrower — confirms repayment by Friday.'},
    {author:'System',time:'10 Mar 2026 08:00',text:'Auto-reminder sent via SMS.'},
  ],
  'CNTLOAN003':[
    {author:'Edwin M',time:'13 Mar 2026 09:00',text:'Borrower not picking up calls. Will try again tomorrow.'},
    {author:'System',time:'13 Mar 2026 08:00',text:'Overdue Day 3 SMS sent automatically.'},
  ],
  'CNTLOAN006':[
    {author:'Edwin M',time:'12 Mar 2026 14:32',text:'Borrower promised to pay this Friday.'},
    {author:'System',time:'10 Mar 2026 08:00',text:'Reminder SMS sent — payment due in 5 days.'},
  ],
};

const LOAN_PTPS = {
  'CNTLOAN003':[{date:'20 Mar 2026',amount:15000,status:'Pending',notes:'Will pay after salary'}],
  'CNTLOAN006':[
    {date:'15 Mar 2026',amount:10000,status:'Broken',notes:'Did not pay as promised'},
    {date:'25 Mar 2026',amount:19800,status:'Pending',notes:'Next salary date'},
  ],
};

let NOTIFICATIONS = [
  {icon:'✅',text:'Grace Wanjiku repaid KES 31,500 — CNTLOAN001 closed',time:'Today 09:04',read:false},
  {icon:'📋',text:'Esther Muthoni — KES 100K application submitted (CentyPro 120)',time:'Today 08:45',read:false},
  {icon:'🔴',text:'Faith Njeri — CNTLOAN003 is 3 days overdue. KES 21,100 at risk',time:'Yesterday 08:00',read:false},
  {icon:'💳',text:'Agnes Mutua — CNTLOAN007 disbursed KES 50,000 via M-Pesa B2C',time:'01 Mar 2026 09:00',read:true},
  {icon:'👥',text:'Isaac Waweru registered as new borrower BWR-0012',time:'28 Feb 2026 11:20',read:true},
  {icon:'⚠️',text:'Samuel Kiprono — CNTLOAN006 is 36 days overdue. Escalate.',time:'07 Mar 2026 09:00',read:true},
];

// ─── STATE ─────────────────────────────────────────────────────────────────────

let currentLeadsTab = 'Pending';
let currentAppsTab  = 'All';
let currentLoansTab = 'Active';
let currentBwrTab   = 'Active';
let leadsQuery='', appsQuery='', loansQuery='', bwrQuery='', mpesaQuery='', profQuery='';
let smsTab = 'templates';
let dmsStep = 1;
let notifOpen = false;
let _confirmCallback = null;
let _currentLoanRef = null;

const PAGE_SIZE = 20;
const pages = {leads:1,apps:1,loans:1,borrowers:1,mpesa:1,profiles:1};

// ─── VIEWS ─────────────────────────────────────────────────────────────────────

const VIEWS = ['dashboard','profile','leads','applications','loans','borrowers','mpesa','products','kyc','profiles','sms','dms','settings','reports'];
const TITLES = {
  dashboard:'The numbers that run your lending business.',
  profile:'Your borrower profile and KYC status.',
  leads:'Every lead, tracked from first contact.',
  applications:'Review fast. Decide right.',
  loans:'Your full advance book, live.',
  borrowers:'Know every borrower. Trust the data.',
  mpesa:'Every shilling must come back.',
  products:'Products that power your lending.',
  kyc:'Documents that de-risk every loan.',
  profiles:'The full picture on every borrower.',
  sms:'The right message, at the right time.',
  dms:'Fresh data drives better lending decisions.',
  settings:'Configure your LMS environment.',
  reports:'Portfolio and collections intelligence.',
};

const ROLE_VIEW_PERMISSIONS = {
  admin: new Set(['dashboard','profile','leads','applications','loans','borrowers','mpesa','products','kyc','profiles','sms','dms','settings','reports']),
  credit_manager: new Set(['dashboard','profile','leads','applications','loans','borrowers','mpesa','reports','profiles','settings']),
  credit_officer: new Set(['dashboard','profile','leads','applications','loans','borrowers','mpesa','settings']),
  client: new Set(['profile','mpesa','settings']),
};

function getSession() {
  try { return JSON.parse(localStorage.getItem('cc_session') || 'null'); }
  catch (e) { return null; }
}

function getRole(sess = getSession()) {
  if (!sess) return 'guest';
  return sess.role || 'admin';
}

function getTenantId(sess = getSession()) {
  return sess?.tenantId || null;
}

function getDefaultViewForRole(sess = getSession()) {
  if (!sess) return 'dashboard';
  if (sess.accountType === 'client') return 'profile';
  return 'dashboard';
}

function canAccessView(view, sess = getSession()) {
  if (!sess) return true;
  const role = getRole(sess);
  if (role === 'guest') return true;
  const allowed = ROLE_VIEW_PERMISSIONS[role] || ROLE_VIEW_PERMISSIONS.admin;
  return allowed.has(view);
}

function scopeByTenant(items, sess = getSession()) {
  const tid = getTenantId(sess);
  if (!tid) return items;
  return items.filter(x => x.tenantId === tid);
}

function enforceTenantMigration() {
  const T = 'centycapital-ke';
  BORROWERS.forEach(b => {
    if (!b.tenantId) b.tenantId = (b.ref === 'BWR-0013') ? 'upeo-co-ke' : T;
  });
  const borrowerByName = new Map(BORROWERS.map(b => [b.name.toLowerCase(), b]));
  const tidForBorrower = (name) => {
    const b = borrowerByName.get((name || '').toLowerCase());
    return b?.tenantId || T;
  };
  LEADS.forEach(l => { if (!l.tenantId) l.tenantId = T; });
  APPS.forEach(a => { if (!a.tenantId) a.tenantId = tidForBorrower(a.borrower); });
  LOANS.forEach(l => { if (!l.tenantId) l.tenantId = tidForBorrower(l.borrower); });
  MPESA.forEach(m => {
    if (!m.tenantId) {
      const loan = LOANS.find(x => x.ref === (m.loanRef || m.account));
      m.tenantId = loan?.tenantId || T;
    }
  });
  PRODUCTS.forEach(p => { if (!p.tenantId) p.tenantId = T; });
  KYC_DOCS.forEach(k => { if (!k.tenantId) k.tenantId = T; });
  saveData();
}

function applyAuthUi() {
  const sess = getSession();
  const sidebar = document.getElementById('sidebar');
  const role = getRole(sess);
  const isClient = sess?.accountType === 'client';
  const allowed = ROLE_VIEW_PERMISSIONS[role] || ROLE_VIEW_PERMISSIONS.admin;

  const profNav = document.getElementById('nav-item-profile');
  const dashNav = document.getElementById('nav-item-dashboard');
  if (profNav && dashNav) {
    profNav.style.display = isClient ? '' : 'none';
    dashNav.style.display = isClient ? 'none' : '';
  }

  if (sidebar) {
    sidebar.querySelectorAll('.nav-item').forEach(el => {
      const oc = el.getAttribute('onclick') || '';
      const m = oc.match(/showView\('([^']+)'\)/);
      if (m) {
        el.style.display = allowed.has(m[1]) ? '' : 'none';
        return;
      }
      if (oc.includes('centycred.html')) {
        if (isClient) el.style.display = 'none';
        else if (oc.includes('cc-settings')) el.style.display = (role === 'admin') ? '' : 'none';
        else el.style.display = '';
      }
    });
    sidebar.querySelectorAll('.nav-label').forEach(lbl => {
      const sec = lbl.parentElement;
      if (!sec || !sec.classList.contains('nav-section')) return;
      const hasVisible = [...sec.querySelectorAll('.nav-item')].some(i => i.style.display !== 'none');
      lbl.style.display = hasVisible ? '' : 'none';
    });
  }

  const gsearch = document.getElementById('gsearch-wrap');
  if (gsearch) gsearch.style.display = isClient ? 'none' : '';
  const notif = document.getElementById('topbar-notif-wrap');
  if (notif) notif.style.display = isClient ? 'none' : '';
}

function renderProfile() {
  const sess = getSession();
  const borrowers = scopeByTenant(BORROWERS, sess);
  const nat = String(sess?.borrowerNationalId || '').replace(/\s+/g, '');
  const b = borrowers.find(x => String(x.id || '').replace(/\s+/g, '') === nat);
  const nameEl = document.getElementById('prof-name');
  const refEl = document.getElementById('prof-ref');
  const pctEl = document.getElementById('prof-kyc-pct');
  const listEl = document.getElementById('prof-kyc-list');
  if (!nameEl || !refEl || !listEl) return;
  if (!b) {
    nameEl.textContent = 'Profile not linked';
    refEl.textContent = 'Contact support to link your National ID to this login.';
    if (pctEl) pctEl.textContent = '—';
    listEl.innerHTML = '<div class="empty-state" style="padding:16px;"><div class="empty-state-text">No borrower profile found for this account.</div></div>';
    return;
  }
  nameEl.textContent = b.name;
  refEl.textContent = `${b.ref} · ${sess?.tenantId || '—'} · ID ${b.id}`;
  const docs = scopeByTenant(KYC_DOCS, sess);
  const uploaded = b.kycUploaded || [];
  const req = docs.filter(d => d.required);
  const done = req.filter(d => uploaded.includes(d.code)).length;
  if (pctEl) pctEl.textContent = req.length ? `${Math.round((done / req.length) * 100)}%` : '—';
  listEl.innerHTML = docs.length ? docs.map(d => {
    const ok = uploaded.includes(d.code);
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border);">
      <div><div style="font-weight:600;">${d.type}</div><div style="font-size:var(--t-small);color:var(--text3);">${d.code} · ${d.required ? 'Required' : 'Optional'}</div></div>
      <div>${ok ? '<span class="badge green">Submitted</span>' : '<span class="badge amber">Pending</span>'}</div>
    </div>`;
  }).join('') : '<div class="empty-state" style="padding:16px;"><div class="empty-state-text">No KYC types for this tenant.</div></div>';
}

function showView(v) {
  if (v === 'profiles') v = 'borrowers';
  const sess = getSession();
  if (sess && !canAccessView(v, sess)) v = getDefaultViewForRole(sess);
  closeSidebar();
  VIEWS.forEach(id => {
    const el = document.getElementById('view-'+id);
    if (el) el.style.display = (id === v) ? '' : 'none';
  });
  document.getElementById('topbar-title').textContent = TITLES[v] || '';
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('onclick') && el.getAttribute('onclick').includes("'"+v+"'")) el.classList.add('active');
  });
  history.replaceState(null,'','#'+v);
  if (v==='profile')      renderProfile();
  if (v==='dashboard')    renderDashboard();
  if (v==='leads')        renderLeads();
  if (v==='applications') { _selectedApps.clear(); renderApps(); }
  if (v==='loans')        renderLoans();
  if (v==='borrowers')    renderBorrowers();
  if (v==='mpesa')        renderMpesa();
  if (v==='products')     renderProducts();
  if (v==='kyc')          renderKyc();
  if (v==='profiles')     renderProfiles();
  if (v==='sms')          renderSms();
  if (v==='dms')          renderDms();
  if (v==='reports')      renderReports();
}

function updateNavBadges() {
  const sess = getSession();
  const L = scopeByTenant(LEADS, sess);
  const A = scopeByTenant(APPS, sess);
  const LO = scopeByTenant(LOANS, sess);
  const e1 = document.getElementById('nb-leads'); if (e1) e1.textContent = L.filter(l=>l.status==='Pending').length;
  const e2 = document.getElementById('nb-apps');  if (e2) e2.textContent = A.filter(a=>a.status==='Pending').length;
  const e3 = document.getElementById('nb-loans'); if (e3) e3.textContent = LO.length;
  saveData();
}

// ─── UTILITIES ─────────────────────────────────────────────────────────────────

function fmt(n) { return Number(n).toLocaleString(); }

function scoreColor(s) { return s>=750?'var(--green)':s>=700?'var(--blue)':s>=650?'var(--amber)':'var(--rose)'; }

function statusBadge(s) {
  const map={
    'Active':'green','Approved':'green','Completed':'teal','Repaid':'teal','Delivered':'green','Success':'green','Disbursed':'teal',
    'Pending':'amber','Awaiting':'amber','Due':'amber','Queued':'amber','Draft':'amber','Warning':'amber',
    'Overdue':'rose','Rejected':'rose','Blacklisted':'rose','Broken':'rose',
    'Inactive':'gray','Frozen':'blue','Written Off':'gray','Withdrawn':'gray',
  };
  return `<span class="badge ${map[s]||'gray'}">${s}</span>`;
}

function scoreBar(score) {
  const pct = Math.min(100, Math.round((score-600)/300*100));
  return `<div class="score-bar"><div class="score-track"><div class="score-fill" style="width:${pct}%;background:${scoreColor(score)}"></div></div><span class="score-num" style="color:${scoreColor(score)}">${score}</span></div>`;
}

function truncate(str, n=55) { return str.length>n ? str.slice(0,n)+'…' : str; }

function fmtDate(d) { return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); }

function buildDonutChart(segments, total) {
  const cx=60,cy=60,r=46,sw=16, C=2*Math.PI*r;
  let offset=0;
  let circles=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--surface3)" stroke-width="${sw}"/>`;
  segments.forEach(seg => {
    const dash=(seg.count/total)*C;
    circles+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${seg.color}" stroke-width="${sw}" stroke-dasharray="${dash.toFixed(1)} ${(C-dash).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset+=dash;
  });
  circles+=`<text x="${cx}" y="${cy-3}" text-anchor="middle" font-family="Fraunces,serif" font-size="15" fill="var(--text)">${total}</text>`;
  circles+=`<text x="${cx}" y="${cy+9}" text-anchor="middle" font-family="DM Sans,sans-serif" font-size="8" fill="var(--text4)">loans</text>`;
  const legend=segments.map(seg=>{
    const pct=Math.round(seg.count/total*100);
    return `<div class="donut-leg-item"><div class="donut-leg-dot" style="background:${seg.color}"></div><span class="donut-leg-label">${seg.label}</span><span class="donut-leg-val">${seg.count}</span><span class="donut-leg-pct">${pct}%</span></div>`;
  }).join('');
  return `<div class="donut-wrap"><svg class="donut-svg" width="120" height="120" viewBox="0 0 120 120">${circles}</svg><div class="donut-legend">${legend}</div></div>`;
}

function buildGaugeChart(borrowers) {
  const tiers=[
    {label:'Excellent 750+',color:'var(--green)',count:borrowers.filter(b=>b.score>=750).length},
    {label:'Good 700–749',color:'var(--blue)',count:borrowers.filter(b=>b.score>=700&&b.score<750).length},
    {label:'Fair 650–699',color:'var(--amber)',count:borrowers.filter(b=>b.score>=650&&b.score<700).length},
    {label:'Below 650',color:'var(--rose)',count:borrowers.filter(b=>b.score<650).length},
  ].filter(t=>t.count>0);
  const total=borrowers.length, avg=total?Math.round(borrowers.reduce((s,b)=>s+b.score,0)/total):0;
  const cx=70,cy=70,r=54,sw=14,C=2*Math.PI*r;
  let offset=0;
  let circles=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--surface3)" stroke-width="${sw}"/>`;
  tiers.forEach(t=>{
    const dash=(t.count/total)*C;
    circles+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${t.color}" stroke-width="${sw}" stroke-dasharray="${dash.toFixed(1)} ${(C-dash).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`;
    offset+=dash;
  });
  const legend=tiers.map(t=>`<div class="donut-leg-item"><div class="donut-leg-dot" style="background:${t.color}"></div><span class="donut-leg-label">${t.label}</span><span class="donut-leg-val">${t.count}</span><span class="donut-leg-pct">${Math.round(t.count/total*100)}%</span></div>`).join('');
  return `<div style="display:flex;justify-content:center;margin-bottom:14px;"><div class="gauge-wrap"><svg width="140" height="140" viewBox="0 0 140 140">${circles}</svg><div class="gauge-center"><div class="gauge-center-val">${avg}</div><div class="gauge-center-lbl">Avg Score</div></div></div></div><div class="donut-legend">${legend}</div>`;
}

// ─── PAGINATION ─────────────────────────────────────────────────────────────────

function paginate(arr,page){ return arr.slice((page-1)*PAGE_SIZE, page*PAGE_SIZE); }

function renderPagination(containerId, total, page, setFn) {
  const el=document.getElementById(containerId); if(!el) return;
  const totalPages=Math.ceil(total/PAGE_SIZE);
  if(totalPages<=1){ el.innerHTML=''; return; }
  const start=(page-1)*PAGE_SIZE+1, end=Math.min(page*PAGE_SIZE,total);
  el.innerHTML=`<div class="pagination"><button class="btn btn-ghost btn-xs" ${page<=1?'disabled':''} onclick="${setFn}(${page-1})">← Prev</button><span class="pg-info">${start}–${end} of ${total}</span><button class="btn btn-ghost btn-xs" ${page>=totalPages?'disabled':''} onclick="${setFn}(${page+1})">Next →</button></div>`;
}

function setPageLeads(p){pages.leads=p;renderLeads();}
function setPageApps(p){pages.apps=p;renderApps();}
function setPageLoans(p){pages.loans=p;renderLoans();}
function setPageBorrowers(p){pages.borrowers=p;renderBorrowers();}
function setPageMpesa(p){pages.mpesa=p;renderMpesa();}
function setPageProfiles(p){pages.profiles=p;renderProfiles();}

// ─── RENDER: LEADS ─────────────────────────────────────────────────────────────

function renderLeads() {
  const leads = scopeByTenant(LEADS);
  ['All','Pending','Approved','Completed','Rejected'].forEach(t=>{
    const el=document.getElementById('tc-leads-'+t); if(el) el.textContent=t==='All'?leads.length:leads.filter(l=>l.status===t).length;
  });
  document.getElementById('kpi-leads-total').textContent=leads.length;
  document.getElementById('kpi-leads-pending').textContent=leads.filter(l=>l.status==='Pending').length;
  document.getElementById('kpi-leads-approved').textContent=leads.filter(l=>l.status==='Approved').length;
  document.getElementById('kpi-leads-rejected').textContent=leads.filter(l=>l.status==='Rejected').length;
  const base=leads.filter(l=>(currentLeadsTab==='All'||l.status===currentLeadsTab)&&(!leadsQuery||l.name.toLowerCase().includes(leadsQuery)||l.biz.toLowerCase().includes(leadsQuery)||l.location.toLowerCase().includes(leadsQuery)));
  const paged=paginate(base,pages.leads);
  document.getElementById('leads-tbody').innerHTML=paged.length?paged.map(l=>`<tr>
    <td class="name">${l.name}</td><td class="mono">${l.phone}</td><td>${l.biz}</td><td>${l.location}</td><td>${l.distributor}</td>
    <td><span style="font-size:9px;color:var(--text3)">${l.source}</span></td><td>${statusBadge(l.status)}</td>
    <td><button class="btn btn-ghost btn-xs" onclick="convertLead(${l.id})">Convert</button></td>
  </tr>`).join(''):'<tr class="empty-row"><td colspan="8"><div class="empty-state"><div class="empty-state-icon">🎯</div><div class="empty-state-text">No leads in this category</div><button class="btn btn-primary btn-sm" onclick="openModal(\'modal-add-lead\')">+ Add First Lead</button></div></td></tr>';
  renderPagination('leads-pagination',base.length,pages.leads,'setPageLeads');
  animateCounters('leads');
}

function setLeadsTab(t,el){currentLeadsTab=t;pages.leads=1;document.querySelectorAll('#leads-tabs .tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');renderLeads();}
function filterLeads(q){leadsQuery=q.toLowerCase();pages.leads=1;renderLeads();}

// ─── RENDER: APPLICATIONS ──────────────────────────────────────────────────────

function renderApps() {
  const apps = scopeByTenant(APPS);
  ['All','Pending','Approved','Rejected','Disbursed'].forEach(t=>{
    const el=document.getElementById('tc-apps-'+t); if(el) el.textContent=t==='All'?apps.length:apps.filter(a=>a.status===t).length;
  });
  const pending=apps.filter(a=>a.status==='Pending');
  const avg=apps.length?Math.round(apps.reduce((s,a)=>s+a.amount,0)/apps.length):0;
  const rate=apps.length?Math.round(apps.filter(a=>['Approved','Disbursed'].includes(a.status)).length/apps.length*100):0;
  document.getElementById('kpi-apps-total').textContent=apps.length;
  document.getElementById('kpi-apps-pending').textContent=pending.length;
  document.getElementById('kpi-apps-avg').textContent='KES '+fmt(avg);
  document.getElementById('kpi-apps-rate').textContent=rate+'%';
  const base=apps.filter(a=>(currentAppsTab==='All'||a.status===currentAppsTab)&&(!appsQuery||a.ref.toLowerCase().includes(appsQuery)||a.borrower.toLowerCase().includes(appsQuery)));
  const paged=paginate(base,pages.apps);
  document.getElementById('apps-tbody').innerHTML=paged.length?paged.map(a=>`<tr onclick="openAppDrawer('${a.ref}')">
    <td onclick="event.stopPropagation()" style="width:32px;padding:0 8px;"><input type="checkbox" class="row-chk app-row-chk" data-ref="${a.ref}" ${_selectedApps.has(a.ref)?'checked':''} onclick="toggleAppRow(this)"></td>
    <td class="mono">${a.ref}</td><td class="name">${a.borrower}</td><td class="mono">${fmt(a.amount)}</td><td class="mono">${a.rate}</td><td>${a.product}</td><td>${a.partner}</td><td>${statusBadge(a.status)}</td><td class="mono" style="font-size:var(--t-small)">${a.applied}</td>
    <td onclick="event.stopPropagation()">${a.status==='Pending'?`<div style="display:flex;gap:4px"><button class="btn btn-primary btn-xs" onclick="approveApp('${a.ref}')">Approve</button><button class="btn btn-danger btn-xs" onclick="declineApp('${a.ref}')">Decline</button></div>`:statusBadge(a.status)}</td>
  </tr>`).join(''):'<tr class="empty-row"><td colspan="10"><div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-text">No applications here</div><button class="btn btn-primary btn-sm" onclick="openModal(\'modal-new-loan\')">+ New Application</button></div></td></tr>';
  renderPagination('apps-pagination',base.length,pages.apps,'setPageApps');
  animateCounters('applications');
}

function setAppsTab(t,el){currentAppsTab=t;pages.apps=1;document.querySelectorAll('#apps-tabs .tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');renderApps();}
function filterApps(q){appsQuery=q.toLowerCase();pages.apps=1;renderApps();}

// ─── RENDER: LOANS ─────────────────────────────────────────────────────────────

function renderLoans() {
  const loans = scopeByTenant(LOANS);
  ['All','Active','Due','Overdue','Repaid','Withdrawn','Frozen','Written_Off'].forEach(t=>{
    const el=document.getElementById('tc-loans-'+t);
    if(el) el.textContent=t==='All'?loans.length:loans.filter(l=>l.status===t.replace('_',' ')).length;
  });
  document.getElementById('kpi-loans-active').textContent=loans.filter(l=>l.status==='Active').length;
  document.getElementById('kpi-loans-overdue').textContent=loans.filter(l=>l.status==='Overdue').length;
  document.getElementById('kpi-loans-book').textContent='KES '+fmt(loans.filter(l=>['Active','Due','Overdue'].includes(l.status)).reduce((s,l)=>s+l.amount,0));
  document.getElementById('kpi-loans-repaid').textContent=loans.filter(l=>l.status==='Repaid').length;
  const base=loans.filter(l=>(currentLoansTab==='All'||l.status===currentLoansTab)&&(!loansQuery||l.ref.toLowerCase().includes(loansQuery)||l.borrower.toLowerCase().includes(loansQuery)||l.ke.toLowerCase().includes(loansQuery)));
  const paged=paginate(base,pages.loans);
  document.getElementById('loans-tbody').innerHTML=paged.length?paged.map(l=>`<tr onclick="openLoanDrawer('${l.ref}')">
    <td class="mono">${l.ref}</td>
    <td class="name link-cell" onclick="event.stopPropagation();openBorrowerByName('${l.borrower}')">${l.borrower}</td>
    <td class="mono">${l.ke}</td><td class="mono">${fmt(l.amount)}</td><td class="mono" style="font-size:var(--t-small)">${l.disbursed}</td><td class="mono">${fmt(l.repayment)}</td><td class="mono" style="font-size:var(--t-small)">${l.due}</td><td>${statusBadge(l.status)}</td>
    <td><button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();openLoanDrawer('${l.ref}')">View</button></td>
  </tr>`).join(''):'<tr class="empty-row"><td colspan="9"><div class="empty-state"><div class="empty-state-icon">💳</div><div class="empty-state-text">No loans in this category</div></div></td></tr>';
  renderPagination('loans-pagination',base.length,pages.loans,'setPageLoans');
  animateCounters('loans');
}

function setLoansTab(t,el){currentLoansTab=t;pages.loans=1;document.querySelectorAll('#view-loans .tabs .tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');renderLoans();}
function filterLoans(q){loansQuery=q.toLowerCase();pages.loans=1;renderLoans();}

// ─── RENDER: BORROWERS ─────────────────────────────────────────────────────────

function renderBorrowers() {
  const borrowers = scopeByTenant(BORROWERS);
  ['All','Active','Awaiting','Inactive','Blacklisted'].forEach(t=>{
    const el=document.getElementById('tc-bwr-'+t); if(el) el.textContent=t==='All'?borrowers.length:borrowers.filter(b=>b.status===t).length;
  });
  const avgScore=borrowers.length?Math.round(borrowers.reduce((s,b)=>s+b.score,0)/borrowers.length):0;
  document.getElementById('kpi-bwr-total').textContent=borrowers.length;
  document.getElementById('kpi-bwr-active').textContent=borrowers.filter(b=>b.status==='Active').length;
  document.getElementById('kpi-bwr-blacklisted').textContent=borrowers.filter(b=>b.status==='Blacklisted').length;
  document.getElementById('kpi-bwr-score').textContent=avgScore;
  const base=borrowers.filter(b=>(currentBwrTab==='All'||b.status===currentBwrTab)&&(!bwrQuery||b.name.toLowerCase().includes(bwrQuery)||b.ref.toLowerCase().includes(bwrQuery)||b.phone.includes(bwrQuery)));
  const paged=paginate(base,pages.borrowers);
  document.getElementById('borrowers-tbody').innerHTML=paged.length?paged.map(b=>`<tr onclick="openBorrowerDrawer('${b.ref}')">
    <td class="mono">${b.ref}</td><td class="name">${b.name}</td><td class="mono">${b.phone}</td><td class="mono">${b.ke}</td><td class="mono">${fmt(b.limit)}</td><td style="min-width:140px">${scoreBar(b.score)}</td><td>${statusBadge(b.status)}</td>
    <td><button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();openBorrowerDrawer('${b.ref}')">View</button></td>
  </tr>`).join(''):'<tr class="empty-row"><td colspan="8"><div class="empty-state"><div class="empty-state-icon">👥</div><div class="empty-state-text">No borrowers in this category</div><button class="btn btn-primary btn-sm" onclick="openModal(\'modal-add-borrower\')">+ Add Borrower</button></div></td></tr>';
  renderPagination('borrowers-pagination',base.length,pages.borrowers,'setPageBorrowers');
  animateCounters('borrowers');
}

function setBwrTab(t,el){currentBwrTab=t;pages.borrowers=1;document.querySelectorAll('#view-borrowers .tabs .tab').forEach(x=>x.classList.remove('active'));el.classList.add('active');renderBorrowers();}
function filterBorrowers(q){bwrQuery=q.toLowerCase();pages.borrowers=1;renderBorrowers();}

// ─── RENDER: MPESA ─────────────────────────────────────────────────────────────

function renderMpesa() {
  const mpesa = scopeByTenant(MPESA);
  const total=mpesa.reduce((s,m)=>s+m.amount,0), done=mpesa.filter(m=>m.completed).length;
  document.getElementById('kpi-mp-total').textContent='KES '+fmt(total);
  document.getElementById('kpi-mp-today').textContent='KES '+fmt(mpesa.slice(0,2).reduce((s,m)=>s+m.amount,0));
  document.getElementById('kpi-mp-done').textContent=done;
  document.getElementById('kpi-mp-pending').textContent=mpesa.length-done;
  const base=mpesa.filter(m=>!mpesaQuery||m.phone.includes(mpesaQuery)||m.code.toLowerCase().includes(mpesaQuery)||m.loanRef.toLowerCase().includes(mpesaQuery));
  const paged=paginate(base,pages.mpesa);
  document.getElementById('mpesa-tbody').innerHTML=paged.map(m=>`<tr>
    <td class="mono">${m.phone}</td><td class="mono">${fmt(m.amount)}</td><td class="mono" style="font-weight:500;letter-spacing:.5px">${m.code}</td><td class="mono">${m.account}</td>
    <td class="mono"><span class="link-cell" onclick="openLoanDrawer('${m.loanRef}')">${m.loanRef}</span></td>
    <td><span class="badge ${m.mode==='Paybill'?'blue':'purple'}">${m.mode}</span></td><td class="mono" style="font-size:var(--t-small)">${m.created}</td><td>${m.completed?'<span class="badge green">Yes</span>':'<span class="badge amber">Pending</span>'}</td>
  </tr>`).join('');
  renderPagination('mpesa-pagination',base.length,pages.mpesa,'setPageMpesa');
  animateCounters('mpesa');
}

function filterMpesa(q){mpesaQuery=q;pages.mpesa=1;renderMpesa();}

// ─── RENDER: PRODUCTS ──────────────────────────────────────────────────────────

function renderProducts() {
  const products = scopeByTenant(PRODUCTS);
  const active=products.filter(p=>p.status==='Active');
  const avgRate=active.length?(active.reduce((s,p)=>s+parseFloat(p.rate),0)/active.length).toFixed(1)+'%':'—';
  document.getElementById('kpi-prod-total').textContent=active.length;
  document.getElementById('kpi-prod-rate').textContent=avgRate;
  document.getElementById('kpi-prod-max').textContent=products.length ? 'KES '+fmt(Math.max(...products.map(p=>p.limit))) : '—';
  document.getElementById('kpi-prod-partners').textContent=[...new Set(products.map(p=>p.partner))].length;
  document.getElementById('products-tbody').innerHTML=products.map(p=>`<tr>
    <td class="name">${p.name}</td><td class="mono">${p.ref}</td><td>${p.partner}</td><td class="mono">${fmt(p.limit)}</td><td class="mono">${p.rate}/mo</td><td class="mono">KES ${p.charge}</td><td>${statusBadge(p.status)}</td>
    <td onclick="event.stopPropagation()"><div style="display:flex;gap:4px"><button class="btn btn-ghost btn-xs" onclick="toast('Edit product: ${p.name}','info')">Edit</button><button class="btn btn-danger btn-xs" onclick="confirmDeleteProduct('${p.ref}')">Delete</button></div></td>
  </tr>`).join('');
  animateCounters('products');
}

// ─── RENDER: KYC ───────────────────────────────────────────────────────────────

function renderKyc() {
  const kyc = scopeByTenant(KYC_DOCS);
  document.getElementById('kpi-kyc-total').textContent=kyc.length;
  document.getElementById('kpi-kyc-req').textContent=kyc.filter(k=>k.required).length;
  document.getElementById('kpi-kyc-opt').textContent=kyc.filter(k=>!k.required).length;
  animateCounters('kyc');
  document.getElementById('kyc-tbody').innerHTML=kyc.map(k=>`<tr>
    <td class="name">${k.type}</td><td class="mono">${k.code}</td><td>${k.required?'<span class="badge green">Yes</span>':'<span class="badge gray">No</span>'}</td>
    <td style="font-size:var(--t-small);color:var(--text3)">${k.desc}</td>
    <td onclick="event.stopPropagation()"><div style="display:flex;gap:4px"><button class="btn btn-ghost btn-xs" onclick="toast('Edit KYC type','info')">Edit</button><button class="btn btn-danger btn-xs" onclick="confirmAction('Remove <strong>${k.type}</strong> from KYC requirements?',()=>removeKycDoc('${k.code}'),'Remove')">Remove</button></div></td>
  </tr>`).join('');
}

function removeKycDoc(code) {
  const i=KYC_DOCS.findIndex(k=>k.code===code);
  if(i>=0){KYC_DOCS.splice(i,1);saveData();renderKyc();toast('KYC type removed','success');}
}

// ─── RENDER: PROFILES ──────────────────────────────────────────────────────────

function renderProfiles() {
  const borrowers = scopeByTenant(BORROWERS);
  const kdocs = scopeByTenant(KYC_DOCS);
  const avgLimit=borrowers.length?Math.round(borrowers.reduce((s,b)=>s+b.limit,0)/borrowers.length):0;
  const requiredCodes=kdocs.filter(k=>k.required).map(k=>k.code);
  const kycComplete=borrowers.filter(b=>requiredCodes.every(c=>b.kycUploaded&&b.kycUploaded.includes(c))).length;
  document.getElementById('kpi-prof-total').textContent=borrowers.length;
  document.getElementById('kpi-prof-kyc').textContent=kycComplete;
  document.getElementById('kpi-prof-new').textContent=4;
  document.getElementById('kpi-prof-limit').textContent='KES '+fmt(avgLimit);
  const base=borrowers.filter(b=>!profQuery||b.name.toLowerCase().includes(profQuery)||b.ref.toLowerCase().includes(profQuery)||b.phone.includes(profQuery));
  const paged=paginate(base,pages.profiles);
  document.getElementById('profiles-tbody').innerHTML=paged.map(b=>`<tr onclick="openBorrowerDrawer('${b.ref}')">
    <td class="mono">${b.ref}</td><td class="name">${b.name}</td><td class="mono">${b.phone}</td><td>${b.distributor}</td><td class="mono">${fmt(b.limit)}</td><td style="min-width:130px">${scoreBar(b.score)}</td><td class="mono" style="font-size:var(--t-small)">01 Mar 2026</td>
    <td><button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();openBorrowerDrawer('${b.ref}')">Details</button></td>
  </tr>`).join('');
  renderPagination('profiles-pagination',base.length,pages.profiles,'setPageProfiles');
  animateCounters('profiles');
}

function filterProfiles(q){profQuery=q.toLowerCase();pages.profiles=1;renderProfiles();}

// ─── RENDER: SMS ───────────────────────────────────────────────────────────────

function renderSms() {
  document.getElementById('kpi-sms-tmpl').textContent=SMS_TEMPLATES.length;
  document.getElementById('kpi-sms-today').textContent=4;
  document.getElementById('kpi-sms-sched').textContent=SMS_SCHEDULED.length;
  document.getElementById('kpi-sms-rate').textContent='98.2%';
  document.getElementById('sms-tmpl-tbody').innerHTML=SMS_TEMPLATES.map(t=>`<tr>
    <td class="name">${t.name}</td><td><span class="badge ${t.category==='Debt Collection'?'rose':t.category==='Disbursement'?'green':'blue'}">${t.category}</span></td>
    <td style="font-size:var(--t-small);color:var(--text3);max-width:260px;">${truncate(t.body)}</td><td>${statusBadge(t.status)}</td>
    <td><div style="display:flex;gap:4px"><button class="btn btn-ghost btn-xs" onclick="toast('Edit template','info')">Edit</button><button class="btn btn-primary btn-xs" onclick="openModal('modal-send-sms')">Send</button></div></td>
  </tr>`).join('');
  document.getElementById('sms-sched-tbody').innerHTML=SMS_SCHEDULED.map((s,i)=>`<tr>
    <td>${s.recipient}</td><td>${s.template}</td><td class="mono" style="font-size:var(--t-small)">${s.scheduled}</td><td>${statusBadge(s.status)}</td>
    <td><button class="btn btn-danger btn-xs" onclick="confirmAction('Cancel this scheduled SMS?',()=>cancelScheduledSms(${i}),'Cancel SMS')">Cancel</button></td>
  </tr>`).join('');
  document.getElementById('sms-sent-tbody').innerHTML=SMS_SENT.map(s=>`<tr>
    <td class="mono">${s.recipient}</td><td style="font-size:var(--t-small);color:var(--text3)">${truncate(s.message,60)}</td><td class="mono" style="font-size:var(--t-small)">${s.sent}</td><td>${statusBadge(s.status)}</td>
  </tr>`).join('');
  animateCounters('sms');
}

function setSmsTab(t,el){
  smsTab=t;
  document.querySelectorAll('#view-sms .tabs .tab').forEach(x=>x.classList.remove('active'));
  el.classList.add('active');
  ['templates','scheduled','sent'].forEach(p=>{document.getElementById('sms-panel-'+p).style.display=(p===t)?'':'none';});
}

function cancelScheduledSms(i){SMS_SCHEDULED.splice(i,1);saveData();renderSms();toast('Scheduled SMS cancelled','success');}

// ─── RENDER: DMS ───────────────────────────────────────────────────────────────

function renderDms() {
  document.getElementById('dms-history-tbody').innerHTML=DMS_HISTORY.map(h=>`<tr>
    <td class="mono" style="font-size:var(--t-small)">${h.date}</td><td>${h.file}</td><td class="mono">${h.records}</td><td class="mono">${h.matched}</td><td class="mono">${h.flagged}</td><td>${statusBadge(h.status)}</td><td>${h.by}</td>
  </tr>`).join('');
}

function dmsNext(step){
  [1,2,3].forEach(i=>{
    document.getElementById('dms-step-panel-'+i).style.display=(i===step)?'':'none';
    const circ=document.getElementById('dms-step-'+i),lbl=document.getElementById('dms-lbl-'+i),line=document.getElementById('dms-line-'+i);
    if(i<step){circ.className='step-circle done';circ.textContent='✓';lbl.className='step-label done';}
    else if(i===step){circ.className='step-circle active';circ.textContent=i;lbl.className='step-label active';}
    else{circ.className='step-circle';circ.textContent=i;lbl.className='step-label';}
    if(line&&i<step) line.className='step-line done'; else if(line) line.className='step-line';
  });
  dmsStep=step;
  if(step===3) toast('247 records imported successfully','success');
}

function dmsReset(){dmsNext(1);}
function dmsUploadClick(){toast('File browser opened — select your Excel file','info');}

// ─── RENDER: DASHBOARD ─────────────────────────────────────────────────────────

function renderDashboard() {
  const sess = getSession();
  const LO = scopeByTenant(LOANS, sess);
  const BW = scopeByTenant(BORROWERS, sess);
  const AP = scopeByTenant(APPS, sess);
  const LD = scopeByTenant(LEADS, sess);
  const MP = scopeByTenant(MPESA, sess);
  // Hero KPIs — derive from live data
  const bookLoans = LO.filter(l=>['Active','Due','Overdue'].includes(l.status));
  const bookTotal = bookLoans.reduce((s,l)=>s+l.amount,0);
  const overdueLoans = LO.filter(l=>l.status==='Overdue');
  const heroOverdueAmt = overdueLoans.reduce((s,l)=>s+l.repayment,0);
  const mpesaTotal = MP.reduce((s,m)=>s+m.amount,0);
  const activeBwrs = BW.filter(b=>b.status==='Active').length;
  const newBwrs = BW.filter(b=>b.status==='Awaiting').length;
  const el=id=>document.getElementById(id);
  if(el('db-kpi-book'))     el('db-kpi-book').textContent     = 'KES '+(bookTotal/1000).toFixed(0)+'K';
  if(el('db-kpi-borrowers'))el('db-kpi-borrowers').textContent = activeBwrs;
  if(el('db-kpi-overdue'))  el('db-kpi-overdue').textContent  = 'KES '+(heroOverdueAmt/1000).toFixed(1)+'K';
  if(el('db-kpi-mpesa'))    el('db-kpi-mpesa').textContent    = 'KES '+fmt(mpesaTotal);
  if(el('db-kpi-new-bwr'))  el('db-kpi-new-bwr').textContent  = '↑ '+newBwrs;

  // Dynamic alert strips
  const overdue=LO.filter(l=>l.status==='Overdue');
  const overdueAmt=overdue.reduce((s,l)=>s+l.repayment,0);
  const pendingApps=AP.filter(a=>a.status==='Pending');
  const alertOverdue=document.getElementById('alert-overdue');
  const alertApps=document.getElementById('alert-apps');
  if(alertOverdue&&!alertOverdue.classList.contains('dismissed')){
    if(overdue.length>0){
      document.getElementById('alert-overdue-text').innerHTML=`<strong>${overdue.length} loan${overdue.length>1?'s':''} are overdue by 3+ days</strong> — KES ${fmt(overdueAmt)} at risk. Immediate outreach recommended.`;
      alertOverdue.style.display='';
    } else {
      alertOverdue.style.display='none';
    }
  }
  if(alertApps&&!alertApps.classList.contains('dismissed')){
    if(pendingApps.length>0){
      document.getElementById('alert-apps-text').innerHTML=`<strong>${pendingApps.length} application${pendingApps.length>1?'s':''} pending approval</strong> — oldest is 4 days old. Your pipeline may be cooling.`;
      alertApps.style.display='';
    } else {
      alertApps.style.display='none';
    }
  }

  // Bar chart
  const months=['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  const vals=[120000,145000,98000,175000,210000,180000,265000,315000];
  const maxVal=Math.max(...vals);
  const bc=document.getElementById('db-bar-chart');
  if(bc) bc.innerHTML=months.map((m,i)=>{
    const h=Math.round((vals[i]/maxVal)*100);
    return `<div class="bar-wrap"><div class="bar" style="height:${h}px;background:${i===months.length-1?'var(--green)':'var(--green-mid)'}"><div class="bar-tooltip">KES ${(vals[i]/1000).toFixed(0)}K</div></div><div class="bar-lbl">${m}</div></div>`;
  }).join('');

  // Portfolio by Status donut — dynamic from LOANS data
  const portfolioEl=document.getElementById('db-portfolio-donut');
  if(portfolioEl&&LO.length){
    const segs=[
      {label:'Active',color:'var(--green)',count:LO.filter(l=>l.status==='Active').length},
      {label:'Due',color:'var(--amber)',count:LO.filter(l=>l.status==='Due').length},
      {label:'Overdue',color:'var(--rose)',count:LO.filter(l=>l.status==='Overdue').length},
      {label:'Repaid',color:'var(--teal)',count:LO.filter(l=>l.status==='Repaid').length},
      {label:'Frozen / Other',color:'var(--blue)',count:LO.filter(l=>['Frozen','Written Off','Withdrawn'].includes(l.status)).length},
    ].filter(s=>s.count>0);
    portfolioEl.innerHTML=buildDonutChart(segs,LO.length);
  }

  // Line chart
  const svg=document.getElementById('db-line-svg');
  if(svg){
    const W=560,H=150,pad=30;
    const expected=[95000,110000,80000,140000,185000,155000,230000,280000];
    const collected=[88000,108000,72000,138000,178000,150000,218000,245000];
    const maxY=Math.max(...expected,...collected)*1.1;
    const px=i=>pad+(i/(months.length-1))*(W-pad*2);
    const py=v=>H-pad-(v/maxY)*(H-pad*1.5);
    let g='';
    [0,0.25,0.5,0.75,1].forEach(f=>{
      const y=py(maxY*f),lbl=f===0?'0':(maxY*f/1000).toFixed(0)+'K';
      g+=`<line x1="${pad}" y1="${y}" x2="${W-pad}" y2="${y}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,3"/>`;
      g+=`<text x="4" y="${y+3}" font-family="DM Mono,monospace" font-size="8" fill="var(--text4)">${lbl}</text>`;
    });
    months.forEach((m,i)=>g+=`<text x="${px(i)}" y="${H-6}" text-anchor="middle" font-family="DM Mono,monospace" font-size="8" fill="var(--text4)">${m}</text>`);
    const area=`${px(0)},${py(0)} ${collected.map((v,i)=>`${px(i)},${py(v)}`).join(' ')} ${px(months.length-1)},${py(0)}`;
    g+=`<polygon points="${area}" fill="var(--green)" opacity="0.07"/>`;
    g+=`<polyline points="${collected.map((v,i)=>`${px(i)},${py(v)}`).join(' ')}" fill="none" stroke="var(--border2)" stroke-width="1.5" stroke-dasharray="5,4"/>`;
    g+=`<polyline points="${expected.map((v,i)=>`${px(i)},${py(v)}`).join(' ')}" fill="none" stroke="var(--green)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    collected.forEach((v,i)=>g+=`<circle cx="${px(i)}" cy="${py(v)}" r="3.5" fill="var(--green)" stroke="white" stroke-width="1.5"/>`);
    svg.innerHTML=g;
  }

  // Lead conversion funnel — dynamic
  const funnel=document.getElementById('db-funnel');
  if(funnel&&LD.length){
    const converted=LD.filter(l=>l.status==='Approved'||l.status==='Completed').length;
    const stages=[
      {label:'Total Leads',val:LD.length,color:'var(--blue)',pct:100},
      {label:'Approved Leads',val:converted,color:'var(--purple)',pct:Math.round(converted/LD.length*100)},
      {label:'Applications',val:AP.length,color:'var(--teal)',pct:Math.round(AP.length/LD.length*100)},
      {label:'Loans Disbursed',val:LO.length,color:'var(--green)',pct:Math.round(LO.length/LD.length*100)},
    ];
    funnel.innerHTML=stages.map(s=>`<div style="margin-bottom:12px;"><div class="hbar-head"><span class="hbar-label">${s.label}</span><span class="hbar-val">${s.val} <span style="font-size:9px;color:var(--text4)">(${s.pct}%)</span></span></div><div class="hbar-track"><div class="hbar-fill" style="width:${s.pct}%;background:${s.color};"></div></div></div>`).join('');
  }

  // Product mix — dynamic from active loans
  const pm=document.getElementById('db-product-mix');
  if(pm){
    const prodAmts={};
    LO.filter(l=>['Active','Due','Overdue'].includes(l.status)).forEach(l=>{ prodAmts[l.product]=(prodAmts[l.product]||0)+l.amount; });
    const list=Object.entries(prodAmts).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const totalProd=list.reduce((s,[,v])=>s+v,0);
    const colors=['var(--purple)','var(--blue)','var(--teal)','var(--green)','var(--amber)'];
    pm.innerHTML=list.map(([name,amt],i)=>{
      const pct=Math.round(amt/totalProd*100);
      return `<div class="hbar-item"><div class="hbar-head"><span class="hbar-label">${name}</span><span class="hbar-val">KES ${(amt/1000).toFixed(0)}K <span style="font-size:9px;color:var(--text4)">${pct}%</span></span></div><div class="hbar-track"><div class="hbar-fill" style="width:${pct}%;background:${colors[i]};"></div></div></div>`;
    }).join('');
  }

  // CentyCred gauge — dynamic from BORROWERS
  const ccEl=document.getElementById('db-centycred-chart');
  if(ccEl&&BW.length) ccEl.innerHTML=buildGaugeChart(BW);

  // Top borrowers by exposure — dynamic
  const tb=document.getElementById('db-top-borrowers');
  if(tb){
    const top=LO.filter(l=>['Active','Due','Overdue'].includes(l.status)).sort((a,b)=>b.amount-a.amount).slice(0,5);
    const maxB=top.length?top[0].amount:1;
    tb.innerHTML=top.map(r=>{
      const pct=Math.round(r.amount/maxB*100);
      const bwr=BW.find(b=>b.name===r.borrower);
      return `<div class="sparkline-row" onclick="openLoanDrawer('${r.ref}')" style="cursor:pointer;"><div class="sparkline-info"><div class="sparkline-name">${r.borrower}</div><div class="sparkline-sub">${r.ref}</div></div><div style="flex:1;margin:0 12px;"><div class="hbar-track" style="height:5px;"><div class="hbar-fill" style="width:${pct}%;background:${r.status==='Active'?'var(--green)':'var(--rose)'};"></div></div></div><div><div class="sparkline-val">KES ${fmt(r.amount)}</div><div class="sparkline-delta ${bwr&&bwr.score>=750?'up':''}" style="font-size:9px;font-family:var(--mono);font-weight:600;">Score ${bwr?bwr.score:'—'}</div></div></div>`;
    }).join('');
  }
  animateCounters('dashboard');
}

// ─── NOTIFICATIONS ─────────────────────────────────────────────────────────────

function toggleNotifPanel() {
  notifOpen=!notifOpen;
  document.getElementById('notif-panel').classList.toggle('open',notifOpen);
  if(notifOpen) renderNotifPanel();
}

function renderNotifPanel() {
  const unread=NOTIFICATIONS.filter(n=>!n.read).length;
  const badge=document.getElementById('notif-badge');
  if(badge){badge.style.display=unread>0?'':'none';badge.textContent=unread;}
  const list=document.getElementById('notif-list');
  if(!list) return;
  list.innerHTML=NOTIFICATIONS.slice(0,8).map((n,i)=>`<div class="notif-item ${n.read?'read':''}" onclick="markNotifRead(${i})">
    <span class="notif-item-icon">${n.icon}</span>
    <div class="notif-item-body"><div class="notif-item-text">${n.text}</div><div class="notif-item-time">${n.time}</div></div>
    ${!n.read?'<div class="notif-unread-dot"></div>':''}
  </div>`).join('');
}

function markNotifRead(i){NOTIFICATIONS[i].read=true;renderNotifPanel();}
function markAllRead(){NOTIFICATIONS.forEach(n=>n.read=true);renderNotifPanel();}
function updateNotifBadge(){
  const unread=NOTIFICATIONS.filter(n=>!n.read).length;
  const badge=document.getElementById('notif-badge');
  if(badge){badge.style.display=unread>0?'':'none';badge.textContent=unread;}
}

// ─── ALERTS ────────────────────────────────────────────────────────────────────

function dismissAlert(id){
  const el=document.getElementById(id);
  if(el){el.classList.add('dismissed');el.style.display='none';}
}

// ─── CONFIRM MODAL ─────────────────────────────────────────────────────────────

function confirmAction(message,onConfirm,dangerLabel='Confirm'){
  document.getElementById('confirm-body').innerHTML=`<p style="color:var(--text2);font-size:var(--t-body);line-height:1.6">${message}</p>`;
  document.getElementById('confirm-ok-btn').textContent=dangerLabel;
  _confirmCallback=onConfirm;
  openModal('modal-confirm');
}

function executeConfirm(){
  closeModal('modal-confirm');
  if(_confirmCallback){_confirmCallback();_confirmCallback=null;}
}

function confirmDeleteProduct(ref){
  const p=PRODUCTS.find(x=>x.ref===ref);
  if(p) confirmAction(`Delete product <strong>${p.name}</strong>? This cannot be undone.`,()=>{
    const i=PRODUCTS.findIndex(x=>x.ref===ref);
    if(i>=0){PRODUCTS.splice(i,1);saveData();renderProducts();toast('Product deleted','success');}
  },'Delete');
}

// ─── FORM HELPERS ──────────────────────────────────────────────────────────────

function _val(id){const el=document.getElementById(id);return el?el.value.trim():'';}
function _clear(...ids){ids.forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});}

// ─── FORM SUBMISSIONS ──────────────────────────────────────────────────────────

function submitAddLead(){
  if(!validate([
    {id:'f-lead-name',  label:'Full name'},
    {id:'f-lead-phone', label:'Phone number', type:'phone'},
  ])) return;
  const name=_val('f-lead-name'),phone=_val('f-lead-phone');
  const biz=_val('f-lead-biz'),location=_val('f-lead-location');
  const distributor=_val('f-lead-distributor')||'CentyDist Nairobi';
  const source=_val('f-lead-source')||'Field Agent';
  LEADS.push({id:Date.now(),name,phone,biz,location,distributor,source,status:'Pending',tenantId:getTenantId()||'centycapital-ke'});
  NOTIFICATIONS.unshift({icon:'🎯',text:`New lead: ${name}${biz?' — '+biz:''}`,time:'Just now',read:false});
  closeModal('modal-add-lead');
  _clear('f-lead-name','f-lead-phone','f-lead-biz','f-lead-location','f-lead-notes');
  updateNavBadges();updateNotifBadge();renderLeads();
  toast(`Lead added: ${name}`,'success');
}

function submitAddBorrower(){
  if(!validate([
    {id:'f-bwr-name',  label:'Full name'},
    {id:'f-bwr-phone', label:'Phone number', type:'phone'},
    {id:'f-bwr-limit', label:'Loan limit', type:'number', min:1000, max:5000000},
  ])) return;
  const name=_val('f-bwr-name'),phone=_val('f-bwr-phone');
  const natid=_val('f-bwr-natid'),ke=_val('f-bwr-ke');
  const biz=_val('f-bwr-biz'),bizType=_val('f-bwr-biztype')||'Retailer';
  const location=_val('f-bwr-location'),limit=parseInt(_val('f-bwr-limit'))||20000;
  const refName=_val('f-bwr-refname'),refPhone=_val('f-bwr-refphone');
  const ref='BWR-'+String(BORROWERS.length+1).padStart(4,'0');
  const keNum=ke||'KE-'+String(Math.floor(Math.random()*9000)+1000);
  BORROWERS.push({ref,name,phone,ke:keNum,limit,score:700,biz,bizType,location,distributor:'CentyDist Nairobi',id:natid,refName,refPhone,refRel:'—',status:'Awaiting',kycUploaded:[],tenantId:getTenantId()||'centycapital-ke'});
  NOTIFICATIONS.unshift({icon:'👥',text:`New borrower registered: ${name} (${ref})`,time:'Just now',read:false});
  closeModal('modal-add-borrower');
  _clear('f-bwr-name','f-bwr-phone','f-bwr-natid','f-bwr-ke','f-bwr-biz','f-bwr-location','f-bwr-limit','f-bwr-refname','f-bwr-refphone');
  updateNavBadges();updateNotifBadge();renderBorrowers();
  toast(`Borrower registered: ${name}`,'success');
}

function submitNewLoan(){
  if(!validate([
    {id:'f-loan-borrower', label:'Borrower name'},
    {id:'f-loan-amount',   label:'Loan amount', type:'number', min:1000, max:10000000},
  ])) return;
  const borrowerName=_val('f-loan-borrower'),amountStr=_val('f-loan-amount');
  const product=_val('f-loan-product'),rate=_val('f-loan-rate')||'5';
  const amount=parseInt(amountStr);
  const ref='CNTAPP'+String(APPS.length+1).padStart(3,'0');
  const bwr=scopeByTenant(BORROWERS).find(b=>b.name.toLowerCase()===borrowerName.toLowerCase());
  if(!bwr){toast('Borrower not found in your tenant','error');return;}
  const prod=scopeByTenant(PRODUCTS).find(p=>p.name===product);
  APPS.push({ref,borrower:borrowerName,amount,rate:rate+'%/mo',product:product||'CentyFlex 30',partner:prod?.partner||'Centum MFI',status:'Pending',applied:fmtDate(new Date()),tenantId:getTenantId()||'centycapital-ke'});
  NOTIFICATIONS.unshift({icon:'📋',text:`New application ${ref}: KES ${fmt(amount)} from ${borrowerName}`,time:'Just now',read:false});
  closeModal('modal-new-loan');
  _clear('f-loan-borrower','f-loan-amount','f-loan-rate','f-loan-tenor','f-loan-notes');
  document.getElementById('f-loan-product').selectedIndex=0;
  updateNavBadges();updateNotifBadge();renderApps();
  toast(`Application ${ref} submitted`,'success');
}

function submitAddProduct(){
  const name=_val('f-prod-name'),ref=_val('f-prod-ref'),partner=_val('f-prod-partner');
  const limit=parseInt(_val('f-prod-limit'))||0,rate=_val('f-prod-rate')||'5',charge=_val('f-prod-charge')||'0';
  if(!name){toast('Product name is required','error');return;}
  PRODUCTS.push({name,ref:ref||'PROD-'+String(PRODUCTS.length+1).padStart(3,'0'),partner,limit,rate:rate+'%',charge,status:'Active',tenantId:getTenantId()||'centycapital-ke'});
  closeModal('modal-add-product');
  _clear('f-prod-name','f-prod-ref','f-prod-partner','f-prod-limit','f-prod-rate','f-prod-charge');
  saveData();renderProducts();toast(`Product "${name}" created`,'success');
}

function submitAddKyc(){
  const type=_val('f-kyc-type'),code=_val('f-kyc-code');
  const required=document.getElementById('f-kyc-required')?.value==='yes';
  const desc=_val('f-kyc-desc');
  if(!type){toast('Document type is required','error');return;}
  if(!code){toast('Unique code is required','error');return;}
  KYC_DOCS.push({type,code:code.toUpperCase(),required,desc,tenantId:getTenantId()||'centycapital-ke'});
  closeModal('modal-add-kyc');
  _clear('f-kyc-type','f-kyc-code','f-kyc-desc');
  saveData();renderKyc();toast(`KYC type "${type}" added`,'success');
}

function approveApp(ref){
  const a=APPS.find(x=>x.ref===ref);
  if(!a||a.status!=='Pending') return;
  a.status='Approved';
  NOTIFICATIONS.unshift({icon:'✅',text:`Application ${ref} approved for ${a.borrower}`,time:'Just now',read:false});
  updateNavBadges();updateNotifBadge();renderApps();
  toast(`${ref} approved — ready for disbursement`,'success');
}

function declineApp(ref){
  const a=APPS.find(x=>x.ref===ref);
  if(!a||a.status!=='Pending') return;
  confirmAction(`Decline application <strong>${ref}</strong> for ${a.borrower}?<br><small style="color:var(--text3)">This will move it to Rejected status.</small>`,()=>{
    a.status='Rejected';renderApps();updateNavBadges();toast(`${ref} declined`,'error');
  },'Decline');
}

function disburseLoan(appRef){
  const a=APPS.find(x=>x.ref===appRef);
  if(!a) return;
  const loanRef='CNTLOAN'+String(LOANS.length+1).padStart(3,'0');
  const today=new Date();
  const tenorDays=parseInt(a.product.match(/\d+$/)?.[0]||30);
  const dueDate=new Date(today.getTime()+tenorDays*86400000);
  const rateNum=parseFloat(a.rate)/100;
  const repayment=Math.round(a.amount*(1+rateNum));
  const bwr=BORROWERS.find(b=>b.name===a.borrower);
  LOANS.push({ref:loanRef,borrower:a.borrower,ke:bwr?.ke||'KE-XXXX',amount:a.amount,disbursed:fmtDate(today),repayment,due:fmtDate(dueDate),product:a.product,partner:a.partner,till:'891234',mode:'Paybill',status:'Active'});
  a.status='Disbursed';
  NOTIFICATIONS.unshift({icon:'💳',text:`Loan ${loanRef} disbursed — KES ${fmt(a.amount)} to ${a.borrower}`,time:'Just now',read:false});
  updateNavBadges();updateNotifBadge();renderApps();closeDrawer('app');
  toast(`Loan ${loanRef} disbursed — KES ${fmt(a.amount)} to ${a.borrower}`,'success');
}

function convertLead(id){
  const l=LEADS.find(x=>x.id===id);
  if(!l){toast('Lead not found','error');return;}
  const se=(i,v)=>{const e=document.getElementById(i);if(e)e.value=v;};
  se('f-bwr-name',l.name);se('f-bwr-phone',l.phone);
  se('f-bwr-biz',l.biz);se('f-bwr-location',l.location);
  openModal('modal-add-borrower');
  toast(`Converting lead: ${l.name} — complete the form to register`,'info');
}

// ─── LOAN DRAWER: COMMENTS & PTPS ─────────────────────────────────────────────

function renderLoanComments(loanRef){
  const el=document.getElementById('ld-comments-list');if(!el)return;
  const comments=LOAN_COMMENTS[loanRef]||[];
  el.innerHTML=comments.length?comments.map(c=>`<div class="comment-item"><div class="comment-meta"><span class="comment-author">${c.author}</span><span class="comment-time">${c.time}</span></div><div class="comment-text">${c.text}</div></div>`).join(''):'<div style="padding:20px;text-align:center;color:var(--text4);font-size:var(--t-small)">No comments yet.</div>';
}

function postComment(loanRef){
  const ta=document.getElementById('ld-comment-input');if(!ta)return;
  const text=ta.value.trim();
  if(!text){toast('Comment cannot be empty','error');return;}
  if(!LOAN_COMMENTS[loanRef]) LOAN_COMMENTS[loanRef]=[];
  LOAN_COMMENTS[loanRef].unshift({author:'Edwin M',time:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})+' '+new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'}),text});
  ta.value='';saveData();renderLoanComments(loanRef);toast('Comment posted','success');
}

function renderLoanPtps(loanRef){
  const el=document.getElementById('ld-ptps-tbody');if(!el)return;
  const ptps=LOAN_PTPS[loanRef]||[];
  el.innerHTML=ptps.length?ptps.map(p=>`<tr><td class="mono">${p.date}</td><td class="mono">${fmt(p.amount)}</td><td>${statusBadge(p.status)}</td><td style="font-size:var(--t-small);color:var(--text3)">${p.notes}</td></tr>`).join(''):'<tr class="empty-row"><td colspan="4">No PTPs recorded</td></tr>';
}

function recordPtp(loanRef){
  const dateEl=document.getElementById('ld-ptp-date'),amtEl=document.getElementById('ld-ptp-amount'),notesEl=document.getElementById('ld-ptp-notes');
  const date=dateEl?.value,amount=parseInt(amtEl?.value||'0'),notes=notesEl?.value||'';
  if(!date){toast('Promise date is required','error');return;}
  if(!amount||amount<=0){toast('Valid amount is required','error');return;}
  if(!LOAN_PTPS[loanRef]) LOAN_PTPS[loanRef]=[];
  LOAN_PTPS[loanRef].unshift({date,amount,status:'Pending',notes});
  if(dateEl)dateEl.value='';if(amtEl)amtEl.value='';if(notesEl)notesEl.value='';
  saveData();renderLoanPtps(loanRef);toast('PTP recorded','success');
}

function writeOffLoan(ref){
  const l=LOANS.find(x=>x.ref===ref);if(!l)return;
  confirmAction(`Write off loan <strong>${ref}</strong> (${l.borrower}, KES ${fmt(l.amount)})?<br><small style="color:var(--text3)">Requires management approval. Cannot be undone.</small>`,()=>{
    l.status='Written Off';saveData();closeDrawer('loan');renderLoans();toast(`${ref} written off`,'success');
  },'Write Off');
}

// ─── CSV EXPORT ────────────────────────────────────────────────────────────────

function exportCsv(type){
  let headers=[],rows=[];
  if(type==='mpesa'){
    headers=['Phone','Amount (KES)','M-Pesa Code','Loan Account','Loan Ref','Mode','Created On','Completed'];
    rows=MPESA.map(m=>[m.phone,m.amount,m.code,m.account,m.loanRef,m.mode,m.created,m.completed?'Yes':'No']);
  } else if(type==='loans'){
    headers=['Loan Ref','Borrower','KE Number','Amount (KES)','Disbursed','Repayment','Due Date','Status','Product','Partner'];
    rows=LOANS.map(l=>[l.ref,l.borrower,l.ke,l.amount,l.disbursed,l.repayment,l.due,l.status,l.product,l.partner]);
  } else if(type==='borrowers'){
    headers=['Ref','Name','Phone','KE Number','Loan Limit','CentyCred Score','Status','Location','Distributor'];
    rows=BORROWERS.map(b=>[b.ref,b.name,b.phone,b.ke,b.limit,b.score,b.status,b.location,b.distributor]);
  }
  const csv=[headers,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=Object.assign(document.createElement('a'),{href:URL.createObjectURL(new Blob([csv],{type:'text/csv'})),download:`centycapital-${type}-export.csv`});
  a.click();URL.revokeObjectURL(a.href);
  toast(`Exported ${rows.length} ${type} records to CSV`,'success');
}

// ─── DRAWERS ───────────────────────────────────────────────────────────────────

function openBorrowerDrawer(ref){
  const b=BORROWERS.find(x=>x.ref===ref);if(!b)return;
  document.getElementById('bd-name').textContent=b.name;
  document.getElementById('bd-ref').textContent=b.ref+' · '+b.ke;
  document.getElementById('bd-status-badge').innerHTML=statusBadge(b.status);
  document.getElementById('bd-fullname').textContent=b.name;
  document.getElementById('bd-phone').textContent=b.phone;
  document.getElementById('bd-id').textContent=b.id;
  document.getElementById('bd-ke').textContent=b.ke;
  document.getElementById('bd-location').textContent=b.location;
  document.getElementById('bd-distributor').textContent=b.distributor;
  document.getElementById('bd-biz').textContent=b.biz;
  document.getElementById('bd-biz-type').textContent=b.bizType;
  document.getElementById('bd-limit').textContent=fmt(b.limit);
  document.getElementById('bd-score-display').innerHTML=scoreBar(b.score);
  document.getElementById('bd-ref-name').textContent=b.refName;
  document.getElementById('bd-ref-phone').textContent=b.refPhone;
  document.getElementById('bd-ref-rel').textContent=b.refRel;
  const loans=LOANS.filter(l=>l.borrower===b.name);
  document.getElementById('bd-loans-tbody').innerHTML=loans.length?loans.map(l=>`<tr onclick="openLoanDrawer('${l.ref}')"><td class="mono">${l.ref}</td><td class="mono">${fmt(l.amount)}</td><td>${statusBadge(l.status)}</td><td class="mono" style="font-size:var(--t-small)">${l.disbursed}</td><td class="mono" style="font-size:var(--t-small)">${l.due}</td><td><button class="btn btn-ghost btn-xs" onclick="event.stopPropagation();openLoanDrawer('${l.ref}')">View</button></td></tr>`).join(''):'<tr class="empty-row"><td colspan="6">No loans found for this borrower</td></tr>';
  const uploaded=b.kycUploaded||[];
  document.getElementById('bd-kyc-list').innerHTML=`<div style="display:flex;flex-direction:column;gap:10px;">${KYC_DOCS.map(k=>{
    const done=uploaded.includes(k.code);
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--surface2);border-radius:var(--r);border:1px solid var(--border);">
      <span style="font-size:18px">${done?'📄':'📋'}</span>
      <div style="flex:1"><div style="font-size:var(--t-body);font-weight:500">${k.type}</div><div style="font-size:var(--t-small);color:var(--text3)">${k.code} · ${k.required?'Required':'Optional'}</div></div>
      ${done?'<span class="badge green">Uploaded</span>':'<span class="badge amber">Pending</span>'}
      ${done?'<button class="btn btn-ghost btn-xs" onclick="toast(\'View document\',\'info\')">View</button>':''}
    </div>`;
  }).join('')}</div>`;
  setBwrDrawerTab('details',document.querySelector('#borrower-drawer .drawer-tab'));
  document.getElementById('borrower-overlay').classList.add('open');
  document.getElementById('borrower-drawer').classList.add('open');
}

function openBorrowerByName(name){
  const b=BORROWERS.find(x=>x.name===name);
  if(b) openBorrowerDrawer(b.ref); else toast(`Borrower "${name}" not found in registry`,'info');
}

function setBwrDrawerTab(t,el){
  ['details','loans','kyc','messages'].forEach(id=>{document.getElementById('bdtab-'+id).style.display=(id===t)?'':'none';});
  document.querySelectorAll('#borrower-drawer .drawer-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('#borrower-drawer .drawer-tab').forEach(x=>{if(x.getAttribute('onclick')&&x.getAttribute('onclick').includes("'"+t+"'"))x.classList.add('active');});
}

function openLoanDrawer(ref){
  const l=LOANS.find(x=>x.ref===ref);if(!l)return;
  _currentLoanRef=ref;
  document.getElementById('ld-ref').textContent=l.ref;
  document.getElementById('ld-borrower').textContent=l.borrower+' · '+l.ke;
  document.getElementById('ld-status-badge').innerHTML=statusBadge(l.status);
  document.getElementById('ld-loan-ref').textContent=l.ref;
  document.getElementById('ld-amount').textContent=fmt(l.amount);
  const prod=PRODUCTS.find(p=>p.name===l.product);
  document.getElementById('ld-rate').textContent=prod?prod.rate+'/mo':'—';
  document.getElementById('ld-disbursed').textContent=l.disbursed;
  document.getElementById('ld-due').textContent=l.due;
  document.getElementById('ld-repayment').textContent=fmt(l.repayment);
  document.getElementById('ld-product').textContent=l.product;
  document.getElementById('ld-partner').textContent=l.partner;
  document.getElementById('ld-ke').textContent=l.ke;
  document.getElementById('ld-till').textContent=l.till;
  document.getElementById('ld-mode').textContent=l.mode;
  const mpesa=MPESA.filter(m=>m.loanRef===l.ref);
  document.getElementById('ld-repayments-tbody').innerHTML=mpesa.length?mpesa.map(m=>`<tr><td class="mono" style="font-size:var(--t-small)">${m.created}</td><td class="mono">${fmt(m.amount)}</td><td class="mono" style="font-weight:500">${m.code}</td><td><span class="badge ${m.mode==='Paybill'?'blue':'purple'}">${m.mode}</span></td><td>${m.completed?'<span class="badge green">Completed</span>':'<span class="badge amber">Pending</span>'}</td></tr>`).join(''):'<tr class="empty-row"><td colspan="5">No repayments recorded</td></tr>';
  renderLoanComments(ref);
  renderLoanPtps(ref);
  const woBtn=document.getElementById('ld-writeoff-btn');
  if(woBtn) woBtn.style.display=['Written Off','Repaid'].includes(l.status)?'none':'';
  setLoanDrawerTab('details',null);
  document.getElementById('loan-overlay').classList.add('open');
  document.getElementById('loan-drawer').classList.add('open');
}

function setLoanDrawerTab(t,el){
  ['details','repayments','comments','ptps'].forEach(id=>{document.getElementById('ldtab-'+id).style.display=(id===t)?'':'none';});
  document.querySelectorAll('#loan-drawer .drawer-tab').forEach(x=>x.classList.remove('active'));
  if(el) el.classList.add('active'); else document.querySelector('#loan-drawer .drawer-tab').classList.add('active');
  document.querySelectorAll('#loan-drawer .drawer-tab').forEach(x=>{if(x.getAttribute('onclick')&&x.getAttribute('onclick').includes("'"+t+"'"))x.classList.add('active');});
}

function openAppDrawer(ref){
  const a=APPS.find(x=>x.ref===ref);if(!a)return;
  document.getElementById('apd-ref').textContent=a.ref;
  document.getElementById('apd-borrower').textContent=a.borrower;
  document.getElementById('apd-status-badge').innerHTML=statusBadge(a.status);
  document.getElementById('apd-amount').textContent=fmt(a.amount);
  document.getElementById('apd-rate').textContent=a.rate;
  document.getElementById('apd-product').textContent=a.product;
  document.getElementById('apd-partner').textContent=a.partner;
  document.getElementById('apd-applied').textContent=a.applied;
  _refreshAppDrawerActions(a);
  document.getElementById('app-overlay').classList.add('open');
  document.getElementById('app-drawer').classList.add('open');
}

function _refreshAppDrawerActions(a){
  const sec=document.getElementById('apd-actions-section');if(!sec)return;
  if(a.status==='Pending') sec.innerHTML=`<div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="btn btn-primary" onclick="approveApp('${a.ref}');_refreshAppDrawerActions(APPS.find(x=>x.ref==='${a.ref}'))">✓ Approve Application</button><button class="btn btn-danger" onclick="declineApp('${a.ref}')">✗ Decline</button></div>`;
  else if(a.status==='Approved') sec.innerHTML=`<button class="btn btn-primary" onclick="disburseLoan('${a.ref}')">💳 Disburse Loan →</button>`;
  else sec.innerHTML=`<p style="color:var(--text3);font-size:var(--t-small)">No actions available for <strong>${a.status}</strong> applications.</p>`;
}

function closeDrawer(name){
  document.getElementById(name+'-overlay').classList.remove('open');
  document.getElementById(name+'-drawer').classList.remove('open');
}

// ─── MODALS ────────────────────────────────────────────────────────────────────

function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}

// ─── TOAST ─────────────────────────────────────────────────────────────────────

function toast(msg,type='info'){
  const icons={success:'✅',error:'❌',info:'ℹ️'};
  const durations={success:3000,error:6000,info:4000};
  const el=document.createElement('div');
  el.className=`toast ${type}`;
  el.innerHTML=`<span class="toast-icon">${icons[type]}</span><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  const d=durations[type]||3000;
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translateY(8px)';},d);
  setTimeout(()=>el.remove(),d+300);
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────

function _normalizeEmail(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
}
function _normalizePassword(s) {
  let p = String(s || '').replace(/[\u200B-\u200D\uFEFF]/g, '');
  try { if (typeof p.normalize === 'function') p = p.normalize('NFKC'); } catch (e) {}
  return p.trim();
}

function findAuthUserByEmail(email) {
  const want = _normalizeEmail(email);
  return AUTH_USERS.find(u => _normalizeEmail(u.email) === want);
}

function checkAuth() {
  const sess = localStorage.getItem('cc_session');
  const shell = document.getElementById('app-shell');
  const ls    = document.getElementById('login-screen');
  if (sess) {
    if (ls)    ls.style.display    = 'none';
    if (shell) shell.style.display = '';
  } else {
    if (ls)    ls.style.display    = 'flex';
    if (shell) shell.style.display = 'none';
  }
}

function login() {
  const email = _normalizeEmail(document.getElementById('login-email')?.value);
  const pwd   = _normalizePassword(document.getElementById('login-pwd')?.value);
  const err   = document.getElementById('login-error');
  err.textContent = '';
  if (!email || !pwd) { err.textContent = 'Please enter your email and password.'; return; }
  const user = findAuthUserByEmail(email);
  if (!user) {
    err.textContent = 'No demo account for this email. Use an address from the list below.';
    document.getElementById('login-pwd').value = '';
    return;
  }
  const expected = _normalizePassword(user.password || 'demo1234');
  if (pwd !== expected) {
    err.textContent = 'Wrong password. All demo accounts use: demo1234';
    document.getElementById('login-pwd').value = '';
    return;
  }
  localStorage.setItem('cc_session', JSON.stringify({
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
    accountType: user.accountType,
    borrowerNationalId: user.borrowerNationalId || null,
    at: Date.now(),
  }));
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-shell').style.display    = '';
  applyAuthUi();
  showView(getDefaultViewForRole(getSession()));
}

function logout() {
  confirmAction('Sign out of CentyCapital LMS?', () => {
    localStorage.removeItem('cc_session');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('app-shell').style.display    = 'none';
    document.getElementById('login-email').value = '';
    document.getElementById('login-pwd').value   = '';
    document.getElementById('login-error').textContent = '';
  }, 'Sign Out');
}

// ─── FORM VALIDATION ───────────────────────────────────────────────────────────

function validate(rules) {
  let ok = true;
  rules.forEach(({ id, label, type, min, max }) => {
    const el    = document.getElementById(id);
    const errEl = document.getElementById(id + '-err');
    if (!el) return;
    el.classList.remove('invalid');
    if (errEl) errEl.textContent = '';
    const val = el.value.trim();
    if (!val) {
      if (errEl) errEl.textContent = `${label} is required.`;
      el.classList.add('invalid'); ok = false;
    } else if (type === 'phone' && !/^(?:07|01|\+254)\d{7,9}$/.test(val.replace(/[\s\-]/g, ''))) {
      if (errEl) errEl.textContent = 'Enter a valid phone (07XXXXXXXX).';
      el.classList.add('invalid'); ok = false;
    } else if (type === 'number') {
      const n = parseFloat(val);
      if (isNaN(n)) {
        if (errEl) errEl.textContent = 'Must be a number.';
        el.classList.add('invalid'); ok = false;
      } else if (min !== undefined && n < min) {
        if (errEl) errEl.textContent = `Minimum is ${min}.`;
        el.classList.add('invalid'); ok = false;
      } else if (max !== undefined && n > max) {
        if (errEl) errEl.textContent = `Maximum is ${max}.`;
        el.classList.add('invalid'); ok = false;
      }
    }
  });
  return ok;
}

function clearValidation(...ids) {
  ids.forEach(id => {
    const el    = document.getElementById(id);
    const errEl = document.getElementById(id + '-err');
    if (el)    el.classList.remove('invalid');
    if (errEl) errEl.textContent = '';
  });
}

// ─── LOAN REPAYMENT CALCULATOR ──────────────────────────────────────────────────

function calcLoanPreview() {
  const amt   = parseFloat(document.getElementById('f-loan-amount')?.value)  || 0;
  const rate  = parseFloat(document.getElementById('f-loan-rate')?.value)    || 0;
  const tenor = parseFloat(document.getElementById('f-loan-tenor')?.value)   || 30;
  const prev  = document.getElementById('loan-calc-preview');
  if (!prev) return;
  if (amt > 0 && rate > 0) {
    const months   = Math.max(1, Math.ceil(tenor / 30));
    const interest = amt * (rate / 100) * months;
    const total    = amt + interest;
    document.getElementById('calc-principal').textContent = 'KES ' + fmt(Math.round(amt));
    document.getElementById('calc-interest').textContent  = 'KES ' + fmt(Math.round(interest));
    document.getElementById('calc-total').textContent     = 'KES ' + fmt(Math.round(total));
    prev.classList.add('visible');
  } else {
    prev.classList.remove('visible');
  }
}

// ─── GLOBAL SEARCH ─────────────────────────────────────────────────────────────

function globalSearch(q) {
  const results = document.getElementById('gsearch-results');
  if (!results) return;
  q = (q || '').trim().toLowerCase();
  if (!q) { results.classList.remove('open'); return; }
  const sess = getSession();
  const loans     = scopeByTenant(LOANS, sess).filter(l => l.ref.toLowerCase().includes(q) || l.borrower.toLowerCase().includes(q)).slice(0, 4);
  const borrowers = scopeByTenant(BORROWERS, sess).filter(b => b.name.toLowerCase().includes(q) || b.ref.toLowerCase().includes(q) || (b.phone||'').replace(/\s/g,'').includes(q.replace(/\s/g,''))).slice(0, 4);
  const leads     = scopeByTenant(LEADS, sess).filter(l => l.name.toLowerCase().includes(q) || l.biz.toLowerCase().includes(q)).slice(0, 3);
  const apps      = scopeByTenant(APPS, sess).filter(a => a.ref.toLowerCase().includes(q) || a.borrower.toLowerCase().includes(q)).slice(0, 3);
  let html = '';
  if (loans.length) {
    html += `<div class="gsearch-group">Loans</div>`;
    html += loans.map(l => `<div class="gsearch-item" onclick="hideSearch();showView('loans');setTimeout(()=>openLoanDrawer('${l.ref}'),60)">
      <div class="gsearch-icon" style="background:var(--blue-lt)">💳</div>
      <div><div class="gsearch-text-main">${l.ref}</div><div class="gsearch-text-sub">${l.borrower} · KES ${fmt(l.amount)} · ${l.status}</div></div>
    </div>`).join('');
  }
  if (borrowers.length) {
    html += `<div class="gsearch-group">Borrowers</div>`;
    html += borrowers.map(b => `<div class="gsearch-item" onclick="hideSearch();showView('borrowers');setTimeout(()=>openBorrowerDrawer('${b.ref}'),60)">
      <div class="gsearch-icon" style="background:var(--green-lt)">👤</div>
      <div><div class="gsearch-text-main">${b.name}</div><div class="gsearch-text-sub">${b.ref} · ${b.phone}</div></div>
    </div>`).join('');
  }
  if (apps.length) {
    html += `<div class="gsearch-group">Applications</div>`;
    html += apps.map(a => `<div class="gsearch-item" onclick="hideSearch();showView('applications');setTimeout(()=>openAppDrawer('${a.ref}'),60)">
      <div class="gsearch-icon" style="background:var(--purple-lt)">📋</div>
      <div><div class="gsearch-text-main">${a.ref}</div><div class="gsearch-text-sub">${a.borrower} · KES ${fmt(a.amount)}</div></div>
    </div>`).join('');
  }
  if (leads.length) {
    html += `<div class="gsearch-group">Leads</div>`;
    html += leads.map(l => `<div class="gsearch-item" onclick="hideSearch();showView('leads')">
      <div class="gsearch-icon" style="background:var(--amber-lt)">🎯</div>
      <div><div class="gsearch-text-main">${l.name}</div><div class="gsearch-text-sub">${l.biz} · ${l.status}</div></div>
    </div>`).join('');
  }
  if (!html) html = `<div class="gsearch-empty">No results for "<strong>${q}</strong>"</div>`;
  results.innerHTML = html;
  results.classList.add('open');
}

function hideSearch() {
  const results = document.getElementById('gsearch-results');
  const inp     = document.getElementById('gsearch-input');
  if (results) results.classList.remove('open');
  if (inp)     inp.value = '';
}

// ─── BULK ACTIONS (Applications) ───────────────────────────────────────────────

let _selectedApps = new Set();

function _refreshBulkBar() {
  const bar = document.getElementById('bulk-bar-apps');
  const cnt = document.getElementById('bulk-count-apps');
  if (!bar) return;
  if (_selectedApps.size > 0) {
    bar.classList.add('visible');
    cnt.textContent = `${_selectedApps.size} application${_selectedApps.size > 1 ? 's' : ''} selected`;
  } else {
    bar.classList.remove('visible');
  }
  const allChk = document.getElementById('chk-apps-all');
  if (allChk) {
    const visibleRefs = [...document.querySelectorAll('.app-row-chk')].map(c => c.dataset.ref);
    allChk.checked = visibleRefs.length > 0 && visibleRefs.every(r => _selectedApps.has(r));
    allChk.indeterminate = _selectedApps.size > 0 && !allChk.checked;
  }
}

function toggleSelectAllApps(el) {
  document.querySelectorAll('.app-row-chk').forEach(c => {
    c.checked = el.checked;
    if (el.checked) _selectedApps.add(c.dataset.ref);
    else            _selectedApps.delete(c.dataset.ref);
  });
  _refreshBulkBar();
}

function toggleAppRow(el) {
  if (el.checked) _selectedApps.add(el.dataset.ref);
  else            _selectedApps.delete(el.dataset.ref);
  _refreshBulkBar();
}

function bulkApproveApps() {
  if (!_selectedApps.size) return;
  const pending = [..._selectedApps].filter(ref => { const a = APPS.find(x => x.ref === ref); return a && a.status === 'Pending'; });
  if (!pending.length) { toast('No pending applications in selection', 'error'); return; }
  confirmAction(`Approve ${pending.length} pending application(s)?`, () => {
    pending.forEach(ref => { const a = APPS.find(x => x.ref === ref); if (a) a.status = 'Approved'; });
    _selectedApps.clear();
    saveData(); updateNavBadges(); renderApps();
    toast(`${pending.length} applications approved`, 'success');
  }, 'Approve All');
}

function bulkDeclineApps() {
  if (!_selectedApps.size) return;
  const pending = [..._selectedApps].filter(ref => { const a = APPS.find(x => x.ref === ref); return a && a.status === 'Pending'; });
  if (!pending.length) { toast('No pending applications in selection', 'error'); return; }
  confirmAction(`Decline ${pending.length} pending application(s)?`, () => {
    pending.forEach(ref => { const a = APPS.find(x => x.ref === ref); if (a) a.status = 'Rejected'; });
    _selectedApps.clear();
    saveData(); updateNavBadges(); renderApps();
    toast(`${pending.length} applications declined`, 'info');
  }, 'Decline All');
}

function bulkExportApps() {
  const rows = APPS.filter(a => _selectedApps.has(a.ref));
  if (!rows.length) { toast('No applications selected', 'error'); return; }
  const csv = ['Ref,Borrower,Amount,Rate,Product,Partner,Status,Applied',
    ...rows.map(a => [a.ref, a.borrower, a.amount, a.rate, a.product, a.partner, a.status, a.applied].join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'applications-export.csv'; a.click();
  toast(`Exported ${rows.length} applications`, 'success');
}

// ─── PRINT STATEMENT ───────────────────────────────────────────────────────────

function printStatement(loanRef) {
  if (!loanRef) { toast('No loan selected', 'error'); return; }
  const l = LOANS.find(x => x.ref === loanRef);
  if (!l) { toast('Loan not found', 'error'); return; }
  const b = BORROWERS.find(x => x.name === l.borrower);
  const payments = MPESA.filter(m => m.loanRef === loanRef);
  const ps = document.getElementById('print-statement');
  if (!ps) return;
  const today = new Date().toLocaleDateString('en-KE', { day: '2-digit', month: 'long', year: 'numeric' });
  ps.innerHTML = `
    <div class="stmt-actions no-print">
      <button class="btn btn-primary btn-sm" onclick="window.print()">🖨️ Print / Save PDF</button>
      <button class="btn btn-ghost btn-sm" onclick="closePrintStatement()">✕ Close</button>
    </div>
    <div class="stmt-header">
      <div>
        <div class="stmt-brand-name">CC CentyCapital LMS</div>
        <div class="stmt-doc-title">Loan Statement</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px;">Statement Date: ${today}</div>
      </div>
      <div style="text-align:right;font-size:12px;color:var(--text3);line-height:1.8;">
        <strong style="color:var(--text)">CentyCapital Ltd</strong><br>Nairobi, Kenya<br>
        Ref: ${l.ref}
      </div>
    </div>
    <div class="stmt-section">
      <h3>Borrower Information</h3>
      <div class="stmt-grid">
        <div class="stmt-item"><label>Full Name</label><div class="val">${l.borrower}</div></div>
        <div class="stmt-item"><label>Phone</label><div class="val">${b ? b.phone : '—'}</div></div>
        <div class="stmt-item"><label>KE Number</label><div class="val">${l.ke}</div></div>
        <div class="stmt-item"><label>National ID</label><div class="val">${b && b.natid ? b.natid : '—'}</div></div>
        <div class="stmt-item"><label>Location</label><div class="val">${b && b.location ? b.location : '—'}</div></div>
        <div class="stmt-item"><label>CentyCred Score</label><div class="val">${b ? b.score : '—'}</div></div>
      </div>
    </div>
    <div class="stmt-section">
      <h3>Loan Details</h3>
      <div class="stmt-grid">
        <div class="stmt-item"><label>Loan Reference</label><div class="val">${l.ref}</div></div>
        <div class="stmt-item"><label>Principal (KES)</label><div class="val">${fmt(l.amount)}</div></div>
        <div class="stmt-item"><label>Interest Rate</label><div class="val">${l.rate}</div></div>
        <div class="stmt-item"><label>Product</label><div class="val">${l.product}</div></div>
        <div class="stmt-item"><label>Disbursed On</label><div class="val">${l.disbursed}</div></div>
        <div class="stmt-item"><label>Due Date</label><div class="val">${l.due}</div></div>
        <div class="stmt-item"><label>Repayment (KES)</label><div class="val">${fmt(l.repayment)}</div></div>
        <div class="stmt-item"><label>Partner</label><div class="val">${l.partner}</div></div>
        <div class="stmt-item"><label>Status</label><div class="val">${l.status}</div></div>
      </div>
    </div>
    <div class="stmt-section">
      <h3>Payment History</h3>
      ${payments.length
        ? `<table class="stmt-table">
            <thead><tr><th>Date</th><th>M-Pesa Code</th><th>Amount (KES)</th><th>Mode</th><th>Status</th></tr></thead>
            <tbody>${payments.map(p => `<tr><td>${p.date}</td><td style="font-family:var(--mono)">${p.code}</td><td style="font-family:var(--mono)">${fmt(p.amount)}</td><td>${p.mode}</td><td>${p.status}</td></tr>`).join('')}</tbody>
          </table>`
        : '<p style="color:var(--text4);font-size:13px;">No M-Pesa payments recorded for this loan.</p>'}
    </div>
    <div class="stmt-footer">
      <span>This is a system-generated statement and does not require a physical signature.</span>
      <span>CentyCapital Ltd © ${new Date().getFullYear()}</span>
    </div>`;
  ps.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePrintStatement() {
  const ps = document.getElementById('print-statement');
  if (ps) { ps.classList.remove('open'); ps.innerHTML = ''; }
  document.body.style.overflow = '';
}

// ─── REPORTS ───────────────────────────────────────────────────────────────────

let reportsTab = 'par';

function setReportsTab(tab, el) {
  reportsTab = tab;
  document.querySelectorAll('#view-reports .tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  ['par', 'disbursement', 'collection'].forEach(t => {
    const p = document.getElementById('rpt-panel-' + t);
    if (p) p.style.display = (t === tab) ? '' : 'none';
  });
  _renderReportTab(tab);
}

function renderReports() {
  const activeTab = document.querySelector(`#view-reports .tab[data-tab="${reportsTab}"]`);
  setReportsTab(reportsTab, activeTab);
  animateCounters('reports');
}

function _renderReportTab(tab) {
  if (tab === 'par')          _renderParReport();
  else if (tab === 'disbursement') _renderDisbursementReport();
  else if (tab === 'collection')   _renderCollectionReport();
}

function _renderParReport() {
  const sess = getSession();
  const LO = scopeByTenant(LOANS, sess);
  const bookLoans = LO.filter(l => ['Active','Due','Overdue'].includes(l.status));
  const totalBook = bookLoans.reduce((s, l) => s + l.amount, 0);
  const overdueL  = LO.filter(l => l.status === 'Overdue' || l.status === 'Due');
  const parAmt    = overdueL.reduce((s, l) => s + l.amount, 0);
  const parPct    = totalBook ? ((parAmt / totalBook) * 100).toFixed(1) : '0.0';
  const _s = id => { const e = document.getElementById(id); if(e) return e; return {textContent:''}; };
  _s('rpt-par-book').textContent    = 'KES ' + fmt(totalBook);
  _s('rpt-par-at-risk').textContent = 'KES ' + fmt(parAmt);
  _s('rpt-par-pct').textContent     = parPct + '%';
  _s('rpt-par-count').textContent   = overdueL.length;
  const tbody = document.getElementById('rpt-par-body');
  if (!tbody) return;
  tbody.innerHTML = overdueL.length ? overdueL.map(l => {
    const dueDate  = l.due ? new Date(l.due.split('/').reverse().join('-')) : new Date();
    const daysOver = Math.max(0, Math.floor((Date.now() - dueDate) / 86400000));
    const bucket   = daysOver <= 7 ? '1-7 days' : daysOver <= 30 ? '8-30 days' : '30+ days';
    const color    = daysOver <= 7 ? 'amber' : 'rose';
    return `<tr>
      <td class="mono">${l.ref}</td>
      <td class="name link-cell" onclick="showView('loans');setTimeout(()=>openLoanDrawer('${l.ref}'),60)">${l.borrower}</td>
      <td class="mono">${fmt(l.amount)}</td><td class="mono">${fmt(l.repayment)}</td>
      <td><span class="badge ${color}">${bucket} · ${daysOver}d</span></td>
      <td>${statusBadge(l.status)}</td>
      <td><button class="btn btn-primary btn-xs" onclick="toast('SMS reminder sent to ${l.borrower}','success')">📤 SMS</button></td>
    </tr>`;
  }).join('') : '<tr class="empty-row"><td colspan="7"><div class="empty-state"><div class="empty-state-icon">✅</div><div class="empty-state-text">No overdue loans — portfolio is healthy!</div></div></td></tr>';
}

function _renderDisbursementReport() {
  const sess = getSession();
  const LO = scopeByTenant(LOANS, sess);
  const monthly = {};
  LO.forEach(l => {
    if (!l.disbursed) return;
    const parts = l.disbursed.split('/');
    if (parts.length < 3) return;
    const key = parts[1] + '/' + parts[2];
    if (!monthly[key]) monthly[key] = { count: 0, amount: 0 };
    monthly[key].count++;
    monthly[key].amount += l.amount;
  });
  const rows = Object.entries(monthly).sort((a, b) => {
    const [am, ay] = a[0].split('/'); const [bm, by] = b[0].split('/');
    return new Date(+by, +bm - 1) - new Date(+ay, +am - 1);
  });
  const totalDisb = LO.reduce((s, l) => s + l.amount, 0);
  const _s = id => { const e = document.getElementById(id); if(e) return e; return {textContent:''}; };
  _s('rpt-disb-total').textContent = 'KES ' + fmt(totalDisb);
  _s('rpt-disb-count').textContent = LO.length;
  _s('rpt-disb-avg').textContent   = LO.length ? 'KES ' + fmt(Math.round(totalDisb / LO.length)) : '—';
  _s('rpt-disb-prods').textContent = scopeByTenant(PRODUCTS, sess).filter(p => p.status === 'Active').length;
  const tbody = document.getElementById('rpt-disb-body');
  if (!tbody) return;
  tbody.innerHTML = rows.map(([month, d]) => {
    const [m, y] = month.split('/');
    const label  = new Date(+y, +m - 1).toLocaleString('en-KE', { month: 'long', year: 'numeric' });
    const pct    = totalDisb ? Math.round(d.amount / totalDisb * 100) : 0;
    return `<tr>
      <td>${label}</td><td class="mono">${d.count}</td>
      <td class="mono">${fmt(d.amount)}</td>
      <td class="mono">${fmt(Math.round(d.amount / d.count))}</td>
      <td><div class="hbar-track" style="height:6px;width:100px"><div class="hbar-fill" style="width:${pct}%;background:var(--green)"></div></div></td>
    </tr>`;
  }).join('') || '<tr class="empty-row"><td colspan="5">No disbursements recorded.</td></tr>';
}

function _renderCollectionReport() {
  const sess = getSession();
  const LO = scopeByTenant(LOANS, sess);
  const MP = scopeByTenant(MPESA, sess);
  const totalDue  = LO.filter(l => ['Active','Due','Overdue','Repaid'].includes(l.status)).reduce((s, l) => s + l.repayment, 0);
  const collected = MP.reduce((s, m) => s + m.amount, 0);
  const rate      = totalDue ? ((collected / totalDue) * 100).toFixed(1) : '0.0';
  const gap       = Math.max(0, totalDue - collected);
  const _s = id => { const e = document.getElementById(id); if(e) return e; return {textContent:''}; };
  _s('rpt-coll-due').textContent       = 'KES ' + fmt(Math.round(totalDue));
  _s('rpt-coll-collected').textContent = 'KES ' + fmt(Math.round(collected));
  _s('rpt-coll-rate').textContent      = rate + '%';
  _s('rpt-coll-gap').textContent       = 'KES ' + fmt(Math.round(gap));
  const tbody = document.getElementById('rpt-coll-body');
  if (!tbody) return;
  tbody.innerHTML = MP.slice(0, 25).map(m => `<tr>
    <td class="mono" style="font-size:var(--t-small)">${m.date || m.created || '—'}</td>
    <td class="mono">${m.phone}</td><td class="mono">${fmt(m.amount)}</td>
    <td class="mono">${m.code}</td><td class="mono">${m.loanRef || '—'}</td>
    <td>${statusBadge(m.completed ? 'Completed' : 'Pending')}</td>
  </tr>`).join('') || '<tr class="empty-row"><td colspan="6">No payments recorded.</td></tr>';
}

// ─── DATA PERSISTENCE ──────────────────────────────────────────────────────────

const STORAGE_KEY = 'cc_lms_v2';

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      LEADS, APPS, LOANS, BORROWERS, PRODUCTS, KYC_DOCS,
      SMS_TEMPLATES, SMS_SCHEDULED, SMS_SENT, DMS_HISTORY,
      NOTIFICATIONS,
      LOAN_COMMENTS_DATA: {...LOAN_COMMENTS},
      LOAN_PTPS_DATA: {...LOAN_PTPS},
    }));
  } catch(e) { /* quota exceeded or private browsing */ }
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    if (d.LEADS)         LEADS         = d.LEADS;
    if (d.APPS)          APPS          = d.APPS;
    if (d.LOANS)         LOANS         = d.LOANS;
    if (d.BORROWERS)     BORROWERS     = d.BORROWERS;
    if (d.PRODUCTS)      PRODUCTS      = d.PRODUCTS;
    if (d.KYC_DOCS)      KYC_DOCS      = d.KYC_DOCS;
    if (d.SMS_TEMPLATES) SMS_TEMPLATES = d.SMS_TEMPLATES;
    if (d.SMS_SCHEDULED) SMS_SCHEDULED = d.SMS_SCHEDULED;
    if (d.SMS_SENT)      SMS_SENT      = d.SMS_SENT;
    if (d.DMS_HISTORY)   DMS_HISTORY   = d.DMS_HISTORY;
    if (d.NOTIFICATIONS) NOTIFICATIONS = d.NOTIFICATIONS;
    if (d.LOAN_COMMENTS_DATA) {
      Object.keys(LOAN_COMMENTS).forEach(k => delete LOAN_COMMENTS[k]);
      Object.assign(LOAN_COMMENTS, d.LOAN_COMMENTS_DATA);
    }
    if (d.LOAN_PTPS_DATA) {
      Object.keys(LOAN_PTPS).forEach(k => delete LOAN_PTPS[k]);
      Object.assign(LOAN_PTPS, d.LOAN_PTPS_DATA);
    }
    return true;
  } catch(e) { return false; }
}

function resetAllData() {
  confirmAction(
    'Reset all data to factory defaults?<br><small style="color:var(--text3)">Any leads, loans, or changes made this session will be permanently lost.</small>',
    () => { localStorage.removeItem(STORAGE_KEY); location.reload(); },
    'Reset to Demo Data'
  );
}

// ─── THEME ─────────────────────────────────────────────────────────────────────

function applyTheme() {
  const saved = localStorage.getItem('cc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  _updateThemeBtn(saved);
}

function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('cc_theme', next);
  _updateThemeBtn(next);
}

function _updateThemeBtn(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ─── MOBILE SIDEBAR ────────────────────────────────────────────────────────────

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobile-overlay').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobile-overlay').classList.remove('open');
}

// ─── COUNTER ANIMATION ─────────────────────────────────────────────────────────

function animateCounters(viewId) {
  const view = document.getElementById('view-' + viewId);
  if (!view) return;
  view.querySelectorAll('.kpi-value').forEach(el => {
    const text = el.textContent.trim();
    const m = text.match(/^([^0-9\-]*)(\d[\d,]*)(.*)$/);
    if (!m) return;
    const prefix = m[1], rawNum = m[2].replace(/,/g,''), suffix = m[3];
    const target = parseInt(rawNum, 10);
    if (isNaN(target) || target < 2) return;
    const dur = 700, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = prefix + Math.round(e * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    };
    el.textContent = prefix + '0' + suffix;
    requestAnimationFrame(tick);
  });
}

// ─── INIT ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded',()=>{
  // Modal click-outside close
  document.querySelectorAll('.modal-overlay').forEach(m=>{
    m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');});
  });

  // Restore persisted data, apply theme, then gate with auth
  loadData();
  enforceTenantMigration();
  applyTheme();
  checkAuth();
  applyAuthUi();

  // Init
  updateNavBadges();
  updateNotifBadge();
  const hash=location.hash.slice(1);
  let initView = VIEWS.includes(hash) ? hash : getDefaultViewForRole(getSession());
  if (getSession() && !canAccessView(initView, getSession())) initView = getDefaultViewForRole(getSession());
  showView(initView);

  // ESC key
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      const ps=document.getElementById('print-statement');
      if(ps&&ps.classList.contains('open')){closePrintStatement();return;}
      const om=document.querySelector('.modal-overlay.open');
      if(om){om.classList.remove('open');return;}
      ['borrower','loan','app'].forEach(name=>{
        const d=document.getElementById(name+'-drawer');
        if(d&&d.classList.contains('open')) closeDrawer(name);
      });
      if(notifOpen){notifOpen=false;document.getElementById('notif-panel').classList.remove('open');}
      hideSearch();
    }
    if(e.key==='Enter' && document.activeElement && document.activeElement.id==='login-pwd'){
      login();
    }
  });

  // Close global search on outside click
  document.addEventListener('click',e=>{
    const wrap=document.getElementById('gsearch-wrap');
    if(wrap && !wrap.contains(e.target)) hideSearch();
  });

  // Outside click closes notification panel
  document.addEventListener('click',e=>{
    if(notifOpen&&!e.target.closest('.notif-wrapper')){
      notifOpen=false;
      const p=document.getElementById('notif-panel');
      if(p)p.classList.remove('open');
    }
  });

  // Hash routing
  window.addEventListener('hashchange',()=>{
    const v=location.hash.slice(1);
    if(VIEWS.includes(v)) showView(v);
  });
});
