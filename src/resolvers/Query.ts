const Query = {
  feed: (parent: any, args: any, context: any) => {
    return context.prisma.links();
  }
};

export default Query;
