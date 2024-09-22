/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io"
            }
        ]
    },
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Content-Security-Policy',
                value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.razorpay.com;",
              },
            ],
          },
        ]
      },
};

export default nextConfig;
