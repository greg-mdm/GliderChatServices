import svgPaths from "./svg-zh5j3rts63";

function BrandColor() {
  return <div className="absolute inset-0 rounded-[100px]" data-name="brand color" style={{ backgroundImage: "linear-gradient(90deg, rgba(78, 110, 242, 0.2) 0%, rgba(78, 110, 242, 0.2) 100%), linear-gradient(90deg, rgb(67, 97, 238) 0%, rgb(67, 97, 238) 100%)" }} />;
}

function WappGptLogo() {
  return (
    <div className="absolute bottom-0 left-[1.42%] right-[-1.42%] top-0" data-name="WappGPT - logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 33">
        <g id="WappGPT - logo">
          <path clipRule="evenodd" d={svgPaths.pe046c00} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <g id="Vector_2"></g>
          <path d={svgPaths.p755600} fill="var(--fill-0, white)" id="Vector_3" />
          <rect fill="var(--fill-0, #162550)" height="5.5618" id="Rectangle 17" rx="2.7809" width="15.573" x="8.34305" y="6.92138" />
          <ellipse cx="20.4241" cy="9.67142" fill="var(--fill-0, #C9DF56)" id="Ellipse 18" rx="1.01966" ry="1.01966" />
          <ellipse cx="16.098" cy="23.3904" fill="var(--fill-0, #162550)" id="Ellipse 19" rx="1.01966" ry="1.01966" />
          <ellipse cx="12.0201" cy="9.67142" fill="var(--fill-0, #C9DF56)" id="Ellipse 20" rx="1.01966" ry="1.01966" />
          <ellipse cx="12.0201" cy="23.3904" fill="var(--fill-0, #162550)" id="Ellipse 21" rx="1.01966" ry="1.01966" />
          <ellipse cx="20.1772" cy="23.3904" fill="var(--fill-0, #162550)" id="Ellipse 22" rx="1.01966" ry="1.01966" />
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute h-[33px] left-[calc(50%+0.11px)] top-[calc(50%-0.5px)] translate-x-[-50%] translate-y-[-50%] w-[32.225px]" data-name="Logo">
      <WappGptLogo />
    </div>
  );
}

export default function Logo1() {
  return (
    <div className="relative rounded-[80px] size-full" data-name="logo">
      <BrandColor />
      <Logo />
    </div>
  );
}