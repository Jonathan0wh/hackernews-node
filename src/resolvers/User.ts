const User = {
  links: (parent: any, args: any, context: any) => {
    return context.prisma.user({ id: parent.id }).links();
  }
};

export default User;
