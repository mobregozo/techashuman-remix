declare module "*&as=picture" {
  const content: {
    sources: Record<"type" | "srcset" | "sizes", string>;
    img: {
      src: string;
      width: number;
      height: number;
    };
  };
  export default content;
}
