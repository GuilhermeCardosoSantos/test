/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "imgproductioncrm.s3.us-east-2.amazonaws.com",
      "imgprodutos.s3.us-east-2.amazonaws.com",
    ],
  },
}

module.exports = nextConfig