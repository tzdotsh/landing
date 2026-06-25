export type LegalDocument = {
  id: number;
  title: string;
  description: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export const HARDCODED_LEGAL_SLUGS = [
  "terms-service",
  "privacy-policy",
  "report",
] as const;

export type HardcodedLegalSlug = (typeof HARDCODED_LEGAL_SLUGS)[number];

export const LEGAL_PAGE_SLUGS = ["terms-service", "privacy-policy"] as const;

export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

export function isLegalPageSlug(slug: string): slug is LegalPageSlug {
  return (LEGAL_PAGE_SLUGS as readonly string[]).includes(slug);
}

const LEGAL_UPDATED_AT = "2026-06-25T00:00:00.000Z";

const TERMS_SERVICE_MARKDOWN = `## 1. Service Provision

Maxco undertakes to provide access to IPTV channels from the country for which you have specifically purchased a subscription. Please be advised that the quality, availability, and functionality of channels from other countries cannot be guaranteed. Channel quality refers to clear video and audio transmission, availability denotes 99% uptime accessibility, and functionality indicates operational status without technical interruptions.

## 2. Jurisdiction and Governing Law

Although our services may be marketed within the European Union (EU), Maxco is incorporated outside the EU and operates in accordance with the laws of our jurisdiction of incorporation. This Agreement shall be governed by and construed in accordance with the laws of our country of registration, without regard to conflict of law principles. Although our services may be marketed, sold, or accessible within the European Union (EU) and to EU residents, our company is registered and operates outside the EU jurisdiction. We explicitly do not comply with EU consumer protection laws, EU data protection regulations (including GDPR in matters beyond basic data privacy), EU distance selling regulations, EU cooling-off periods, or any other EU-specific legal requirements regarding our services, refund policies, or terms of service. This agreement and all disputes arising from it are governed exclusively by the laws of our company's country of registration. EU residents who purchase our services acknowledge and accept that they are contracting with a non-EU entity and that EU consumer protection laws do not apply to this agreement. By purchasing our services as an EU resident, you explicitly waive any rights you may have under EU law that conflict with the terms of this agreement.

## 3. Refund Policy

Refunds are processed at our sole discretion, contingent upon the establishment of a valid claim. Refunds are not automatically granted for service issues and are not guaranteed under any circumstances. All approved refunds shall be processed exclusively in cryptocurrency. By purchasing or renewing our services, you expressly consent to this refund policy and acknowledge that alternative refund methods are not available. Our money-back guarantee, as advertised on our website, is subject to the comprehensive refund policy outlined herein and throughout this Agreement. The following circumstances are generally deemed ineligible for refund consideration:

- Absence of specific channels
- Inaccurate channel content
- Issues with Full HD (FHD) or 4K video quality
- Problems with the Video On Demand (VOD) library
- Temporary buffering or service interruptions
- Electronic Program Guide (EPG) inaccuracies
- Technical setup difficulties
- Internet Service Provider (ISP) blocking
- Incompatible devices or platforms
- Network-related slow internet speeds
- Subscription renewals

**Important Note:** Our VOD library is provided as a complimentary service and does not constitute grounds for refund eligibility. All refund requests must be submitted within a maximum of 30 days from the date of your initial purchase, depending on your subscription plan. Refund requests submitted after this period will not be considered under any circumstances. This time limit applies regardless of the nature of the issue or complaint. The 30-day period begins on the date of your initial purchase only, not from the date you first experience or report an issue. Please note that subscription renewals are not eligible for refunds under any circumstances. To be eligible for a refund based on technical issues, you must provide documented proof demonstrating that:

- The technical issue originates 100% from our service infrastructure and not from your device, internet connection, ISP, or local network configuration
- You have opened a support ticket and worked with our support team to attempt resolution
- The issue has remained unresolved for a minimum of 30 days from the date of your first support ticket
- You have followed all troubleshooting steps and recommendations provided by our support team

Acceptable documentation includes screenshots, error logs, speed test results, and detailed descriptions with timestamps. Failure to provide adequate proof will result in automatic denial of the refund request. Our support team's determination of the issue's origin is final and at our sole discretion. In addition to the refund exclusions outlined above, the following circumstances also disqualify you from receiving any refund:

- **Trial Users:** If you have previously received and used a free trial of our services, you are not eligible for a refund under our money-back guarantee. By proceeding with a paid subscription after a trial, you confirm that you have tested the service and found it satisfactory.
- **Returning Customers:** If you have previously purchased, subscribed to, or held an account with our services at any time in the past, you are not eligible for a refund. The money-back guarantee is available only to first-time customers who have never previously subscribed.
- **Subscription Renewals:** Any subscription renewal, whether automatic or manual, is strictly non-refundable under all circumstances. By renewing your subscription, you acknowledge that you have already experienced our services during your previous subscription period and are satisfied with the service quality. Renewals are considered a continuation of service and are therefore excluded from our money-back guarantee and refund policy. This applies regardless of any technical issues, content changes, or service modifications that may occur after renewal.
- **Cryptocurrency Refund Policy:** All refunds, when approved at our sole discretion, will be processed exclusively in cryptocurrency. We do not process refunds through any other payment method, including credit cards, bank transfers, or payment processors. The refund amount will be calculated in the cryptocurrency's current market value at the time of processing and will be reduced by all applicable transaction fees, blockchain network fees, and a management processing fee of 15% to cover administrative costs. By purchasing our services, you explicitly agree to this cryptocurrency-only refund policy.

## 4. Reseller Credits

Credits acquired for reselling purposes are strictly non-refundable.

## 5. Additional Services

Supplementary services or add-ons to your subscription are non-refundable.

## 6. Legal Compliance

As a subscriber, you are solely responsible for ensuring compliance of our service with local laws and regulations in your jurisdiction. You bear full legal responsibility for any consequences arising from your use of our service.

## 7. Service Usage and Restrictions

Sharing of service access with third parties is expressly prohibited. The service is licensed for personal use exclusively within your household or on your personal mobile device. Access sharing includes but is not limited to credential distribution or concurrent multiple logins. Violation of this provision may result in immediate permanent account suspension. Extra connections purchased as add-ons to your subscription are strictly intended for personal use within your immediate household only. These additional connections must not be shared with, sold to, or provided to any third party outside your household. Each extra connection is meant to allow you to watch on multiple devices simultaneously within your own home or on your personal mobile devices. If we detect that extra connections are being shared with others, used for commercial purposes, or distributed in any manner, your account and all associated connections will be permanently suspended immediately without any right to refund, including refund of the base subscription or any paid add-ons. This is a zero-tolerance policy. Our services are licensed exclusively for personal, non-commercial use within your private residence. You are strictly prohibited from using our services in any commercial setting, including but not limited to: bars, restaurants, hotels, waiting rooms, retail establishments, offices, or any public or commercial venue. Commercial use of personal subscriptions constitutes a material breach of this agreement and will result in immediate account termination without refund. If you wish to use our services in a commercial setting, you must contact us to discuss commercial licensing options, which are subject to different terms and pricing. While we permit the use of VPN (Virtual Private Network) services, you must ensure that your VPN connection is set to the same country in which you reside and for which you have purchased your subscription. Using a VPN to access content from countries other than your country of residence is strictly prohibited and constitutes a violation of geographic licensing restrictions. If we detect that you are using VPN services to circumvent geographic restrictions and access unauthorized content, your account will be subject to immediate suspension. We reserve the right to block VPN traffic from known VPN providers or IP ranges if necessary to comply with our content licensing obligations. ISP blocking circumvention using VPNs within your own country is permitted as outlined in Section 8. Our services are NOT sold, offered, or available to residents, citizens, or individuals physically located in the United States of America (USA), Canada, or Italy. We do not provide IPTV services to these countries under any circumstances. We actively block all traffic originating from IP addresses located in the USA, Canada, and Italy. If you are located in, residing in, or are a citizen of any of these countries, you are strictly prohibited from purchasing, subscribing to, or using our services. Any attempt to bypass these geographic restrictions using VPNs, proxies, or any other means to mask your true location is a material breach of this agreement and will result in immediate and permanent account termination without refund. If we discover that you have provided false information regarding your location or have circumvented our geographic blocking measures, your account will be suspended immediately and all payments will be forfeited. By purchasing our services, you represent and warrant that you are not located in, residing in, or a citizen of the USA, Canada, or Italy. We reserve the right to expand this list of prohibited countries at any time without prior notice. Purchases made from prohibited countries will not be honored and no refunds will be issued.

## 8. Account Management and Service Interruptions

Maxco reserves the right to suspend or terminate your account without prior notice for violations of these Terms, disrespectful conduct toward our staff, service redistribution, or any behavior deemed detrimental to our operations, reputation, or service integrity at our sole discretion. Internet Service Providers (ISPs) in various jurisdictions may implement content blocking measures to protect copyrighted material. Maxco has no control over ISP actions and assumes no responsibility for service disruptions caused by such blocking. ISP blocking may be dynamic and triggered by specific events such as major sporting competitions. Users are responsible for implementing appropriate circumvention measures, including VPN usage, proxy services, or ISP changes. Service interruptions due to ISP blocking are not eligible for refunds and fall outside our money-back guarantee coverage.

## 9. Chargeback and Payment Disputes

If you initiate a chargeback or payment dispute with your payment provider after receiving and using our services, your account will be immediately and permanently terminated. Furthermore, you will be permanently banned from purchasing any services from us in the future. All chargebacks are considered fraudulent use of our services and will be treated as a violation of this agreement. We reserve the right to pursue legal action and report fraudulent chargebacks to relevant authorities and fraud prevention databases.

## 10. Account Security

While you may purchase multiple subscriptions for legitimate personal use, you are strictly prohibited from creating or managing multiple accounts for the purpose of reselling our services unless you are explicitly authorized by us as an official reseller. Any attempt to resell services through unauthorized multiple accounts will result in the immediate and permanent suspension of all accounts associated with you, without notice and without refund. We employ sophisticated detection systems to identify patterns of unauthorized reselling activity. Authorized resellers must register through our official reseller program and comply with separate reseller terms and conditions. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If we detect unauthorized access to your account, we will issue a warning and reset your account credentials as a security measure. However, if multiple instances of unauthorized access are detected, or if we determine that you have negligently shared your credentials or failed to maintain adequate security, your account may be permanently suspended without refund. You must notify us immediately of any suspected unauthorized use of your account. You agree that you are responsible for any and all activities conducted through your account, whether authorized by you or not, until you have notified us of the security breach. If your account credentials (username, password, or access details) are found to be leaked, published, or shared publicly on the internet, including but not limited to credential sharing websites, forums, social media, public databases, or any other public platforms, your account will be immediately and permanently suspended without any right to refund. This is a zero-tolerance policy designed to protect our service infrastructure and other users. You are solely and entirely responsible for protecting your IPTV access credentials and ensuring they remain private and secure. Leaked credentials pose a serious security threat to our systems and can lead to service abuse, unauthorized access, and degraded service quality for legitimate users. We actively monitor public sources for leaked credentials and will take immediate action upon discovery. Claiming that your credentials were leaked without your knowledge or consent does not exempt you from this policy. It is your responsibility to use strong passwords, avoid sharing credentials, and take all necessary precautions to prevent credential exposure.

## 11. Force Majeure

We shall not be held liable for any failure or delay in performing our obligations under this agreement if such failure or delay is due to circumstances beyond our reasonable control, including but not limited to: acts of God, natural disasters, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, pandemics, strikes, or shortages of transportation, facilities, fuel, energy, labor, or materials. This also includes cyberattacks, distributed denial-of-service (DDoS) attacks, server infrastructure failures, third-party hosting provider outages, internet backbone failures, content provider disruptions, or any other technical infrastructure events beyond our control. In such events, our performance obligations will be suspended for the duration of the force majeure event, and we will not be obligated to provide refunds, credits, or compensation for service interruptions caused by force majeure events.

## 12. Severability

If any provision of this Agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be deemed severed from this Agreement, and the remaining provisions shall continue in full force and effect to the maximum extent permitted by law. The invalid, illegal, or unenforceable provision shall be replaced with a valid, legal, and enforceable provision that most closely reflects the original intent of the parties. The invalidity of any provision in one jurisdiction shall not affect the validity or enforceability of such provision in any other jurisdiction.

## 13. Content Availability and Service Modifications

While we strive to maintain a comprehensive library of channels and content, we make no guarantees regarding the continued availability of any specific channel, program, movie, series, or content item. Content availability is subject to change at any time without prior notice due to factors including but not limited to: licensing agreements, content provider decisions, geographic restrictions, technical limitations, or business decisions. We reserve the right to add, remove, modify, or replace any content or channels from our service at our sole discretion. Changes to content availability, channel lineup, quality, or features does not constitute grounds for refund and are not covered by our money-back guarantee. You acknowledge that the IPTV industry is dynamic and that content offerings may vary over time. By subscribing, you accept that the service you receive may differ from the service advertised at the time of your purchase.

## 14. Copyright, DMCA, and Content Removal Requests

We operate as a content aggregator and do not host, store, or transmit any video content, streams, or media files on our servers. Our service functions solely as a directory or index that aggregates and organizes publicly available streaming links and channels from third-party sources on the internet. We do not own, control, or have any affiliation with the content providers or the sources of the streams listed in our service. All content is streamed directly from third-party servers and sources that are beyond our control.

If you are a copyright owner or an authorized representative of a copyright owner and believe that any channel, stream, or content listed in our service infringes upon your copyright or intellectual property rights, you may submit a formal removal request to us. We will review legitimate copyright claims and, at our sole discretion, may remove the allegedly infringing content from our channel list.

To submit a copyright infringement or DMCA takedown request, please send a detailed notice to: complains@maxco.one

Your notice must include the following information:

- Identification of the copyrighted work claimed to have been infringed, including the title, copyright registration number (if applicable), and sufficient detail to identify the work
- Identification of the specific channel, stream, or content in our service that you claim is infringing, including the channel name and any identifying details
- Your contact information, including full name, address, telephone number, and email address
- A statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law
- A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on behalf of the copyright owner
- Your physical or electronic signature

Please note that we are not liable for any copyright infringement committed by third-party content providers or streaming sources. We do not monitor, verify, or control the content of streams listed in our directory. Submitting a removal request does not guarantee removal, and we reserve the right to assess each request on a case-by-case basis. False or fraudulent DMCA claims may result in legal consequences. This section does not constitute an admission of liability or jurisdiction under the Digital Millennium Copyright Act (DMCA) or any other copyright law.

## 15. Promotion Abuse

Promotional offers are strictly limited to one use per customer and per account, applicable only for the initial year of service. Any customer found to be exploiting promotions by creating or maintaining multiple accounts to receive multiple discounted prices will have all associated services immediately suspended. These services will remain suspended until the customer pays the full price difference between the promotional rate and the standard renewal rate for the additional subscriptions. Furthermore, customers who intentionally purchase a new account using a promotion instead of renewing their existing subscription to circumvent the standard renewal pricing and abuse the promotional offer may also have their services suspended. We reserve the right to determine, at our sole discretion, whether a customer's actions constitute promotion abuse.

By subscribing to our services, you acknowledge and agree to these terms and conditions. If you do not agree with these terms, we kindly request that you refrain from subscribing to our services.

---

**Last updated:** June 25, 2026`;

const PRIVACY_POLICY_MARKDOWN = `This Privacy Policy ("Policy") stipulates the terms under which Maxco ("we", "us" or "our") respect and maintain your ("User", "you" or "your") privacy while you utilize our IPTV services. This Policy explains the data we collect, its use, and how we guarantee your anonymity.

## 1. Minimal Data Collection

We are committed to respecting your privacy and strive to minimize our data footprint. The only personal information we collect is your email address and country for the purpose of delivering our services, communicating important information, and providing customer support.

## 2. Non-Collection of Other Personal Data

Aside from your email and country, no other personal information is collected. Any additional data received in the course of providing our service is immediately and irreversibly destroyed, in accordance with our strong commitment to maintaining your anonymity.

## 3. Use of Personal Information

We use your email to communicate with you about your subscription, respond to your inquiries, and send you service updates. Your country information helps us optimize our services for your location. We do not use your personal information for any other purposes.

## 4. Disclosure of Personal Information

We don't sell, rent, or share your personal information with any third parties. We will disclose your personal information only if mandated by law or if such disclosure is necessary to adhere to legal processes served on us or to protect and defend our rights or property.

## 5. Protection of Personal Information

We utilize strong security measures, including encryption, to safeguard your personal data. However, we acknowledge that no method of transmission over the internet or electronic storage method is 100% secure. We strive to protect your personal information, but we cannot guarantee absolute security.

## 6. Access and Deletion of Personal Information

You may request access to your personal information that we hold. If you wish to delete your information from our records, you may request us to do so, and we will take reasonable steps to comply with this request, in line with our commitment to uphold your anonymity.

## 7. Absence of Cookies and Tracking Technologies

To maintain the highest level of anonymity, our website does not use cookies or other similar tracking technologies.

## 8. Policy Updates

We may amend this Privacy Policy periodically. If we do, we will update the last revised date at the bottom of this policy. We encourage you to review this Policy from time to time to stay informed about our commitment to your privacy.

---

**Last updated:** June 25, 2026`;

const REPORT_DISCLAIMER_MARKDOWN = `### About This Form

Use this form to report copyright infringement or other abuse relating to channels listed in the Maxco service directory. Maxco operates as a content aggregator and does not host, store, or transmit video content, streams, or media files on our servers. Our service functions solely as a directory that organizes publicly available streaming links from third-party sources.

### Before You Submit

Please provide complete and accurate information in every required field. Reports that are incomplete, misleading, or submitted in bad faith may be rejected without review. False or fraudulent copyright claims may have legal consequences.

Your report should identify the copyrighted work, the specific channel(s) involved, and evidence that you own or are authorized to act on behalf of the rights holder.

### What Happens Next

We review legitimate reports and may remove allegedly infringing channels from our directory at our sole discretion. Submitting a report does not guarantee removal, and we are not liable for content streamed from third-party sources outside our control.

You may also send formal copyright or DMCA notices directly to **complains@maxco.one**.`;

const HARDCODED_LEGAL: Record<HardcodedLegalSlug, Omit<LegalDocument, "id">> = {
  "terms-service": {
    title: "Terms of Service",
    description:
      "Terms and conditions governing Maxco IPTV subscriptions, refunds, account use, and service policies.",
    slug: "terms-service",
    content: TERMS_SERVICE_MARKDOWN,
    createdAt: LEGAL_UPDATED_AT,
    updatedAt: LEGAL_UPDATED_AT,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    description:
      "How Maxco collects, uses, and protects your personal information when you use our IPTV services.",
    slug: "privacy-policy",
    content: PRIVACY_POLICY_MARKDOWN,
    createdAt: LEGAL_UPDATED_AT,
    updatedAt: LEGAL_UPDATED_AT,
  },
  report: {
    title: "Abuse Report",
    description:
      "Submit a copyright or abuse report relating to channels listed in the Maxco service directory.",
    slug: "report",
    content: REPORT_DISCLAIMER_MARKDOWN,
    createdAt: LEGAL_UPDATED_AT,
    updatedAt: LEGAL_UPDATED_AT,
  },
};

export function isHardcodedLegalSlug(
  slug: string,
): slug is HardcodedLegalSlug {
  return (HARDCODED_LEGAL_SLUGS as readonly string[]).includes(slug);
}

export function getHardcodedLegalDocument(
  slug: string,
  _locale: "en" | "es",
): LegalDocument | null {
  if (!isHardcodedLegalSlug(slug)) {
    return null;
  }

  const doc = HARDCODED_LEGAL[slug];

  return {
    id: 0,
    ...doc,
  };
}
