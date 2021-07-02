module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8091),//1337
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '434bd329fd1352a21b6b31afc021bf41'),
    },
  },
});
