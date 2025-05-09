import { Github, Linkedin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-12 w-full max-w-[90%] sm:mt-20 sm:max-w-md">
      <div className="relative">
        {/* Minimal line */}
        <div className="absolute -top-4 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent sm:w-32" />

        <div className="mt-6 flex flex-col items-center space-y-4 sm:mt-8 sm:space-y-6">
          <div className="flex items-center space-x-2 text-sm tracking-wider text-muted-foreground">
            <span>MADE BY</span>
            <a
              href="https://github.com/Arshiash80"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white transition-colors hover:text-foreground/80"
            >
              ARSHIASH80
            </a>
          </div>

          <div className="flex items-center space-x-6 sm:space-x-8">
            <a
              href="https://arshiash80.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 transition-colors hover:text-foreground"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Arshiash80"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/arshiash80/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/50 transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
