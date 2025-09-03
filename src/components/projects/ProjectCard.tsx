"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScreenshotImageBlur from "../ui/ScreenShotWithProgress";
import { Button } from "../ui/button";
import { ChevronRight, ExternalLink, Eye, Info } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useLocale } from "next-intl";

const ProjectCard = ({
  title,
  description,
  link,
  technologies = [],
  status = "active",
}: {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  status?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const locale = useLocale();

  // Truncate description for card display
  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  const shouldShowReadMore = description.length > 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group relative overflow-hidden bg-card/80 text-card-foreground backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
        {/* Status Badge */}
        {/* <div className="absolute top-4 right-4 z-20">
          <Badge
            variant={status === "active" ? "default" : "secondary"}
            className={`${
              status === "active"
                ? "bg-primary hover:bg-primary/80 text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }  text-xs px-2 py-1`}
          >
            {status === "active" ? "فعال" : "آرشیو"}
          </Badge>
        </div> */}

        {/* Header with Title */}
        <div className="px-6 py-2">
          <motion.h3
            className="text-xl font-bold  mb-2 group-hover:text-accent transition-colors duration-300"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>

          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {technologies.slice(0, 3).map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-blue-50 border-blue-200 text-blue-700"
                >
                  {tech}
                </Badge>
              ))}
              {technologies.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-gray-50 border-gray-200 text-gray-600"
                >
                  +{technologies.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        <CardContent className="p-0">
          {/* Screenshot Section */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <ScreenshotImageBlur
                link={link}
                title={title}
                className="w-full h-48 rounded-none"
              />

              {/* Hover Overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                  >
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white text-gray-800"
                        onClick={() => window.open(link, "_blank")}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        پیش‌نمایش
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Description Section */}
          <div className="p-6 pt-4">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {truncatedDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                {shouldShowReadMore && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                      >
                        <Info className="w-4 h-4 mr-1" />
                        بیشتر
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                          {title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        {/* Screenshot in Dialog */}
                        <div className="w-full h-64 rounded-lg overflow-hidden">
                          <ScreenshotImageBlur
                            link={link}
                            title={title}
                            className="w-full h-full"
                          />
                        </div>

                        {/* Full Description */}
                        <div className="prose prose-sm max-w-none">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {description}
                          </p>
                        </div>

                        {/* Technologies in Dialog */}
                        {technologies.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2">
                              تکنولوژی‌های استفاده شده:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech, index) => (
                                <Badge
                                  key={index}
                                  className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Button in Dialog */}
                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => window.open(link, "_blank")}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            مشاهده پروژه
                            <ChevronRight className="w-4 h-4 mr-2" />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <Button
                size="sm"
                onClick={() => window.open(link, "_blank")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                مشاهده
              </Button>
            </div>
          </div>
        </CardContent>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl group-hover:from-blue-400/20 group-hover:to-purple-400/20 transition-all duration-500"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl group-hover:from-pink-400/20 group-hover:to-yellow-400/20 transition-all duration-500"></div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
