import React, { useEffect } from "react";
import icon from "../../assets/icons/check2.svg";
import { useTheme } from "../../context/ThemeProvider";

const Pricing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { darkMode } = useTheme();

  return (
    <div className="bigscreen px-5 py-10 md:p-10 text-center bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(151,253,202,0.128)_0%,_rgba(151,253,202,0)_100%)]">
      <div className="text-3xl sm:text-[32px] font-semibold">
        The best Indian footage license in the world
      </div>
      <div>
        Get unlimited footage downloads, full coverage on any platform worldwide
        and a lifetime license
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-end md:justify-center gap-9 mt-8 text-left">
        {/* Monthly Plan (unchanged except removed Early Access) */}
        <div
          className={`cursor-pointer border-[0.5px] p-4 rounded-[16px] ${darkMode ? "bg-[#23262452]" : "bg-white"
            } hover:shadow flex flex-col gap-6 w-full max-w-[400px] md:max-w-[240px]`}
          style={{ borderColor: "var(--primary)" }}
        >
          <div>Monthly Plan</div>
          <div>
            <span className="text-2xl font-semibold">₹ 999</span>
            <span className="text-xs"> / month</span>
          </div>
          <div className="text-sm">
            Great for trying out Shotkut and for tiny teams.
          </div>
          <button
            className={`greenButton mx-auto !bg-[transparent] border-2 ${darkMode ? "border-white !text-white" : "border-black"
              } !w-[90%]`}
          >
            Try Now
          </button>
          <div
            className={`${darkMode
                ? "bg-[#232624] text-[#666666]"
                : "bg-[#C9DBD2] text-[#333333]"
              } text-sm rounded-[4px] p-1 mx-auto`}
          >
            Features
          </div>
          <div>
            {[
              "Unlimited downloads for a month",
              "Mobile, HD, and 4K quality",
              "Licensed for personal & commercial use",
              "Access to new weekly footage",
            ].map((text, index) => (
              <div key={index} className="flex gap-4 min-h-4">
                <img src={icon} className="h-full object-contain" />
                <div className="text-xs">{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly Plan (enhanced) */}
        <div
          className={`bg-[var(--primary)] p-2 rounded-[16px] ${darkMode ? "gradientcustom dark" : "gradientcustom"
            } hover:shadow flex flex-col gap-2 w-full max-w-[410px] md:max-w-[250px]`}
        >
          <div
            className={`${darkMode ? "text-[#333]" : "text-white"
              } text-xs text-center font-semibold`}
          >
            Most Popular
          </div>
          <div
            className={`cursor-pointer border-[0.5px] p-4 rounded-[16px] ${darkMode ? "bg-[#232624]" : "bg-white"
              } flex flex-col gap-6 w-full max-w-[400px] md:max-w-[240px]`}
            style={{ borderColor: "var(--primary)" }}
          >
            <div>Yearly Plan</div>
            <div>
              <span className="text-2xl font-semibold">₹ 833</span>
              <span className="text-xs"> / month</span>
              <div className="text-xs text-gray-500">Billed annually ₹9999</div>
              <div className="text-xs text-green-600 font-semibold mt-1">
                Save 17%
              </div>
            </div>
            <div className="text-sm">
              Best for growing startups and growth companies.
            </div>
            <button
              className={`greenButton mx-auto ${darkMode && "!bg-[#97FDCA]"
                } !w-[90%]`}
            >
              Try Now
            </button>
            <div
              className={`${darkMode
                  ? "bg-[#232624] text-[#666666]"
                  : "bg-[#C9DBD2] text-[#333333]"
                } text-sm rounded-[4px] p-1 mx-auto`}
            >
              Features
            </div>
            <div>
              {[
                "Unlimited downloads for a year",
                "Mobile, HD, and 4K quality",
                "Licensed for personal & commercial use",
                "Early access to latest footage",
                // "Best value: Save 17%",
              ].map((text, index) => (
                <div key={index} className="flex gap-4 min-h-4">
                  <img src={icon} className="h-full object-contain" />
                  <div className="text-xs">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Plan (unchanged) */}
        <div
          className={`cursor-pointer border-[0.5px] p-4 rounded-[16px] ${darkMode ? "bg-[#23262452]" : "bg-white"
            } hover:shadow flex flex-col gap-6 w-full max-w-[400px] md:max-w-[240px]`}
          style={{ borderColor: "var(--primary)" }}
        >
          <div>Enterprise</div>
          <div>
            <span className="text-2xl font-semibold">Negotiable</span>
            <span className="text-xs"> </span>
          </div>
          <div className="text-sm">
            Best for large companies & teams needing high security.
          </div>
          <button
            className={`greenButton mx-auto !bg-[transparent] border-2 ${darkMode ? "border-white !text-white" : "border-black"
              } !w-[90%]`}
          >
            Try Now
          </button>
          <div
            className={`${darkMode
                ? "bg-[#232624] text-[#666666]"
                : "bg-[#C9DBD2] text-[#333333]"
              } text-sm rounded-[4px] p-1 mx-auto`}
          >
            Features
          </div>
          <div>
            {[
              "Custom pricing for large teams",
              "Multi-user access",
              "Priority support",
              "Unlimited downloads",
              "All resolution access (Mobile, HD, 4K)",
            ].map((text, index) => (
              <div key={index} className="flex gap-4 min-h-4">
                <img src={icon} className="h-full object-contain" />
                <div className="text-xs">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*   <div className='flex items-end justify-center gap-9 mt-8 text-left'>

                <div className={`cursor-pointer border-[0.5px] p-4 rounded-[16px] ${darkMode? 'bg-[#23262452]':'bg-white'} hover:shadow flex flex-col gap-6 w-full max-w-[240px]`}
                    style={{ borderColor: 'var(--primary)' }}
                >
                    <div>Free</div>

                    <div>
                        <span className='text-2xl font-semibold'>₹ 0.00</span>
                        <span className='text-xs'> / month</span>
                    </div>

                    <div className='text-sm'>Great for trying out Shotkut and for tiny teams.</div>

                    <button className={`greenButton mx-auto !bg-[transparent] border-2 ${darkMode? 'border-white !text-white':'border-black'} !w-[90%]`}
                    // style={{borderColor:''}}
                    >
                        Try Now
                    </button>

                    <div className={`${darkMode? 'bg-[#232624] text-[#666666]' :"bg-[#C9DBD2] text-[#333333]"} text-sm rounded-[4px] p-1 mx-auto`}>
                        Features
                    </div>

                    <div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                    </div>
                </div>

                <div className={`bg-[var(--primary)] p-2 rounded-[16px] ${darkMode ? 'gradientcustom dark':'gradientcustom'} hover:shadow flex flex-col gap-2 w-full max-w-[250px]`}>
                    <div className={`${darkMode?'text-[#333]':'text-white'} text-xs text-center font-semibold`}>Most Popular</div>

                    <div className={`cursor-pointer border-[0.5px] p-4 rounded-[16px] ${darkMode? 'bg-[#232624]':'bg-white'} flex flex-col gap-6 w-full max-w-[240px]`}
                        style={{ borderColor: 'var(--primary)' }}
                    >
                        <div>Professional</div>

                        <div>
                            <span className='text-2xl font-semibold'>₹ 29.00</span>
                            <span className='text-xs'> / month</span>
                        </div>

                        <div className='text-sm'>Best for growing startups and growth companies.</div>

                        <button className={`greenButton mx-auto ${darkMode&& '!bg-[#97FDCA]'} !w-[90%]`}
                        >
                            Try Now
                        </button>

                        <div className={`${darkMode? 'bg-[#232624] text-[#666666]' :"bg-[#C9DBD2] text-[#333333]"} text-sm rounded-[4px] p-1 mx-auto`}>
                            Features
                        </div>

                        <div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>
                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                            <div className='flex gap-4 h-4'>
                                <img src={icon} className='h-full object-contain' />
                                <div className='text-xs'>Lorem ipsum dolor</div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className={`cursor-pointer border-[0.5px] p-4 rounded-[16px] ${darkMode? 'bg-[#23262452]':'bg-white'} hover:shadow flex flex-col gap-6 w-full max-w-[240px]`}
                    style={{ borderColor: 'var(--primary)' }}
                >
                    <div>Enterprise</div>

                    <div>
                        <span className='text-2xl font-semibold'>Negotiable</span>
                        <span className='text-xs'> </span>
                    </div>

                    <div className='text-sm'>Great for trying out Shotkut and for tiny teams.</div>

                    <button className={`greenButton mx-auto !bg-[transparent] border-2 ${darkMode? 'border-white !text-white':'border-black'} !w-[90%]`}
                    // style={{borderColor:''}}
                    >
                        Try Now
                    </button>

                    <div className={`${darkMode? 'bg-[#232624] text-[#666666]' :"bg-[#C9DBD2] text-[#333333]"} text-sm rounded-[4px] p-1 mx-auto`}>
                        Features
                    </div>

                    <div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                        <div className='flex gap-4 h-4'>
                            <img src={icon} className='h-full object-contain' />
                            <div className='text-xs'>Lorem ipsum dolor</div>
                        </div>

                    </div>
                </div>

            </div> */}
    </div>
  );
};

export default Pricing;
