import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const InstantLoanScrollContent = () => {
  const featuresTrackRef = useRef(null);

  const scrollFeatures = (direction) => {
    if (featuresTrackRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      featuresTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* BEGIN: LenderLogosCarousel */}
      <section
        className="py-12 md:py-16 bg-[#f8faff] overflow-hidden border-b border-slate-200/60"
        data-purpose="lenders-logo-continuous-slider"
      >
        <div className="max-w-6xl mx-auto px-4 text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Our Lenders</p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Leading Banks and NBFCs</h2>
          <div className="w-12 h-1 bg-amber-400 rounded-full mx-auto mt-2"></div>
        </div>

        {/* Infinite Scrolling Marquee Track Container */}
        <div className="relative w-full mask-fade-edges overflow-hidden py-3">
          <div className="animate-marquee pause-on-hover flex items-center space-x-6 sm:space-x-8">
            {/* Loop Set 1 */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Poonawalla Fincorp"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0a0XXQPPeO95pVzrZI9ljGC3NCdAcqCuHWI7PTksfgKpbBdFQ5Xb8P2PEf3ks6n9BPdZZ6Edpiwh46HbZyaMGubIoLhBq7rIW6GEhRgPQwFsi5rHtBTVKgNrk42xsy-uIsP-wnscZ0qzGeJvT4gLqPUNjzsdpJuAmbnNgeEoKSaeGJuiHRy3_lJ4GsHioSXhihuKbBT52nldE1-CPPxdb-Sb-d5ZZ4mHd1RJwY7nEL0MdKe91HBZzHzrXHT3bSFWlmw"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="FlexiLoans"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5iObhlc8ArG6EAojGYztna-O8mxFMSkttNPk7adwcHQ0kvLL-YWlwXGsCfS3xNPvll2IfMsHs_-8-IC-Qg6cI8lwWu77Q0YqSgVrmRm4j4d-Ha8S2_bsKsDofuleR78rJwOuR-cU7zBYakIOPXVITRFNY0PE0nvfMB6Jt2zIMez6ci_ypi0oP4tmhgaxMUV3skr1yu1TuReaJxHOX8R4OwRWM1T0uknNf1lKkERKVk_YVuc_ZoOg8Jo_qudJxHncPIA"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="FLOT flexible loan"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKZ3pRmJtfBnHJnK4DznyQBGvC3QKzFbkrzV0wLFRWv3GeqzS9RTM0wD59z-xifQj-7mtuixaw1JxqjbGBKV3FvvWCYrTyxzc-71ORymVuSuR4lVOcUk-pTRF0W1Y-2Q7iInVBseFq3gmcl0hiCKPbxhJgZgYuFFdt-tgncD_JlXY1Pul5DdRvxXP4Ty0oG-hmwE3LXQLUNCYp4_ZFdTyQ91z-eEQuPBcu7GoVcLpHMoB_eW5DkFOI_s-OaY19diR1-Q"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="DMI Finance"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDJmnvzpTci0aH10jmUMn3V43VbNzN6VqmdYGPKengPQaWPP5GVS9EAfgR-A4dUjQwRTTG-5CPXYV8x53ObG8Y04iLKDX3Syaq4x-4ywHdF_qCznSxbdeEZCQ9N2tmHCWQKbHzbQKrNc3iu-t3x5fg4WOLBWzYvv8xAPQv2e4lbbGrtwqHk8aX6F-GMHnsqvbRyHarLvBatl_YbwWaXOpZIyaDTYLSygfbYa6oejcSqLTzWYPTQo3OAp-gmgT7_0zQ7g"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="L&T Finance"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwnEXQw9js3BQSyVeV1Of_c80ZIP5qozqmojBrLp5APU0M4K6gaF9pYsT3IFIGuiwttjziV-V0yUdQNHBRw2YTPv3HBAGwPl96FXiLG3ZSZMKKY2Tk8-I7o3mQ5sR0c9JtvMk2zUGtFEAtFAwSlng1UDq2y5ju0q7ViySiRFCMKvsfUnVUIqxPZw2S3OOOf-vSqEjwr7I7Tsekb89S4G5Xcgn6LeztG49EEDuYsvrYUsDJI5GIAmn5yShkeOKT269a-w"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Ram Fincorp"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5oS6pqoUw_qgBVI2VLZOW-kLUGTJJt_UKJaDb1tz8MP3aKuV9RRq0XQW7f9zq_gmHaL7TjZZCbUSWOyhz9WNgxj3HrvFSE7SGou5KOQ6DMYvfh8A--XiQcSdFh6wMK3DLV0r9_P5JNGJ9UNBHjVT41aU4TfnrLjIpat3hXW56aHXBeNEvAXr3cJENrEs6Q5aWak-suxK2QQ5wuW1vMHL2fAe0ftRd5zYJ_g2xh1sSUJWGoR9cfuU2lCtA_l2VIwzR8Q"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Salary On Time"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOQtORGqNd5GosS9HFbdLVzp1YtmBUYZREuGXmbOiNh7PJ-shecltFDNQYcT9LDvugYqd2Dthz9NYD7ZB1ZD9zLD2vYIOVRlE7oxtP8Ka3JubDIZuXACAGtnNB9_4nEcqB34A-8eKpNxQIly4fVpf3_YcjwzOEvUsvfnfl60dT9G5OmWepv58NvFnDfiDZg4YTJO4i9KeaZNvsFqJ2rqAor6KuRfu3957zBPHd6HgqAl9PKzCS0ctkgUFFdofo4wlhA"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Unity Small Finance Bank"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmS4VeQzkmlR--Zpp_uNNqudml2CpNpmcZ1kxvt5k6XN5rTKQgstl0MKyhQdfeH739eTmVCkgRM4oeefIbHCqsWbxvzfEl0j0_aykahZwMf4UUfAWTYfhS3V4XwYA2-5CQf0NxRbgEWj-5SeISNf_-uRti6EYSKoB8jcBn2fx6OTlo1yX29-243Yrt_MELxeGzla_Rhjx_59ddZMVMXNIdm71cRm3siMyBX1SJwmgYnYD2SM-LFxwU7o37Gy5YmAYgYg"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Zype"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlfk2kU6Zdlhukk4Xx67tLhZ2r6LjRNR1Zah5BboxYCQKyKprtagNWotnUbc3QdcFWHgS9T3t91xNg1FCJo0Zz87BjKLaXyCnGx5dAtFWjSNik1_Qw0EULauuDmxsU054yggS3fAyXMpNITIQl9z75TT0sf8viH7iBv33zf00d8FtelwaEt8b5u31u4w0szI52ZeAnFcq1fp4s6fw7LVdsgQDbwJH-SXCkb9DpaUkdJYd52nsyhch1M71HCzs8P5UeVg"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="IDFC FIRST Bank"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDELBoHOddDfsaEEOGwn6feG6kfSWNCb8Ck3NVk42_tDPKgkrQRN_J9uu2cUmFlS-EFSoZCfXFoAX4UGdlVoq3CEtdoaHxDMH8OFG5BMZ4QbB54aByrKpTu4S5sxFOsNAitfdPNRTsLNl-sllTEBDsQtVt_FDVTX798KbEh7Hjb9H1U5takwVm7s6TUBC1bDh1cUjqMVoc-9QD-VdqIp_bEB4JeMbM2Y5_qUDYieGKXnpdQxP06yIfyVjlM6RFtITmDgA"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Indifi"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxbeyGZeevW05aUEFC9cTEV76qC5CbVHRKo0s_UvZ6f7fYkXj30DxC3Db6ZbR2gdw3nRYNdSGO_L3Oo4pXUWjTB0-NHUqLFCRwexc0BRGRbOxXHZXf-gno3ks81jqUW2yqawBvMo5CIbzOyDcJuNCK-ZaKiQFozlHZeZiYxVpMdbEXa-WNcnFI5A5KhM0lwhRnHUY5cI72V0B9b6LYgPYc8LfNZrFZ0WEBSYe2iS4Hc67HxFR-clZrRo4ga1ISps4Iuw"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="InCred Finance"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrmxR7KUx7T5T3rt46gNcgylG2dE-2oOwooPxqAXP6WY3mIFAihOrRQM3JzNWGa9i04kQl_p5AFdl0FldNRe_E7YyTTn1kZt5aW83N6cYcr-UYV1YQVsqCmycF_dfh17DokUXfxJGzDCQtYGuHnzPsakHwgcuahDS5SQDlskOxASB5Hg3BkhQSXKilddSygpi85LU9keNfn76kt_rmqZdDJW7lK-C6YUAonfJzSi3ZrXOQTNk-pyGhqXuHXd-woLMlFw"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Aditya Birla Capital"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6-NyeJioFwhcb6XGFHfEEeOhTQy1Z7vqM60RH7-KtTtyPDB6DOAjNwhP6TkC8Y0EOHZi4A81J7TvkpN46HNHSx2A1_F_72jSQ2Fka36qCSIZAPZVXuUVmCz198d3-6mYMaIioUbtRNqYZ5xvZZfH-r_Mo0doOKr8wMcHDr1USUf9IdZHDiSatPORQkWH7P0QmtxML7VJgorw07GTnoNPyDVf9CcCk-nK8TiMdmghhKXND2F6-a05MT5_57zrPc4vBMQ"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Lendingkart"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC76AsGFJxSV0Ys039WxILILqZuJ1Wg3LHGrOwzwvVXfIryG9W_EsLyt5rsEhcWONizI7FHtZrsAj_zSqnO0J-5UqjaDJV-Q3NWQyM1-lNMhixtOZnEm7alneuR65YXLpEPHmmmgSKaYqNKS4PmDJmDfFe3qQMsDIjBmz7K3BbU2p4yf9RV1eI5YRagkafKvq_aUIrT1Xu4Lb87-z6KSq4gCv0I3B2hihrGFUi4aZxIXLwX6iCLioMyNN7wJsxBYvjOdg"
                />
              </div>
            </div>

            {/* Loop Set 2 (Identical Clone to achieve continuous seamless loop) */}
            <div aria-hidden="true" className="flex items-center space-x-6 sm:space-x-8">
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Poonawalla Fincorp"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0a0XXQPPeO95pVzrZI9ljGC3NCdAcqCuHWI7PTksfgKpbBdFQ5Xb8P2PEf3ks6n9BPdZZ6Edpiwh46HbZyaMGubIoLhBq7rIW6GEhRgPQwFsi5rHtBTVKgNrk42xsy-uIsP-wnscZ0qzGeJvT4gLqPUNjzsdpJuAmbnNgeEoKSaeGJuiHRy3_lJ4GsHioSXhihuKbBT52nldE1-CPPxdb-Sb-d5ZZ4mHd1RJwY7nEL0MdKe91HBZzHzrXHT3bSFWlmw"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="FlexiLoans"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5iObhlc8ArG6EAojGYztna-O8mxFMSkttNPk7adwcHQ0kvLL-YWlwXGsCfS3xNPvll2IfMsHs_-8-IC-Qg6cI8lwWu77Q0YqSgVrmRm4j4d-Ha8S2_bsKsDofuleR78rJwOuR-cU7zBYakIOPXVITRFNY0PE0nvfMB6Jt2zIMez6ci_ypi0oP4tmhgaxMUV3skr1yu1TuReaJxHOX8R4OwRWM1T0uknNf1lKkERKVk_YVuc_ZoOg8Jo_qudJxHncPIA"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="FLOT flexible loan"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKZ3pRmJtfBnHJnK4DznyQBGvC3QKzFbkrzV0wLFRWv3GeqzS9RTM0wD59z-xifQj-7mtuixaw1JxqjbGBKV3FvvWCYrTyxzc-71ORymVuSuR4lVOcUk-pTRF0W1Y-2Q7iInVBseFq3gmcl0hiCKPbxhJgZgYuFFdt-tgncD_JlXY1Pul5DdRvxXP4Ty0oG-hmwE3LXQLUNCYp4_ZFdTyQ91z-eEQuPBcu7GoVcLpHMoB_eW5DkFOI_s-OaY19diR1-Q"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="DMI Finance"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDJmnvzpTci0aH10jmUMn3V43VbNzN6VqmdYGPKengPQaWPP5GVS9EAfgR-A4dUjQwRTTG-5CPXYV8x53ObG8Y04iLKDX3Syaq4x-4ywHdF_qCznSxbdeEZCQ9N2tmHCWQKbHzbQKrNc3iu-t3x5fg4WOLBWzYvv8xAPQv2e4lbbGrtwqHk8aX6F-GMHnsqvbRyHarLvBatl_YbwWaXOpZIyaDTYLSygfbYa6oejcSqLTzWYPTQo3OAp-gmgT7_0zQ7g"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="L&T Finance"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwnEXQw9js3BQSyVeV1Of_c80ZIP5qozqmojBrLp5APU0M4K6gaF9pYsT3IFIGuiwttjziV-V0yUdQNHBRw2YTPv3HBAGwPl96FXiLG3ZSZMKKY2Tk8-I7o3mQ5sR0c9JtvMk2zUGtFEAtFAwSlng1UDq2y5ju0q7ViySiRFCMKvsfUnVUIqxPZw2S3OOOf-vSqEjwr7I7Tsekb89S4G5Xcgn6LeztG49EEDuYsvrYUsDJI5GIAmn5yShkeOKT269a-w"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Ram Fincorp"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5oS6pqoUw_qgBVI2VLZOW-kLUGTJJt_UKJaDb1tz8MP3aKuV9RRq0XQW7f9zq_gmHaL7TjZZCbUSWOyhz9WNgxj3HrvFSE7SGou5KOQ6DMYvfh8A--XiQcSdFh6wMK3DLV0r9_P5JNGJ9UNBHjVT41aU4TfnrLjIpat3hXW56aHXBeNEvAXr3cJENrEs6Q5aWak-suxK2QQ5wuW1vMHL2fAe0ftRd5zYJ_g2xh1sSUJWGoR9cfuU2lCtA_l2VIwzR8Q"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Salary On Time"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOQtORGqNd5GosS9HFbdLVzp1YtmBUYZREuGXmbOiNh7PJ-shecltFDNQYcT9LDvugYqd2Dthz9NYD7ZB1ZD9zLD2vYIOVRlE7oxtP8Ka3JubDIZuXACAGtnNB9_4nEcqB34A-8eKpNxQIly4fVpf3_YcjwzOEvUsvfnfl60dT9G5OmWepv58NvFnDfiDZg4YTJO4i9KeaZNvsFqJ2rqAor6KuRfu3957zBPHd6HgqAl9PKzCS0ctkgUFFdofo4wlhA"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Unity Small Finance Bank"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmS4VeQzkmlR--Zpp_uNNqudml2CpNpmcZ1kxvt5k6XN5rTKQgstl0MKyhQdfeH739eTmVCkgRM4oeefIbHCqsWbxvzfEl0j0_aykahZwMf4UUfAWTYfhS3V4XwYA2-5CQf0NxRbgEWj-5SeISNf_-uRti6EYSKoB8jcBn2fx6OTlo1yX29-243Yrt_MELxeGzla_Rhjx_59ddZMVMXNIdm71cRm3siMyBX1SJwmgYnYD2SM-LFxwU7o37Gy5YmAYgYg"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Zype"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlfk2kU6Zdlhukk4Xx67tLhZ2r6LjRNR1Zah5BboxYCQKyKprtagNWotnUbc3QdcFWHgS9T3t91xNg1FCJo0Zz87BjKLaXyCnGx5dAtFWjSNik1_Qw0EULauuDmxsU054yggS3fAyXMpNITIQl9z75TT0sf8viH7iBv33zf00d8FtelwaEt8b5u31u4w0szI52ZeAnFcq1fp4s6fw7LVdsgQDbwJH-SXCkb9DpaUkdJYd52nsyhch1M71HCzs8P5UeVg"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="IDFC FIRST Bank"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDELBoHOddDfsaEEOGwn6feG6kfSWNCb8Ck3NVk42_tDPKgkrQRN_J9uu2cUmFlS-EFSoZCfXFoAX4UGdlVoq3CEtdoaHxDMH8OFG5BMZ4QbB54aByrKpTu4S5sxFOsNAitfdPNRTsLNl-sllTEBDsQtVt_FDVTX798KbEh7Hjb9H1U5takwVm7s6TUBC1bDh1cUjqMVoc-9QD-VdqIp_bEB4JeMbM2Y5_qUDYieGKXnpdQxP06yIfyVjlM6RFtITmDgA"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Indifi"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxbeyGZeevW05aUEFC9cTEV76qC5CbVHRKo0s_UvZ6f7fYkXj30DxC3Db6ZbR2gdw3nRYNdSGO_L3Oo4pXUWjTB0-NHUqLFCRwexc0BRGRbOxXHZXf-gno3ks81jqUW2yqawBvMo5CIbzOyDcJuNCK-ZaKiQFozlHZeZiYxVpMdbEXa-WNcnFI5A5KhM0lwhRnHUY5cI72V0B9b6LYgPYc8LfNZrFZ0WEBSYe2iS4Hc67HxFR-clZrRo4ga1ISps4Iuw"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="InCred Finance"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrmxR7KUx7T5T3rt46gNcgylG2dE-2oOwooPxqAXP6WY3mIFAihOrRQM3JzNWGa9i04kQl_p5AFdl0FldNRe_E7YyTTn1kZt5aW83N6cYcr-UYV1YQVsqCmycF_dfh17DokUXfxJGzDCQtYGuHnzPsakHwgcuahDS5SQDlskOxASB5Hg3BkhQSXKilddSygpi85LU9keNfn76kt_rmqZdDJW7lK-C6YUAonfJzSi3ZrXOQTNk-pyGhqXuHXd-woLMlFw"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Aditya Birla Capital"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6-NyeJioFwhcb6XGFHfEEeOhTQy1Z7vqM60RH7-KtTtyPDB6DOAjNwhP6TkC8Y0EOHZi4A81J7TvkpN46HNHSx2A1_F_72jSQ2Fka36qCSIZAPZVXuUVmCz198d3-6mYMaIioUbtRNqYZ5xvZZfH-r_Mo0doOKr8wMcHDr1USUf9IdZHDiSatPORQkWH7P0QmtxML7VJgorw07GTnoNPyDVf9CcCk-nK8TiMdmghhKXND2F6-a05MT5_57zrPc4vBMQ"
                />
              </div>
              <div className="flex-shrink-0 bg-white border border-slate-150 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center w-36 h-20">
                <img
                  alt="Lendingkart"
                  className="max-h-12 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC76AsGFJxSV0Ys039WxILILqZuJ1Wg3LHGrOwzwvVXfIryG9W_EsLyt5rsEhcWONizI7FHtZrsAj_zSqnO0J-5UqjaDJV-Q3NWQyM1-lNMhixtOZnEm7alneuR65YXLpEPHmmmgSKaYqNKS4PmDJmDfFe3qQMsDIjBmz7K3BbU2p4yf9RV1eI5YRagkafKvq_aUIrT1Xu4Lb87-z6KSq4gCv0I3B2hihrGFUi4aZxIXLwX6iCLioMyNN7wJsxBYvjOdg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: LenderLogosCarousel */}

      {/* BEGIN: LoanFeaturesBenefitsSection */}
      <section className="py-16 md:py-20 bg-white relative" data-purpose="loan-features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">LOAN FEATURES</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Get the Right Benefits
            </h2>
          </header>

          {/* Continuous Moving Feature Cards Slider with interactive controls */}
          <div className="relative mask-fade-edges overflow-hidden py-4">
            <div
              ref={featuresTrackRef}
              className="animate-marquee-slow pause-on-hover flex space-x-6 items-stretch no-scrollbar overflow-x-auto"
              id="featuresTrack"
            >
              {/* Loop Items Part 1 */}
              <div className="flex space-x-6">
                {/* Card 1 */}
                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-black mb-5 group-hover:scale-110 transition-transform">
                    %
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Affordable Interest Rates</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Access competitive interest rates based on your profile and eligibility.
                  </p>
                  <div className="w-20 h-1 bg-blue-500 rounded-full mt-5 opacity-90"></div>
                </article>

                {/* Card 2 */}
                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path d="M9 16l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Flexible Tenure</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Select repayment tenures that suit your comfort and financial planning.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>

                {/* Card 3 */}
                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Minimal Documentation</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Quick paperless verification with minimal KYC requirements and fast checks.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>

                {/* Card 4 */}
                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Pre-approval</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Check your eligibility and get pre-approved loan amounts in under 2 minutes.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>

                {/* Card 5 */}
                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">100% Transparency</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    No hidden charges, zero surprise fees, and direct terms straight from the lenders.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>
              </div>

              {/* Loop Items Part 2 (Clone for infinite seamless transition) */}
              <div aria-hidden="true" className="flex space-x-6">
                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl font-black mb-5">
                    %
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Affordable Interest Rates</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Access competitive interest rates based on your profile and eligibility.
                  </p>
                  <div className="w-20 h-1 bg-blue-500 rounded-full mt-5 opacity-90"></div>
                </article>

                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path d="M9 16l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Flexible Tenure</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Select repayment tenures that suit your comfort and financial planning.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>

                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Minimal Documentation</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Quick paperless verification with minimal KYC requirements and fast checks.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>

                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Pre-approval</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    Check your eligibility and get pre-approved loan amounts in under 2 minutes.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>

                <article className="w-72 sm:w-80 bg-white rounded-2xl p-6 sm:p-7 shadow-lg shadow-slate-100 border border-slate-100 flex flex-col items-center text-center relative group hover:border-blue-400 transition">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">100% Transparency</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                    No hidden charges, zero surprise fees, and direct terms straight from the lenders.
                  </p>
                  <div className="w-20 h-1 bg-transparent rounded-full mt-5"></div>
                </article>
              </div>
            </div>

            {/* Visual Decorative Circular Arrows (Matching Reference Layout) */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
              <button
                aria-label="Previous Feature"
                onClick={() => scrollFeatures('left')}
                className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-105 transition flex items-center justify-center cursor-pointer"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
              <button
                aria-label="Next Feature"
                onClick={() => scrollFeatures('right')}
                className="w-11 h-11 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-105 transition flex items-center justify-center cursor-pointer"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* END: LoanFeaturesBenefitsSection */}

      {/* BEGIN: SeeCredBuddhaInActionSection */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#f8faff] to-white" data-purpose="cred-in-action">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Headline & Subtitle */}
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              See Fincorp in Action
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Discover how Fincorp helps you unlock pre-approved offers in minutes. Complete a simple digital application,
              get matched with trusted partners, and choose the best offer tailored to your profile — all through a
              fast, secure, and paperless process.
            </p>
          </div>

          {/* 3 Key Value Cards Grid (Purple, Green, Coral Red) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Card 1: Purple */}
            <div className="bg-gradient-to-br from-[#6b5cd8] to-[#5543c7] rounded-2xl p-6 sm:p-7 text-white shadow-lg shadow-indigo-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9"></circle>
                  <circle cx="12" cy="12" r="5"></circle>
                  <circle cx="12" cy="12" fill="currentColor" r="1.5"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Offer Matching</h3>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                Instantly matched with lenders based on your profile and eligibility.
              </p>
            </div>

            {/* Card 2: Emerald Green */}
            <div className="bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl p-6 sm:p-7 text-white shadow-lg shadow-emerald-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick & Secure Process</h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Complete your verification and documentation online in minutes.
              </p>
            </div>

            {/* Card 3: Coral Red */}
            <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-2xl p-6 sm:p-7 text-white shadow-lg shadow-red-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    clipRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Disbursal</h3>
              <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                Get approved and receive money quickly without unnecessary delays.
              </p>
            </div>
          </div>

          {/* App Ecosystem Flow Visual Replica */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-inner">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">One-Click Multi-Lender Compare</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Explore quotes from IDFC, Unity Bank, L&T, and 15+ others simultaneously.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Zero Physical Paperwork</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Digital KYC and instant bank account validation in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Direct Disbursal in 24 Hours</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Funds credited straight to your registered bank account seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: SeeCredBuddhaInActionSection */}

      {/* BEGIN: HappyBorrowersTestimonialsSection */}
      <section
        className="py-16 md:py-24 bg-gradient-to-b from-[#0f4c92] to-[#0a3875] text-white overflow-hidden relative"
        data-purpose="customer-reviews"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <p className="text-xs font-bold tracking-widest text-blue-200 uppercase mb-2">HAPPY BORROWERS</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            What Our Customers Say About Their Loan Experience
          </h2>
          <div className="w-14 h-1 bg-amber-400 rounded-full mx-auto mt-3"></div>
        </div>

        {/* Continuous Auto-Scrolling Testimonial Carousel */}
        <div className="relative w-full mask-fade-edges overflow-hidden py-4">
          <div className="animate-marquee-testimonials pause-on-hover flex space-x-6 sm:space-x-8">
            {/* Testimonials Loop 1 */}
            <div className="flex space-x-6 sm:space-x-8">
              {/* Testimonial 1 (Ravi Kumar) */}
              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    The loan approval was super quick! I received the amount in my account within 24 hours. Very smooth experience.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Ravi Kumar</div>
                  <div className="text-xs text-slate-500 font-medium">Personal Loan Customer</div>
                </div>
              </div>

              {/* Testimonial 2 (Neha Sharma) */}
              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    I got the best interest rate compared to other lenders. The team guided me throughout the process with complete transparency.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Neha Sharma</div>
                  <div className="text-xs text-slate-500 font-medium">Home Loan Customer</div>
                </div>
              </div>

              {/* Testimonial 3 (Amit Patel) */}
              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    Paperless and completely hassle-free. Got emergency business funds disbursal the same day without physical paperwork.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Amit Patel</div>
                  <div className="text-xs text-slate-500 font-medium">Business Loan Customer</div>
                </div>
              </div>

              {/* Testimonial 4 (Priya Sundaram) */}
              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    CredBuddha helped me compare multiple offers in one place and picked the best EMI plan suited for my monthly budget.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Priya Sundaram</div>
                  <div className="text-xs text-slate-500 font-medium">Personal Loan Customer</div>
                </div>
              </div>
            </div>

            {/* Testimonials Loop 2 (Clone for infinite scrolling seamless effect) */}
            <div aria-hidden="true" className="flex space-x-6 sm:space-x-8">
              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    The loan approval was super quick! I received the amount in my account within 24 hours. Very smooth experience.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Ravi Kumar</div>
                  <div className="text-xs text-slate-500 font-medium">Personal Loan Customer</div>
                </div>
              </div>

              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    I got the best interest rate compared to other lenders. The team guided me throughout the process with complete transparency.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Neha Sharma</div>
                  <div className="text-xs text-slate-500 font-medium">Home Loan Customer</div>
                </div>
              </div>

              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    Paperless and completely hassle-free. Got emergency business funds disbursal the same day without physical paperwork.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Amit Patel</div>
                  <div className="text-xs text-slate-500 font-medium">Business Loan Customer</div>
                </div>
              </div>

              <div className="w-80 sm:w-96 flex-shrink-0 bg-white rounded-2xl p-6 sm:p-7 text-slate-800 shadow-xl relative flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex text-amber-400 space-x-1">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    <span className="text-4xl leading-none text-blue-200 font-serif font-black select-none">“</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                    CredBuddha helped me compare multiple offers in one place and picked the best EMI plan suited for my monthly budget.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-150">
                  <div className="font-bold text-slate-900 text-base">Priya Sundaram</div>
                  <div className="text-xs text-slate-500 font-medium">Personal Loan Customer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Nav Buttons & Indicator Dots */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            <span className="w-2.5 h-2.5 rounded-full bg-white transition-opacity"></span>
            <span className="w-2 h-2 rounded-full bg-white/40"></span>
            <span className="w-2 h-2 rounded-full bg-white/40"></span>
            <span className="w-2 h-2 rounded-full bg-white/40"></span>
            <span className="w-2 h-2 rounded-full bg-white/40"></span>
          </div>
        </div>
      </section>
      {/* END: HappyBorrowersTestimonialsSection */}

      {/* BEGIN: SiteFooter */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800" data-purpose="main-footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-800 text-center md:text-left">
            <div>
              <div className="inline-block bg-white/95 px-3 py-1.5 rounded-lg mb-1">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBS_nYDnhbvbaI7CXnhwdVnBuspPdnuILxq9l3GPTNujRrODYF3snRjcvd8TFZVA8780_eiEyve3sO_uHBXC_e6E9Q2AEL1mmS7wD4Rh_hOrWm3AvdS4wGP4h9E5j5dbakHV-cTtHoQG8GR4IngOXvzs6s26lybBFgYSVyUsFrUE7Ur1PJ9_-sFJVZ4I4Ip2dqq5z9RIwu-NH9H6JvytHkVLbiddVoPHHiDX0e-AWh2kag3NaU7un5x1Sx7hsEgYQk4g"
                  alt="Fincorp - Finance • Grow • Succeed"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/logo.png';
                  }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                India's trusted digital financial matchmaker for transparent lending.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-300 font-medium">
              <Link className="hover:text-amber-400 transition" to="/about">
                About Us
              </Link>
              <Link className="hover:text-amber-400 transition" to="/partners">
                Partner Lenders
              </Link>
              <Link className="hover:text-amber-400 transition" to="/privacy">
                Privacy Policy
              </Link>
              <Link className="hover:text-amber-400 transition" to="/terms">
                Terms of Service
              </Link>
              <Link className="hover:text-amber-400 transition" to="/grievance">
                Grievance Redressal
              </Link>
            </div>
          </div>
          <div className="pt-6 text-center text-xs text-slate-500">
            © 2026 Fincorp Technologies Private Limited. All rights reserved. Loans disbursed by RBI licensed NBFCs and
            Banks only.
          </div>
        </div>
      </footer>
      {/* END: SiteFooter */}
    </div>
  );
};

export default InstantLoanScrollContent;
