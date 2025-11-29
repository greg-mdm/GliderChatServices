import svgPaths from "./svg-5cp28yian0";

function Icon() {
  return (
    <div className="relative shrink-0 size-[23.385px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1a11b680} fill="var(--fill-0, #1D2CF0)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function StateLayer() {
  return (
    <div className="bg-[#c9df56] box-border content-stretch flex gap-[9.354px] items-center justify-center px-[18.708px] py-[11.692px] relative shrink-0" data-name="State-layer">
      <Icon />
      <div className="flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1d2cf0] text-[14px] text-nowrap tracking-[0.1px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[20px] whitespace-pre">{`Let's Talk`}</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative rounded-[116.923px] shrink-0" data-name="Content">
      <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit]">
        <StateLayer />
      </div>
      <div aria-hidden="true" className="absolute border-[#c9df56] border-[1.169px] border-solid inset-0 pointer-events-none rounded-[116.923px]" />
    </div>
  );
}

export default function ButtonOutline() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="Button - outline">
      <Content />
    </div>
  );
}