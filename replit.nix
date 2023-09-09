{ pkgs }: {
  deps = [
    pkgs.yarn
    pkgs.unzip
    pkgs.bashInteractive
    pkgs.nodePackages.bash-language-server
    pkgs.man
  ];
}