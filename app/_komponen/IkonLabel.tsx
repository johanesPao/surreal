'use client'
// import { notifications } from "@mantine/notifications";
import {
    IconBrandDiscord,
    IconBrandDocker,
    IconBrandGithub,
    IconBrandGmail,
    IconBrandInstagram,
    IconBrandSlack,
    IconBrandTiktok,
    IconBrandX,
    IconMail,
    IconPhone,
  } from "@tabler/icons-react";
  import { EModeKontak, EWarna } from "@/app/_enums/enums";
  import { IkonLabelProps, ModeKontak } from "@/app/_interface-props/IkonLabel.props";
  
  const renderIkon = (mode: ModeKontak, warnaIkon: string) => {
    let ikon: JSX.Element = <></>;
    switch (EModeKontak[mode]) {
      case EModeKontak.EMAIL:
        ikon = <IconMail color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.GMAIL:
        ikon = <IconBrandGmail color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.X:
        ikon = <IconBrandX color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.INSTAGRAM:
        ikon = <IconBrandInstagram color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.TIKTOK:
        ikon = <IconBrandTiktok color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.DISCORD:
        ikon = <IconBrandDiscord color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.SLACK:
        ikon = <IconBrandSlack color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.DOCKER:
        ikon = <IconBrandDocker color={warnaIkon} className="w-5 h-5" />;
        break;
      case EModeKontak.GITHUB:
        ikon = <IconBrandGithub color={warnaIkon} className="w-5 h-5" />;
        break;
      default:
        ikon = <IconPhone color={warnaIkon} className="w-5 h-5" />;
        break;
    }
  
    return (
      <div>
        {ikon}
      </div>
    );
  };
  
  const IkonLabel = ({
    mode = "TELP",
    teks = "",
    warnaIkon = EWarna.TEKS,
    warnaTeks = EWarna.TEKS,
  }: IkonLabelProps) => {
    return (
      <div className="shrink-0">
        <div className="flex flex-row justify-center gap-1 items-end">
          {renderIkon(mode, warnaIkon)}
          <span
            className="text-sm"
            style={{
              color: warnaTeks,
            }}
          >
            {teks}
          </span>
        </div>
      </div>
    );
  };
  
  export default IkonLabel;
  