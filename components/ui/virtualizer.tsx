"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  PartialKeys,
  useVirtualizer,
  useWindowVirtualizer,
  VirtualItem,
  VirtualizerOptions,
  Virtualizer as VirtualizerType,
} from "@tanstack/react-virtual";
import {
  CSSProperties,
  Fragment,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useRef,
} from "react";

type PossibleRef<T> = React.Ref<T> | undefined;

function assignRef<T>(ref: PossibleRef<T>, value: T) {
  if (ref == null) return;

  if (ref instanceof Function) {
    ref(value);

    return;
  }

  try {
    (ref as React.MutableRefObject<T>).current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

function mergeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => refs.forEach((ref) => assignRef(ref, node));
}

type VirtualizerContextProps =
  | {
      isWindowVirtualizer?: false;
      virtualizer: VirtualizerType<HTMLDivElement, Element>;
    }
  | {
      isWindowVirtualizer: true;
      virtualizer: VirtualizerType<Window, Element>;
    };

const VirtualizerContext = createContext<VirtualizerContextProps | null>(null);

export function useVirtualizerContext() {
  const context = useContext(VirtualizerContext);

  if (!context) {
    throw new Error(
      "useReactVirtualizer must be used within a <Virtualizer />"
    );
  }

  return context;
}

export interface VirtualizerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?:
    | ReactNode
    | ((virtualizer: VirtualizerContextProps["virtualizer"]) => ReactNode);
  asChild?: boolean;
  options: PartialKeys<
    VirtualizerOptions<HTMLDivElement, Element>,
    | "observeElementRect"
    | "observeElementOffset"
    | "scrollToFn"
    | "getScrollElement"
  >;
}

export const Virtualizer = forwardRef<HTMLDivElement, VirtualizerProps>(
  function Virtualizer(
    { asChild, className, children, options, ...props },
    ref
  ) {
    const Comp = asChild ? Slot : "div";
    const parentRef = useRef<HTMLDivElement>(null);
    const virtualizer = useVirtualizer({
      ...options,
      getScrollElement: () => parentRef.current,
    });
    return (
      <VirtualizerContext.Provider
        value={{
          virtualizer,
        }}
      >
        <Comp
          ref={mergeRefs(parentRef, ref)}
          className={cn("overflow-auto size-full flex-1", className)}
          {...props}
        >
          {children instanceof Function ? children(virtualizer) : children}
        </Comp>
      </VirtualizerContext.Provider>
    );
  }
);

export interface WindowVirtualizerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?:
    | ReactNode
    | ((virtualizer: VirtualizerContextProps["virtualizer"]) => ReactNode);
  asChild?: boolean;
  options: PartialKeys<
    VirtualizerOptions<Window, Element>,
    | "getScrollElement"
    | "observeElementRect"
    | "observeElementOffset"
    | "scrollToFn"
  >;
}

export const WindowVirtualizer = forwardRef<
  HTMLDivElement,
  WindowVirtualizerProps
>(function Virtualizer({ asChild, children, options, ...props }, ref) {
  const Comp = asChild ? Slot : "div";
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useWindowVirtualizer({
    ...options,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });
  return (
    <VirtualizerContext.Provider
      value={{
        isWindowVirtualizer: true,
        virtualizer,
      }}
    >
      <Comp {...props} ref={mergeRefs(parentRef, ref)}>
        {children instanceof Function ? children(virtualizer) : children}
      </Comp>
    </VirtualizerContext.Provider>
  );
});

export interface VirtualizerContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?:
    | ReactNode
    | ((virtualizer: VirtualizerContextProps["virtualizer"]) => ReactNode);
  asChild?: boolean;
}

export const VirtualizerContent = forwardRef<
  HTMLDivElement,
  VirtualizerContentProps
>(function VirtualizerContent(
  { asChild, style, className, children, ...props },
  ref
) {
  const Comp = asChild ? Slot : "div";
  const { virtualizer } = useVirtualizerContext();
  const innerStyle: CSSProperties = virtualizer.options.horizontal
    ? {
        width: `${virtualizer.getTotalSize()}px`,
        height: "100%",
      }
    : {
        height: `${virtualizer.getTotalSize()}px`,
      };
  return (
    <Comp
      ref={ref}
      style={Object.assign(innerStyle, style)}
      className={cn("relative", className)}
      {...props}
    >
      {children instanceof Function ? children(virtualizer) : children}
    </Comp>
  );
});

export interface VirtualizerViewportProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  asChild?: boolean;
  children?:
    | ReactNode
    | ((virtualizer: VirtualizerContextProps["virtualizer"]) => ReactNode);
}

export const VirtualizerViewport = forwardRef<
  HTMLDivElement,
  VirtualizerViewportProps
>(function VirtualizerViewport(
  { asChild, style, className, children, ...props },
  ref
) {
  const Comp = asChild ? Slot : "div";
  const { virtualizer, isWindowVirtualizer } = useVirtualizerContext();
  const items = virtualizer.getVirtualItems();
  return (
    <Comp
      ref={ref}
      style={Object.assign(
        {
          transform: `translateY(${
            (items[0]?.start ?? 0) -
            (isWindowVirtualizer ? virtualizer.options.scrollMargin : 0)
          }px)`,
        },
        style
      )}
      className={cn("absolute top-0 left-0 w-full", className)}
      {...props}
    >
      {children instanceof Function ? children(virtualizer) : children}
    </Comp>
  );
});

export function VirtualizerTrack({
  children,
}: {
  children?:
    | ReactElement
    | ((
        virtualRow: VirtualItem,
        style: CSSProperties,
        virtualizer: VirtualizerContextProps["virtualizer"]
      ) => ReactElement);
}) {
  const { virtualizer, isWindowVirtualizer } = useVirtualizerContext();
  return (
    <Fragment>
      {virtualizer.getVirtualItems().map((virtualRow) => {
        const style: CSSProperties = virtualizer.options.horizontal
          ? {
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${virtualRow.size}px`,
              transform: `translateX(${virtualRow.start}px)`,
            }
          : {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${
                virtualRow.start -
                (isWindowVirtualizer ? virtualizer.options.scrollMargin : 0)
              }px)`,
            };
        return (
          <Fragment key={virtualRow.key}>
            {children instanceof Function
              ? children(virtualRow, style, virtualizer)
              : children}
          </Fragment>
        );
      })}
    </Fragment>
  );
}

export interface VirtualizerItemProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const VirtualizerItem = forwardRef<HTMLDivElement, VirtualizerItemProps>(
  function VirtualizerFixedItem({ asChild, children, ...props }, ref) {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
