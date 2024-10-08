import {
  inter,
  jetbrainsMono,
  robotoMono,
  inconsolata,
  wotfard,
  bizUDMincho,
  monaspaceArgon,
  monaspaceKrypton,
  monaspaceNeon,
  monaspaceRadon,
  monaspaceXenon,
  geistSans,
  geistMono
} from '@/app/_fonts/fonts';
import { auth } from "@/auth";
import { InferAccount } from "@/schema";
import { evalUserCreationOnProviderAccount } from "./api/db/user";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let user: string | undefined;

  if (session) {
    await evalUserCreationOnProviderAccount(
      session.user.provider as InferAccount["provider"],
      session.user.id,
      session.user.name!,
      session.user.image!,
      session.user.handleName ?? undefined,
      session.user.email ?? undefined
    );
  }

  return (
    <html
      lang='en'
      className={`
        ${inter.variable}
        ${jetbrainsMono.variable}
        ${robotoMono.variable}
        ${inconsolata.variable}
        ${wotfard.variable}
        ${bizUDMincho.variable}
        ${monaspaceArgon.variable}
        ${monaspaceKrypton.variable}
        ${monaspaceNeon.variable}
        ${monaspaceRadon.variable}
        ${monaspaceXenon.variable}
        ${geistSans.variable}
        ${geistMono.variable}
      `}
      suppressHydrationWarning
    >
      <body className="overflow-auto">{children}</body>
    </html>
  );
}
