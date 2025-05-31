import React from "react";

const PrivacyPolicy: React.FC = () => {
  // CSS-in-JS for sizing/layout only (no colors)
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      lineHeight: 1.6 as number,
    },
    heading: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
    sectionHeading: {
      fontSize: "1.5rem",
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    paragraph: {
      marginBottom: "1rem",
    },
    list: {
      marginBottom: "1rem",
      paddingLeft: "1.5rem",
    },
    nestedList: {
      listStyleType: "disc" as const,
      marginLeft: "1rem",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.paragraph}>
        <strong>Last updated:</strong> May 31, 2025
      </p>

      <p style={styles.paragraph}>
        Welcome to ManoMed Ai. This Privacy Policy describes how we collect, use, disclose,
        and safeguard your information when you visit our website <strong>manomedai.com</strong> and use our medical
        questionnaire service within the <strong>ManoMed Ai application</strong>. By using the Service, you consent
        to the collection, use, and disclosure of your information as described in this Privacy Policy.
      </p>

      <h2 style={styles.sectionHeading}>1. Information We Collect</h2>
      <p style={styles.paragraph}>
        When you access and use our Service, we collect the following types of information:
      </p>
      <ul style={styles.list}>
        <li>
          <strong>Personal Identifiers and Contact Information.</strong>
          <ul style={styles.nestedList}>
            <li>Name</li>
            <li>Email address</li>
          </ul>
        </li>
        <li>
          <strong>Demographic Details.</strong>
          <ul style={styles.nestedList}>
            <li>Age</li>
            <li>Gender</li>
          </ul>
        </li>
        <li>
          <strong>Medical and Health Information.</strong>
          <ul style={styles.nestedList}>
            <li>Symptoms</li>
            <li>Medical history</li>
            <li>Answers to each questionnaire question</li>
          </ul>
        </li>
        <li>
          <strong>Generated Report Data.</strong>
          <ul style={styles.nestedList}>
            <li>Provisional diagnoses or expected illnesses resulting from your answers</li>
          </ul>
        </li>
      </ul>

      <h2 style={styles.sectionHeading}>2. How We Use Your Information</h2>
      <ul style={styles.list}>
        <li>
          <strong>Generating Medical Reports.</strong><br />
          To analyze your questionnaire answers and medical history in order to generate a provisional medical report outlining potential illnesses.
        </li>
        <li>
          <strong>Delivery of Reports.</strong><br />
          When you click “Download Report,” a copy of the generated report is sent to you and a copy is sent to the owner of ManoMed Ai (sole operator).
        </li>
        <li>
          <strong>Improving Our Service.</strong><br />
          To review aggregate trends (e.g., most common symptoms entered) so we can refine our question logic and deliver more accurate assessments in the future.
        </li>
        <li>
          <strong>Communications.</strong><br />
          To respond to your questions or concerns if you contact us via email.
        </li>
        <li>
          <strong>Compliance and Safety.</strong><br />
          To comply with applicable laws, regulations, or legal processes, and to protect the rights, property, or safety of ourselves or others.
        </li>
      </ul>

      <h2 style={styles.sectionHeading}>3. How We Share Your Information</h2>
      <ul style={styles.list}>
        <li>
          <strong>With the Owner.</strong><br />
          When you request a report, a copy of your responses and the generated medical report is sent to the owner of Medical Analysis Systems so that they can review or follow up if needed.
        </li>
        <li>
          <strong>Compliance with Laws.</strong><br />
          If required by law, regulation, or legal process, we may disclose your information to relevant authorities.
        </li>
        <li>
          <strong>Business Transfers.</strong><br />
          If Medical Analysis Systems is involved in a merger, acquisition, bankruptcy, reorganization, or sale of assets, your information may be transferred to a successor entity. The successor entity will be required to honor this Privacy Policy.
        </li>
      </ul>

      <h2 style={styles.sectionHeading}>4. How We Use Your Information (Platform Enhancement & Reflective Storage)</h2>
      <p style={styles.paragraph}>
        The information you provide through your interaction with the ManoMed Ai application is utilized solely to enhance the
        accuracy, relevance, and personalization of your diagnostic experience. When you opt to receive a generated report —
        typically by engaging the “Download Report” functionality — a derivative, non-identifiable copy of the analytical outcome
        may be securely mirrored to our internal systems for quality assurance, future algorithmic refinement, and service
        continuity purposes.
      </p>
      <p style={styles.paragraph}>
        This reflective storage is implemented in accordance with principles of data minimization and is not employed for any
        direct identification or unsolicited contact. Rather, it serves to reinforce the integrity and robustness of our
        health-tech infrastructure. We neither engage in commercial redistribution of personal data nor permit access to
        unauthorized third parties.
      </p>
      <p style={styles.paragraph}>
        In lay terms, your data is treated with the utmost discretion — utilized strictly in the context of platform improvement
        and safeguarded through procedural, organizational, and technical measures.
      </p>
      <p style={styles.paragraph}>
        All information transmitted between your device and our servers is protected using industry-standard SSL/TLS encryption.
      </p>

      <h2 style={styles.sectionHeading}>5. Children’s Privacy</h2>
      <p style={styles.paragraph}>
        Our Service is intended for general audiences and is not directed to children under the age of 13. We do not knowingly
        collect personally identifiable information from children under 13. If we become aware that a child under 13 has provided
        us with personal information, we will delete such data as quickly as possible. If you believe a child under 13 may have
        provided us with information, please contact us via email.
      </p>

      <h2 style={styles.sectionHeading}>6. Third-Party Services</h2>
      <p style={styles.paragraph}>
        At present, we do not integrate or share data with third-party analytics, advertising, or tracking services. We do not
        use tools such as Google Analytics, Facebook Pixel, or similar. Our hosting provider (Vercel) may collect minimal logs
        (such as access logs) strictly for hosting and performance purposes, but we do not consider that to be part of our
        privacy collection policies. If this changes in the future, we will update this Privacy Policy accordingly.
      </p>

      <h2 style={styles.sectionHeading}>7. No Account or Login Required</h2>
      <p style={styles.paragraph}>
        Currently, you are not required to create an account, sign in, or provide a password to use our Service. All users can
        access and complete the medical questionnaire directly without registration. In the future, if we add user accounts, we
        will update this Privacy Policy to explain how account data is collected, used, and secured.
      </p>

      <h2 style={styles.sectionHeading}>8. Retention of Your Information</h2>
      <p style={styles.paragraph}>
        We retain your personal information, questionnaire responses, and generated reports for as long as required to fulfill
        the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. If you
        wish to request deletion of your data, please contact us (see “Contact Us” below). We will respond to your request
        within a reasonable timeframe.
      </p>

      <h2 style={styles.sectionHeading}>9. Your Rights and Choices</h2>
      <p style={styles.paragraph}>
        Depending on your jurisdiction, you may have the following rights regarding your personal information:
      </p>
      <ul style={styles.list}>
        <li><strong>Access.</strong> You can request a copy of the personal data we hold about you.</li>
        <li><strong>Correction.</strong> You can ask us to correct or update any inaccurate or incomplete information.</li>
        <li><strong>Deletion.</strong> You can request that we delete your personal information from our systems, subject to legal exceptions.</li>
        <li><strong>Restriction.</strong> You can request that we restrict processing of your personal data under certain circumstances.</li>
        <li><strong>Objection.</strong> You can object to our processing of your personal data for direct marketing purposes (though we do not use your data for marketing).</li>
      </ul>
      <p style={styles.paragraph}>
        To exercise any of these rights, please contact us using the information in the “Contact Us” section below. We will
        respond to your request in a timely manner, consistent with applicable laws.
      </p>

      <h2 style={styles.sectionHeading}>10. Changes to This Privacy Policy</h2>
      <p style={styles.paragraph}>
        We may update this Privacy Policy from time to time. When we make material changes, we will revise the “Last updated”
        date at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how
        we handle your information.
      </p>

      <h2 style={styles.sectionHeading}>11. Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
      </p>
      <ul style={styles.list}>
        <li><strong>Email:</strong> <a href="mailto:officialtechwithmano@gmail.com">officialtechwithmano@gmail.com</a></li>
        <li>
          <strong>Mailing Address:</strong><br />
          As a digital-first service, we operate without a traditional physical office. Please direct all correspondence via email.
        </li>
      </ul>
      <p style={styles.paragraph}>
        Please allow up to 30 days for us to respond to your inquiries or requests.
      </p>

      <h2 style={styles.sectionHeading}>12. Your Consent & Regulatory Compliance</h2>
      <p style={styles.paragraph}>
        By accessing and utilizing the services provided through the ManoMed Ai application, you expressly acknowledge and
        consent to the collection, limited processing, and safeguarded storage of your information as described herein. This
        Privacy Policy is governed in accordance with applicable international data protection standards, and is reflective of
        the operational values of the Tech with Mano initiative.
      </p>
      <p style={styles.paragraph}>
        The platform operates under the auspices of Tech with Mano, a digital-first entity with a service-oriented footprint
        designed to reach users across multiple jurisdictions, including but not limited to regions within the Middle East and
        broader global digital health ecosystems.
      </p>
      <p style={styles.paragraph}>
        ManoMed Ai operates in compliance with the EU General Data Protection Regulation (GDPR) and the California Consumer
        Privacy Act (CCPA), as well as any other applicable data protection laws in jurisdictions where we offer our digital
        health services.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
