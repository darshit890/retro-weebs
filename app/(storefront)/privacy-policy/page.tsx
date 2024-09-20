'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function Component() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const sections = [
    {
      title: 'Introduction',
      content: (
        <>
          <p>This privacy policy (&quot;Policy&quot;) sets out how RetroWeebs (&quot;RetroWeebs,&quot; also referred to as &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses and protects any information that you provide when you use the website www.retroweebs.com or mobile application (individually and collectively, the &quot;Platform&quot;).</p>
          <p>RetroWeebs is committed to ensuring that your privacy is protected. Should we ask you to provide any information by which you can be identified when using this Platform, rest assured that it will only be used in strict accordance with this Policy.</p>
          <p>Please note that our Policy is subject to change at any time without prior notice. To ensure you are up to date with the Policy, please review this page periodically. This Policy applies to current and former visitors and customers of our Platform. By visiting and/or using our Platform, you are accepting and consenting to the practices described in this Policy.</p>
        </>
      )
    },
    {
      title: 'What Information Do We Collect?',
      content: (
        <>
          <p>We collect, store, and process your personal information (that we consider necessary) when you use our Platform. This information helps us provide you with a safe, efficient, smooth, and customized experience. It also helps us display content such as recommended products, communicate about your orders, and share new products or promotional offers.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Information You Provide Us</strong>: We receive and store information that you explicitly provide to us. This includes personal information such as your username, password, name, address, telephone number, email address, date of birth, gender, financial information (e.g., bank account, credit/debit card details), and any other information you provide while using the Platform. While you may choose not to provide certain information, this could prevent you from taking full advantage of our Platform&apos;s features.</li>
            <li><strong>Information Collected Automatically</strong>: When you interact with our Platform, we automatically collect information from your browser or device, including your IP address, geolocation data, device identification, and browsing behavior. We may also use cookies and similar technologies to enhance your experience on the Platform and for analytics.</li>
            <li><strong>Information from Other Sources</strong>: We may receive information about you from third-party sources, such as social media platforms or business partners. If you access our Platform through a social media service or connect your account with a social media service, we may collect information such as your username, profile picture, email address, and other publicly available data.</li>
          </ol>
        </>
      )
    },
    {
      title: 'How Do We Use Cookies?',
      content: (
        <>
          <p>A cookie is a small file transferred to your device&apos;s hard drive after obtaining your permission. It helps us recognize your browser, deliver personalized features, and provide relevant advertisements based on your preferences.</p>
          <p>You can choose to accept or decline cookies through your browser settings. However, disabling cookies may limit your ability to take full advantage of our Platform.</p>
        </>
      )
    },
    {
      title: 'Do We Share the Information We Receive?',
      content: (
        <>
          <p>Respecting your privacy is essential to us. We do not sell or commercially exploit your information. However, we may share customer information as described below:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Third-Party Service Providers</strong>: We engage third parties to perform certain functions on our behalf, such as fulfilling orders, analyzing customer data, providing marketing assistance, and processing payments. These third parties have access to only the information necessary to perform their functions and are bound by confidentiality agreements.</li>
            <li><strong>Compliance with the Law</strong>: We may be required to share customer information with government authorities for identity verification, prevention, detection, or investigation of cyber incidents, or to enforce our Terms of Service.</li>
            <li><strong>Business Transfers</strong>: In the event of a merger, acquisition, or sale of assets, customer information may be transferred as part of the transaction.</li>
          </ol>
        </>
      )
    },
    {
      title: 'Is Your Information Secure?',
      content: (
        <p>We take the security of your personal information seriously and employ industry-standard practices to protect it from unauthorized access, misuse, or disclosure. However, we cannot guarantee absolute security, especially in cases of breaches or events beyond our control, such as government actions, hacking, or system failures.</p>
      )
    },
    {
      title: 'What About Links to Other Websites?',
      content: (
        <p>Our Platform may contain third-party links and advertisements. Once you leave our Platform, we have no control over external websites and are not responsible for the protection and privacy of any information you provide on such sites.</p>
      )
    },
    {
      title: 'What Choices Do You Have?',
      content: (
        <ol className="list-decimal list-inside space-y-2">
          <li>You can update or modify your personal information at any time.</li>
          <li>If you no longer wish to receive emails or messages from us, contact our customer support team to opt-out.</li>
          <li>You can request the deletion of your personal information, though this may limit your ability to use certain features of the Platform.</li>
          <li>You can delete your account through the &apos;My Account&apos; section on the app for iOS devices.</li>
        </ol>
      )
    },
    {
      title: 'Who Should I Contact with My Grievances Regarding This Privacy Policy?',
      content: (
        <>
          <p>If you have any questions or concerns regarding this Policy, you may contact us using the information below:</p>
          <p><strong>Contact Email:</strong> Contact@retroweebs.com</p>
          <p><strong>Timing:</strong> Monday to Saturday – 10 am to 6 pm</p>
        </>
      )
    }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-primary">Privacy Policy</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary">Table of Contents</h2>
        <ul className="space-y-2">
          {sections.map((section, index) => (
            <li key={index}>
              <a
                href={`#section-${index}`}
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(`section-${index}`)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {sections.map((section, index) => (
        <div key={index} id={`section-${index}`} className="mb-8">
          <h2
            className="text-2xl font-semibold mb-4 text-primary cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection(`section-${index}`)}
          >
            {section.title}
            {expandedSections.includes(`section-${index}`) ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </h2>
          {expandedSections.includes(`section-${index}`) && (
            <div className="mt-4 text-gray-700 space-y-4">{section.content}</div>
          )}
        </div>
      ))}
    </div>
  )
}