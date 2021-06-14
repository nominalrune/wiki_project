# elasticsearch.md
```sh
curl https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.13.1-linux-x86_64.tar.gz | tar -xzf -
```

```sh
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch /home/paulsenglish/bin/elasticsearch
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-certgen /home/paulsenglish/bin/elasticsearch-certgen
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-certutil /home/paulsenglish/bin/elasticsearch-certutil
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-cli /home/paulsenglish/bin/elasticsearch-cli
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-croneval /home/paulsenglish/bin/elasticsearch-croneval
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-env /home/paulsenglish/bin/elasticsearch-env
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-env-from-file /home/paulsenglish/bin/elasticsearch-env-from-file
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-geoip /home/paulsenglish/bin/elasticsearch-geoip
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-keystore /home/paulsenglish/bin/elasticsearch-keystore
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-migrate /home/paulsenglish/bin/elasticsearch-migrate
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-node /home/paulsenglish/bin/elasticsearch-node
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-plugin /home/paulsenglish/bin/elasticsearch-plugin
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-saml-metadata /home/paulsenglish/bin/elasticsearch-saml-metadata
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-service-tokens /home/paulsenglish/bin/elasticsearch-service-tokens
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-setup-passwords /home/paulsenglish/bin/elasticsearch-setup-passwords
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-shard /home/paulsenglish/bin/elasticsearch-shard
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-sql-cli /home/paulsenglish/bin/elasticsearch-sql-cli
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-syskeygen /home/paulsenglish/bin/elasticsearch-syskeygen
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/elasticsearch-users /home/paulsenglish/bin/elasticsearch-users
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/x-pack-env /home/paulsenglish/bin/x-pack-env
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/x-pack-security-env /home/paulsenglish/bin/x-pack-security-env
ln -s /home/paulsenglish/bin/elasticsearch-7.13.1/bin/x-pack-watcher-env /home/paulsenglish/bin/x-pack-watcher-env
```

