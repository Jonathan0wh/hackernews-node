const Link = {
  postedBy: (parent: any, args: any, context: any) => {
    return context.prisma.link({ id: parent.id }).postedBy();
  }
};

export default Link;
