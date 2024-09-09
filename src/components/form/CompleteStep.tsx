export default function CompleteStep() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <img
        src="/img/icon-thank-you.svg"
        alt="thank-you-icon"
        className="w-20"
      />

      <h1>Thank you!</h1>

      <p className="mx-3 mt-3 text-pretty text-center text-lg tracking-wide">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