```log
[2021-06-13T05:47:11,480][ERROR][o.e.b.ElasticsearchUncaughtExceptionHandler] [sv8238.xserver.jp] uncaught exception in thread [main]
org.elasticsearch.bootstrap.StartupException: java.security.AccessControlException: access denied ("java.io.FilePermission" "/sys/fs/cgroup/cpuacct/../../u_paulsenglish/cpuacct.usage" "read")
        at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:163) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Elasticsearch.execute(Elasticsearch.java:150) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.cli.EnvironmentAwareCommand.execute(EnvironmentAwareCommand.java:75) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.cli.Command.mainWithoutErrorHandling(Command.java:116) ~[elasticsearch-cli-7.13.1.jar:7.13.1]
        at org.elasticsearch.cli.Command.main(Command.java:79) ~[elasticsearch-cli-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:115) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:81) ~[elasticsearch-7.13.1.jar:7.13.1]
Caused by: java.security.AccessControlException: access denied ("java.io.FilePermission" "/sys/fs/cgroup/cpuacct/../../u_paulsenglish/cpuacct.usage" "read")
        at java.security.AccessControlContext.checkPermission(AccessControlContext.java:472) ~[?:?]
        at java.security.AccessController.checkPermission(AccessController.java:1036) ~[?:?]
        at java.lang.SecurityManager.checkPermission(SecurityManager.java:408) ~[?:?]
        at java.lang.SecurityManager.checkRead(SecurityManager.java:747) ~[?:?]
        at sun.nio.fs.UnixChannelFactory.open(UnixChannelFactory.java:245) ~[?:?]
        at sun.nio.fs.UnixChannelFactory.newFileChannel(UnixChannelFactory.java:133) ~[?:?]
        at sun.nio.fs.UnixChannelFactory.newFileChannel(UnixChannelFactory.java:146) ~[?:?]
        at sun.nio.fs.UnixFileSystemProvider.newByteChannel(UnixFileSystemProvider.java:217) ~[?:?]
        at java.nio.file.Files.newByteChannel(Files.java:375) ~[?:?]
        at java.nio.file.Files.newByteChannel(Files.java:426) ~[?:?]
        at java.nio.file.spi.FileSystemProvider.newInputStream(FileSystemProvider.java:420) ~[?:?]
        at java.nio.file.Files.newInputStream(Files.java:160) ~[?:?]
        at java.nio.file.Files.newBufferedReader(Files.java:2916) ~[?:?]
        at java.nio.file.Files.readAllLines(Files.java:3396) ~[?:?]
        at java.nio.file.Files.readAllLines(Files.java:3436) ~[?:?]
        at org.elasticsearch.monitor.os.OsProbe.readSingleLine(OsProbe.java:229) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.monitor.os.OsProbe.readSysFsCgroupCpuAcctCpuAcctUsage(OsProbe.java:318) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.monitor.os.OsProbe.getCgroupCpuAcctUsageNanos(OsProbe.java:305) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.monitor.os.OsProbe.getCgroup(OsProbe.java:527) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.monitor.os.OsProbe.osStats(OsProbe.java:702) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.xpack.ml.MachineLearning.additionalSettings(MachineLearning.java:591) ~[?:?]
        at org.elasticsearch.plugins.PluginsService.updatedSettings(PluginsService.java:205) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.node.Node.<init>(Node.java:353) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.node.Node.<init>(Node.java:278) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Bootstrap$5.<init>(Bootstrap.java:217) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Bootstrap.setup(Bootstrap.java:217) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:397) ~[elasticsearch-7.13.1.jar:7.13.1]
        at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:159) ~[elasticsearch-7.13.1.jar:7.13.1]
        ... 6 more
uncaught exception in thread [main]
java.security.AccessControlException: access denied ("java.io.FilePermission" "/sys/fs/cgroup/cpuacct/../../u_paulsenglish/cpuacct.usage" "read")
        at java.base/java.security.AccessControlContext.checkPermission(AccessControlContext.java:472)
        at java.base/java.security.AccessController.checkPermission(AccessController.java:1036)
        at java.base/java.lang.SecurityManager.checkPermission(SecurityManager.java:408)
        at java.base/java.lang.SecurityManager.checkRead(SecurityManager.java:747)
        at java.base/sun.nio.fs.UnixChannelFactory.open(UnixChannelFactory.java:245)
        at java.base/sun.nio.fs.UnixChannelFactory.newFileChannel(UnixChannelFactory.java:133)
        at java.base/sun.nio.fs.UnixChannelFactory.newFileChannel(UnixChannelFactory.java:146)
        at java.base/sun.nio.fs.UnixFileSystemProvider.newByteChannel(UnixFileSystemProvider.java:217)
        at java.base/java.nio.file.Files.newByteChannel(Files.java:375)
        at java.base/java.nio.file.Files.newByteChannel(Files.java:426)
        at java.base/java.nio.file.spi.FileSystemProvider.newInputStream(FileSystemProvider.java:420)
        at java.base/java.nio.file.Files.newInputStream(Files.java:160)
        at java.base/java.nio.file.Files.newBufferedReader(Files.java:2916)
        at java.base/java.nio.file.Files.readAllLines(Files.java:3396)
        at java.base/java.nio.file.Files.readAllLines(Files.java:3436)
        at org.elasticsearch.monitor.os.OsProbe.readSingleLine(OsProbe.java:229)
        at org.elasticsearch.monitor.os.OsProbe.readSysFsCgroupCpuAcctCpuAcctUsage(OsProbe.java:318)
        at org.elasticsearch.monitor.os.OsProbe.getCgroupCpuAcctUsageNanos(OsProbe.java:305)
        at org.elasticsearch.monitor.os.OsProbe.getCgroup(OsProbe.java:527)
        at org.elasticsearch.monitor.os.OsProbe.osStats(OsProbe.java:702)
        at org.elasticsearch.xpack.ml.MachineLearning.additionalSettings(MachineLearning.java:591)
        at org.elasticsearch.plugins.PluginsService.updatedSettings(PluginsService.java:205)
        at org.elasticsearch.node.Node.<init>(Node.java:353)
        at org.elasticsearch.node.Node.<init>(Node.java:278)
        at org.elasticsearch.bootstrap.Bootstrap$5.<init>(Bootstrap.java:217)
        at org.elasticsearch.bootstrap.Bootstrap.setup(Bootstrap.java:217)
        at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:397)
        at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:159)
        at org.elasticsearch.bootstrap.Elasticsearch.execute(Elasticsearch.java:150)
        at org.elasticsearch.cli.EnvironmentAwareCommand.execute(EnvironmentAwareCommand.java:75)
        <<<truncated>>>
```

elasticsearch-plugin install analysis-kuromoji

elasticsearch-plugin install analysis-icu

