module.exports = {
  apps : [{
    "script": "dist/main.js",
    "cwd": __dirname,
    "watch": false,
    "watch_options": {
        "followSymlinks": false
    },
    "name": "squatt_app",
    instances: 2,
    exec_mode: 'cluster', // fork cluster
    out_file: "log/out.log",
    error_file: "log/err.log",
    // log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    combine_logs: true,
    args: [ "--color" ],
    increment_var : 'INSTANCE_ID',
    env: {
      PORT: '80',
      NODE_ENV: "local"
    },
    env_test: {
      PORT: '3000',
      NODE_ENV: "test",
    },
    env_production: {
      PORT: '3000',
      NODE_ENV: "production",
    }
  }],
  deploy: {
    test: {
      user: 'ubuntu', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      key: "../user_app.pem",
      host: '15.165.77.220', // 서버 도메인 또는 IP
      ref: 'origin/test', // 서버에서 clone할 브랜치
      repo: 'git@gitlab.com:squa1/squatt_app_server.git', // Git 저장소 URL
      ssh_options: "StrictHostKeyChecking=no",
      path: '/var/www/squatt_app_test_deploy', // 앱을 설치할 폴더 위치
      // 'post-setup': 'mkdir imsifolder && mkdir mission',
      'post-deploy': // PM2가 배포(git clone)한 후 실행할 명령어
        'npm install && pm2 startOrReload ecosystem.config.js --env test'
    },
    production: {
      user: 'ubuntu', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      key: "../user_app.pem",
      host: '15.165.77.220', // 서버 도메인 또는 IP
      ref: 'origin/master', // 서버에서 clone할 브랜치
      repo: 'git@gitlab.com:squa1/squatt_app_server.git', // Git 저장소 URL
      ssh_options: "StrictHostKeyChecking=no",
      path: '/var/www/squatt_app_deploy', // 앱을 설치할 폴더 위치
      // 'post-setup': 'mkdir imsifolder && mkdir mission',
      'post-deploy': // PM2가 배포(git clone)한 후 실행할 명령어
        'npm install && pm2 startOrReload ecosystem.config.js --env production'
    },
}
}
