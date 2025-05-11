import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeProvider'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Faqs = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {

    if (selected === i) {
      return setSelected(null)
    }
    setSelected(i)
  }

  return (
    <div className="bigscreen p-5 md:p-10">
      <div className="font-bold text-4xl">Frequently Asked Questions</div>

      <div className='text-left flex flex-col mt-8'>

        {data?.map((item, i) => (
          <>
            <div className='max-w-[1000px] w-full p-6 flex flex-col'>

              <div className='flex justify-between items-center cursor-pointer'
                onClick={() => toggle(i)} key={i}>
                <div className='font-semibold'>{item.question}</div>

                {selected === i ?
                    <IoIosArrowUp className='text-2xl font-semibold text-[var(--primary)]'/>
                  :
                    <IoIosArrowDown className='text-2xl font-semibold text-[var(--primary)]'/>
                }
              </div>

              <div className={selected === i ? 'text-sm max-h-screen overflow-hidden transition-all duration-300 ease-in-out w-full max-w-[900px] mt-6' : 'text-sm max-h-0 overflow-hidden transition-all duration-300 ease-in-out w-full'}>
                {item.answer}
              </div>

            </div>

            <div className={`${
                    darkMode
                      ? "bg-[#333333]"
                      : "bg-[#CBCBCB]"
                  } h-[0.5px] max-w-[1000px] my-2`}></div>
          </>
        ))}
      </div>

    </div>
  )
}

export default Faqs

const data = [
  {
    "question": "What types of footage do you offer?",
    "answer": "We offer a wide variety of high-quality stock footage sourced from filmmakers across India. You can find clips in HD and 4K resolutions, including stunning visuals of landscapes, cultural scenes, urban life, festivals, and much more. Some clips are available for free, while others are available for a low cost starting at Rs 79 for HD and Rs 129 for 4K."
  },
  {
    "question": "Can I use your footage for any type of project?",
    "answer": "Our footage is licensed for web usage only. This means it can be used in online platforms such as websites, social media, and digital ads. Please note that the license does not cover use in television, cinema, or any other non-web applications."
  },
  {
    "question": "Are all your videos royalty-free?",
    "answer": "Most of our footage is royalty-free, meaning you can use it without additional payments after the initial purchase. However, some clips are not royalty-free and will be clearly tagged as such on the website. Non-royalty-free footage may come with additional restrictions, so please check the license details carefully before purchasing."
  },
  {
    "question": "Can I resell or redistribute the footage I purchase?",
    "answer": "No, the license does not grant you the right to resell or redistribute any of our footage. Our clips are only available for use in your projects, and any resale, redistribution, or commercial exploitation of the footage outside of its intended usage is prohibited."
  },
  {
    "question": "What is the difference between HD and 4K footage?",
    "answer": "HD footage has a resolution of 1920x1080 pixels, while 4K footage has a higher resolution of 3840x2160 pixels. 4K footage offers greater detail and clarity, making it suitable for larger screens, higher-end productions, or projects that require more visual precision."
  },
  {
    "question": "Do you offer subscription plans?",
    "answer": "Yes, we offer two subscription plans:\nMonthly Plan: Rs 1800/month for unlimited downloads.\nAnnual Plan: Rs 1000/month (billed annually) for unlimited downloads.\nWith both plans, you can download as many clips as you need throughout your subscription period."
  },
  {
    "question": "How can I download free footage?",
    "answer": "To download free footage, simply browse through our free section on the website. Each free clip will have a download button, and you can access the footage without any payment. However, please note that some free clips may come with usage restrictions, so be sure to check the license terms."
  },
  {
    "question": "What does “Royalty-Free” mean?",
    "answer": "Royalty-free means that once you purchase the footage, you can use it without paying additional fees or royalties for each use. However, it is still subject to specific licensing terms (e.g., web use only). Royalty-free footage allows you to use the clip multiple times in your projects without further charges."
  },
  {
    "question": "What does “Non-Royalty-Free” footage mean?",
    "answer": "Non-royalty-free footage is subject to additional restrictions and fees. It may have specific usage rights, such as requiring additional payments for extended use, or it may come with more limited terms compared to royalty-free clips. These clips will be clearly marked as \"Non-Royalty-Free\" on the website."
  },
  {
    "question": "Can I edit or modify the footage I purchase?",
    "answer": "Yes, you can edit and modify the footage for use in your projects, such as cropping, color grading, or incorporating it into your own work. However, you are not allowed to resell or redistribute the raw footage in its original or modified form."
  },
  {
    "question": "Can I cancel my subscription anytime?",
    "answer": "If you are on the monthly plan, you can cancel your subscription anytime. If you’re on the annual plan, the payment is non-refundable, but you can still cancel your subscription at any time to avoid future charges."
  },
  {
    "question": "What is the payment method for purchasing footage or subscribing?",
    "answer": "We accept a variety of payment methods, including credit and debit cards, and popular online payment platforms. The available payment methods will be listed during checkout."
  },
  {
    "question": "How do I know if the footage is appropriate for my project?",
    "answer": "Each clip on our website comes with a preview, description, and detailed metadata to help you assess whether it fits your needs. You can also filter footage based on categories such as location, theme, and resolution. Always check the licensing terms to make sure the clip’s usage aligns with your project requirements."
  },
  {
    "question": "Are your clips sourced from professionals?",
    "answer": "Yes, all our footage is sourced from talented filmmakers and creators across India. We collaborate with professionals to bring you authentic, high-quality clips that showcase the beauty and diversity of India."
  },
  {
    "question": "Can I get a custom quote for specific footage needs?",
    "answer": "If you need custom footage or have specific requirements, please reach out to our support team via the contact page. We can discuss your project needs and provide you with a quote for custom footage or licensing."
  }
]