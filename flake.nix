{
  description = "Nix flake untuk project surreal-ocean";

  inputs = {
    # repositori nixpkgs
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    # utilitas flake untuk multiple sistem arsitektur (x86_64, darwin, dsbnya) 
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {self, nixpkgs, flake-utils, ...}:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in
      {
        # buat sandboxed shell
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # nodejs
            nodejs_22
            # postgresql
            postgresql
            # redis (cache)
            redis
          ];
        };
      }
    );
}
