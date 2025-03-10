- Bugs:
  "@headlessui/react" > "^2.1.2", Maximum update depth exceededs when using "as={Button}" (Button from heroui) in ListboxButton.

- HeroUI Avatar ( when using Next Image Component ) : React does not recognize the `disableAnimation` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `disableanimation` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
